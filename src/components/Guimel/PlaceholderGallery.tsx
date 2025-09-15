import React, { FC } from "react";
import BrokenImageIcon from "./BrokenImageIcon";

export interface PlaceholderGalleryProps {
  type?: 'activity' | 'location' | 'lodging' | 'default';
  className?: string;
  showText?: boolean;
  customText?: string;
}

const PlaceholderGallery: FC<PlaceholderGalleryProps> = ({
  type = 'default',
  className = "",
  showText = true,
  customText,
}) => {
  const getPlaceholderContent = () => {
    switch (type) {
      case 'activity':
        return {
          icon: (
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          ),
          text: customText || "Activity without images",
          bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
          accentColor: "blue"
        };
      case 'location':
        return {
          icon: (
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          ),
          text: customText || "Location without images",
          bgGradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
          accentColor: "green"
        };
      case 'lodging':
        return {
          icon: (
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          ),
          text: customText || "Lodging without images",
          bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
          accentColor: "orange"
        };
      default:
        return {
          icon: (
            <div className="w-24 h-24 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ),
          text: customText || "No images",
          bgGradient: "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
          accentColor: "gray"
        };
    }
  };

  const content = getPlaceholderContent();

  return (
    <div className={`relative ${className}`}>
      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2 rounded-md sm:rounded-xl overflow-hidden">
        <div className="col-span-2 row-span-3 sm:row-span-2 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-md sm:rounded-xl overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(156, 163, 175, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 70% 70%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)`
            }}></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              {content.icon}
              <div className="absolute inset-0 w-24 h-24 bg-white dark:bg-gray-700 rounded-2xl opacity-30"></div>
            </div>
            
            {showText && (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {content.text}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No images available to display
                </p>
              </div>
            )}
          </div>
        </div>

        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-md sm:rounded-xl overflow-hidden aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5"
          >
            {/* Very subtle background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.1) 0%, transparent 70%)`
              }}></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center opacity-60">
                <BrokenImageIcon 
                    size="lg"
                    showText={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceholderGallery;
