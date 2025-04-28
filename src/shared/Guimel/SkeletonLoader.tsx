"use client";

import React from "react";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
    <div
      className={`bg-neutral-300 dark:bg-neutral-700 animate-pulse ${width} ${height} ${rounded} ${className}`}
    />
  );
};

export default SkeletonLoader;