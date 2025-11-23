import React from "react";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import CheckIcon from "./icons/CheckIcon";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  imgUrl: string | null | undefined;
  title: string;
  color?: "neutral" | "orange" | "blue" | "green" | "red" | "purple" | "yellow" | "indigo" | "pink" | "gray" | "cyan" | null;
}

const OptionButton: React.FC<OptionButtonProps> = ({ selected, onClick, imgUrl, title, color = "neutral" }) => (
  <button
    className={`px-4 py-1.5 sm:px-2 sm:py-2 rounded-full flex items-center justify-start focus:outline-none gap-3 ${
      selected
        ? (() => {
            switch (color) {
              case "orange":
                return "bg-orange-500 dark:bg-orange-800/50 text-white dark:text-white";
              case "blue":
                return "bg-blue-500 dark:bg-blue-800/50 text-white dark:text-white";
              case "green":
                return "bg-green-500 dark:bg-green-800/50 text-white dark:text-white";
              case "red":
                return "bg-red-500 dark:bg-red-800/50 text-white dark:text-white";
              case "purple":
                return "bg-purple-500 dark:bg-purple-800/50 text-white dark:text-white";
              case "yellow":
                return "bg-yellow-600 dark:bg-yellow-800/50 text-white dark:text-white";
              case "indigo":
                return "bg-indigo-500 dark:bg-indigo-800/50 text-white dark:text-white";
              case "pink":
                return "bg-pink-500 dark:bg-pink-800/50 text-white dark:text-white";
              case "gray":
                return "bg-gray-500 dark:bg-gray-800/50 text-white dark:text-white";
              case "cyan":
                return "bg-cyan-500 dark:bg-cyan-800/50 text-white dark:text-white";
              case "neutral":
              default:
                return "bg-neutral-500 dark:bg-neutral-100 text-white dark:text-neutral-900";
            }
          })()
        : "bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-800 dark:hover:bg-neutral-100"
    }`}
    onClick={onClick}
    type="button"
  >
    <ImageWithPlaceholder
      image={imgUrl ? { url: imgUrl } : null}
      alt={title}
      className="w-8 rounded-full"
      width={30}
      height={30}
      useCardPlaceholder={false}
      placeholderIcon={false}
      placeholderText=""
    />
    <span className="mr-2.5 flex items-center gap-1">
      {title}
      {selected && (
        <CheckIcon
          className={`w-4 h-4 opacity-70 ${
            color === "orange"
              ? "text-orange-200 dark:text-orange-100"
              : color === "blue"
              ? "text-blue-200 dark:text-blue-100"
              : color === "green"
              ? "text-green-200 dark:text-green-100"
              : color === "red"
              ? "text-red-200 dark:text-red-100"
              : color === "purple"
              ? "text-purple-200 dark:text-purple-100"
              : color === "yellow"
              ? "text-yellow-100 dark:text-yellow-50"
              : color === "indigo"
              ? "text-indigo-200 dark:text-indigo-100"
              : color === "pink"
              ? "text-pink-200 dark:text-pink-100"
              : color === "gray"
              ? "text-gray-200 dark:text-gray-100"
              : color === "cyan"
              ? "text-cyan-200 dark:text-cyan-100"
              : color === "neutral"
              ? "text-neutral-200 dark:text-neutral-900"
              : "text-white dark:text-neutral-200"
          }`}
          size={16}
          aria-hidden="true"
        />
      )}
    </span>
  </button>
);

export default OptionButton;
