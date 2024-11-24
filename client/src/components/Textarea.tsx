import {
  TextareaHTMLAttributes,
  useRef,
  useEffect,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  className: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, className, ...props }, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => textareaRef.current!);

    useEffect(() => {
      const textareaRefCurrent = textareaRef.current;
      function handleResize() {
        if (textareaRefCurrent) {
          textareaRefCurrent.style.height = "auto";
          textareaRefCurrent.style.height = `${textareaRefCurrent.scrollHeight}px`;
        }
      }
      textareaRefCurrent?.addEventListener("input", handleResize);

      return () =>
        textareaRefCurrent?.removeEventListener("input", handleResize);
    }, []);
    return (
      <textarea
        ref={textareaRef}
        name={name}
        className={className}
        {...props}
      ></textarea>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
