"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useCallback, useState } from "react";
import { mutate } from "swr";
import StyleOptions from "./StyleOptions";
import { LoaderCircle, Rocket } from "lucide-react";
import TextEditor from "./TextEditor";
import { z } from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Editor } from "@tiptap/react";

const extractTextFromHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
};

const formSchema = z.object({
  content: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "Content must be at least 5 characters long",
    },
  ),
});

const ThoughtForm = () => {
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    },
  });

  const onError = (error: FieldErrors<{ content: string }>) => {
    toast.error(error.content?.message);
  };

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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { content } = data;
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
      handleClearBgColor();
      // Clear the editor content
      if (editorInstance) {
        editorInstance.commands.setContent("");
      }
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Your thoughts</FormLabel>
                  <FormControl>
                    <TextEditor
                      content={field.value}
                      onChange={(value) => field.onChange(value)}
                      onEditorReady={setEditorInstance}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </div>
      <p className="py-2 text-sm text-muted-foreground">
        <span className="mr-1 text-red-500">*</span>Your thought will be deleted
        after 24 hours.
      </p>
    </>
  );
};

export default ThoughtForm;
