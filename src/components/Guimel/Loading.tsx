import React from "react";
import Image from "next/image";

interface LoadingProps {
}

const Loading: React.FC<LoadingProps> = () => (
  <div className="flex flex-col justify-center items-center py-10">
    <div className="w-7 h-7 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

export default Loading;
