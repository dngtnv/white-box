"use client";

import { Ban } from "lucide-react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const gradients = {
  lightblue: "#00b8ff",
  purple: "#be6ef6",
  rose: "#f16175",
  gradient1:
    "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
  gradient2:
    "linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(0,230,118,1) 50%, rgba(255,235,59,1) 100%)",
  gradient3:
    "linear-gradient(90deg, rgba(255,87,34,1) 0%, rgba(244,67,54,1) 50%, rgba(103,58,183,1) 100%)",
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
