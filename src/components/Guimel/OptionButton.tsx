import React from "react";
import Image from "next/image";

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  imgUrl: string;
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
    <Image
      className="w-8 rounded-full"
      src={imgUrl}
      width={60}
      height={60}
      alt={title}
      style={{ minHeight: 30, minWidth: 30, maxHeight: 30, maxWidth: 30 }}
    />
    <span className="mr-2.5">{title}</span>
  </button>
);

export default OptionButton;
