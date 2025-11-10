import React, { FC } from "react";

export interface SkeletonProps {
  className?: string;
}

const SkeletonLocation: FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`relative space-y-24 mt-24 mb-24 lg:space-y-15 lg:mb-10 ${className}`}>
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="flex items-baseline gap-4 flex-wrap">
          <div className="h-16 md:h-20 xl:h-28 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 md:w-80 xl:w-96"></div>
          <div className="h-6 md:h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
        </div>
        
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-4/6"></div>
        </div>
        
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-48 mt-2"></div>
      </div>

      <div className="rounded-md sm:rounded-xl animate-pulse">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden">
            <div className="w-full h-64 sm:h-96 bg-gray-300 dark:bg-gray-700 rounded-md sm:rounded-xl flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`relative rounded-md sm:rounded-xl overflow-hidden ${i === 4 ? "hidden sm:block" : ""}`}>
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-md sm:rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-8 animate-pulse">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-48"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-96"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-xl bg-gray-200 dark:bg-gray-700">
              <div className="space-y-3">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLocation;
