"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";
import { mutate } from "swr";

const Form = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const validateContent = () => {
    const content = inputRef.current?.value;
    if (!content) {
      toast.error("Content is required");
      return false;
    }
    if (content.length > 280) {
      toast.error("Content must be less than 280 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = inputRef.current?.value;
    if (validateContent()) {
      try {
        const res = await fetch("http://localhost:5000/api/thoughts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) {
          const data = await res.json();
          toast.error(data.message);
        } else {
          mutate("http://localhost:5000/api/thoughts");
          inputRef.current!.value = "";
        }
      } catch (error: unknown) {
        const e = error as Error;
        console.error(e.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Textarea ref={inputRef} placeholder="What is in your mind?" />
      <Button type="submit" className="mt-5">
        Send
      </Button>
    </form>
  );
};

export default Form;
