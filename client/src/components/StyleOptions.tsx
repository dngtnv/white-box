"use client";

import { Ban } from "lucide-react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const gradients = {
  lightblue: "#d1e7ff",
  purple: "#dfc1f3",
  rose: "#ff8696",
  gradient1:
    "linear-gradient(68.1deg, rgb(255, 200, 69) -0.3%, rgb(239, 69, 115) 100.2%);",
  gradient2:
    "linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(0,230,118,1) 50%, rgba(255,235,59,1) 100%)",
  gradient3:
    "radial-gradient(circle at 4.3% 10.7%, rgb(138, 118, 249) 13.6%, rgb(75, 252, 235) 100.7%)",
};

const StyleOptions = memo(function StyleOptions({
  selectedColor,
  onChangeBgColor,
  onClearBgColor,
}: {
  selectedColor: string | null;
  onChangeBgColor: (color: string) => void;
  onClearBgColor: () => void;
}) {
  const handleBgColorChange = (color: string) => {
    onChangeBgColor(color);
  };
  return (
    <div className="flex content-center items-end gap-2">
      <button
        onClick={onClearBgColor}
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md border border-input bg-white"
      >
        <Ban size={16} className="text-gray-700" />
      </button>
      {Object.entries(gradients).map(([key, gradient]) => (
        <button
          onClick={() => handleBgColorChange(gradient)}
          key={key}
          type="button"
          className={twMerge(
            selectedColor === gradient &&
              "outline -outline-offset-2 outline-gray-700",
            "h-6 w-6 rounded-md border",
          )}
          style={{
            background: gradient,
          }}
        ></button>
      ))}
    </div>
  );
});

export default StyleOptions;
