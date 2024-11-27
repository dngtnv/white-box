"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useCallback, useRef, useState } from "react";
import { mutate } from "swr";
import Textarea from "./Textarea";
import StyleOptions from "./StyleOptions";
import { LoaderCircle, Rocket } from "lucide-react";

const ThoughtForm = () => {
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleBgColorChange = useCallback(
    (color: string) => {
      if (color !== bgColor) {
        setBgColor(color);
        setSelectedColor(color);
      }
    },
    [bgColor],
  );
  const handleClearBgColor = useCallback(() => {
    if (bgColor !== "#ffffff") {
      setBgColor("#ffffff");
      setSelectedColor(null);
    }
  }, [bgColor]);

  const validateContent = () => {
    const content = inputRef.current?.value;
    if (!content) {
      return false;
    }
    if (content.length > 280) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = inputRef.current?.value;

    if (!content || !validateContent()) {
      toast.error("Content must be between 1 and 280 characters");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, styles: { background: bgColor } }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to submit thought.");
        return;
      }

      mutate("http://localhost:5000/api/thoughts");
      // Clear form state
      inputRef.current!.value = "";
      handleClearBgColor();
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Error submitting thought:", err.message);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="rounded-md border border-input text-base shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div>
              <Textarea
                ref={inputRef}
                name="thoughts"
                autoFocus
                placeholder="What is in your mind?"
                className="max-h-[180px] min-h-11 w-full resize-none bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </div>
            <div className="flex items-end justify-between px-3 py-2">
              <StyleOptions
                selectedColor={selectedColor}
                onChangeBgColor={handleBgColorChange}
                onClearBgColor={handleClearBgColor}
              />
              <Button
                type="submit"
                variant="default"
                className="flex h-9 w-9 items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Rocket />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <p className="py-2 text-sm text-muted-foreground">
        <span className="mr-1 text-red-500">*</span>Your thought will be deleted
        after 24 hours.
      </p>
    </>
  );
};

export default ThoughtForm;
