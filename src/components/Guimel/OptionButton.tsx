import React from "react";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  imgUrl: string | null | undefined;
  title: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({ selected, onClick, imgUrl, title }) => (
  <button
    className={`px-4 py-1.5 sm:px-2 sm:py-2 rounded-full flex items-center justify-start focus:outline-none gap-3   ${
      selected
        ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
        : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
    <span className="mr-2.5">{title}</span>
  </button>
);

export default OptionButton;
