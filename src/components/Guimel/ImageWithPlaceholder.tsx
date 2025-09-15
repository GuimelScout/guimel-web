import React, { FC } from "react";
import Image from "next/image";
import { ImageType } from "@/data/types";
import BrokenImageIcon from "./BrokenImageIcon";
import CardPlaceholder from "./CardPlaceholder";

export interface ImageWithPlaceholderProps {
  image: ImageType | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  placeholderText?: string;
  placeholderIcon?: React.ReactNode;
  placeholderType?: 'activity' | 'location' | 'lodging' | 'default';
  useCardPlaceholder?: boolean;
}

const ImageWithPlaceholder: FC<ImageWithPlaceholderProps> = ({
  image,
  alt,
  className = "",
  fill = false,
  sizes,
  width,
  height,
  placeholderText = "No image",
  placeholderType = 'default',
  useCardPlaceholder = false,
}) => {
  // If no image or URL is empty, show placeholder
  if (!image || !image.url) {
    // If CardPlaceholder is requested, use the specialized component
    if (useCardPlaceholder) {
      return (
        <CardPlaceholder
          type={placeholderType}
          className={className}
          customText={placeholderText}
        />
      );
    }

    const iconSize = (sizes) ? "md" : "sm";
    
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className} p-4`}
        style={fill ? {} : { width, height }}
      >
        <BrokenImageIcon 
          size={iconSize}
          showText={false}
        />
      </div>
    );
  }

  // If there's an image, render normally
  if (fill) {
    return (
      <Image
        src={image.url}
        alt={alt}
        className={className}
        fill
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
};

export default ImageWithPlaceholder;
