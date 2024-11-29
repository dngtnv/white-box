"use client";

import { useEditor, EditorContent, BubbleMenu, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import UnderLine from "@tiptap/extension-underline";
import React, { useEffect } from "react";
import { Bold, Strikethrough, Italic, Underline } from "lucide-react";
import { twMerge } from "tailwind-merge";

const limit = 280;

const TextEditor = ({
  content,
  onChange,
  onEditorReady,
}: {
  content: string;
  onChange: (richText: string) => void;
  onEditorReady: (editor: Editor | null) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderLine,
      Placeholder.configure({
        placeholder: "what is bothering you?",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-11 px-3 py-2 outline-none",
      },
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  if (!editor) {
    return null;
  }

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center justify-center gap-2 rounded-lg border-input bg-white p-1 shadow-lg">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={twMerge(
                "rounded-lg px-2 py-1",
                editor.isActive("bold")
                  ? "bg-green-400 hover:bg-green-600"
                  : "hover:bg-gray-300",
              )}
            >
              <Bold size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={twMerge(
                "rounded-lg px-2 py-1",
                editor.isActive("italic")
                  ? "bg-green-400 hover:bg-green-600"
                  : "hover:bg-gray-300",
              )}
            >
              <Italic size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={twMerge(
                "rounded-lg px-2 py-1",
                editor.isActive("strike")
                  ? "bg-green-400 hover:bg-green-600"
                  : "hover:bg-gray-300",
              )}
            >
              <Strikethrough size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={twMerge(
                "rounded-lg px-2 py-1",
                editor.isActive("underline")
                  ? "bg-green-400 hover:bg-green-600"
                  : "hover:bg-gray-300",
              )}
            >
              <Underline size={18} />
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
      <div
        className={`mx-3 flex items-center justify-end gap-[0.5rem] text-xs ${editor.storage.characterCount.characters() === limit ? "text-[#FF5C33]" : "text-gray-500"}`}
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          className={`text-green-600 ${editor.storage.characterCount.characters() === limit ? "text-[#FF5C33]" : ""}`}
        >
          <circle r="10" cx="10" cy="10" fill="#e9ecef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
        {editor.storage.characterCount.characters()} / {limit} characters
      </div>
    </>
  );
};

export default TextEditor;
