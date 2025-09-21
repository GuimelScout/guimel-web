import React, { FC, useState } from "react";
import Image from "next/image";
import { ImageType } from "@/data/types";
import BrokenImageIcon from "./BrokenImageIcon";
import CardPlaceholder from "./CardPlaceholder";
import { PhotoIcon } from "@heroicons/react/24/outline";

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

  const [isLoading, setIsLoading] = useState(true);
  
  const ImageSkeleton = () => (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
      style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
          <PhotoIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );

  if (!image || !image.url) {
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

  if (fill) {
    return (
      <>
      {isLoading && <ImageSkeleton />}
      <Image
        src={image.url}
        alt={alt}
        className={className}
        fill
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        />
      </>
    );
  }

  return (
    <>
      {isLoading && <ImageSkeleton />}
    <Image
      src={image.url}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      onLoad={() => setIsLoading(false)}
      onLoadStart={() => setIsLoading(true)}
    />
    </>
  );
};

export default ImageWithPlaceholder;
