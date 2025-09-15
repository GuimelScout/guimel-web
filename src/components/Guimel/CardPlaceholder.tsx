import React, { FC } from "react";

export interface CardPlaceholderProps {
  type?: 'activity' | 'lodging' | 'location' | 'default';
  className?: string;
  customText?: string;
}

const CardPlaceholder: FC<CardPlaceholderProps> = ({
  type = 'default',
  className = "",
  customText,
}) => {
  const getPlaceholderContent = () => {
    switch (type) {
      case 'activity':
        return {
          icon: (
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          ),
          text: customText || "Activity",
          bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10",
          accentColor: "blue",
          pattern: ""
        };
      case 'lodging':
        return {
          icon: (
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          ),
          text: customText || "Lodging",
          bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-800/10",
          accentColor: "orange",
          pattern: ""
        };
      case 'location':
        return {
          icon: (
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          ),
          text: customText || "Location",
          bgGradient: "from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/10",
          accentColor: "green",
          pattern: ""
        };
      default:
        return {
          icon: (
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4l16 16" />
              </svg>
            </div>
          ),
          text: customText || "Content",
          bgGradient: "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700",
          accentColor: "gray",
          pattern: ""
        };
    }
  };

  const content = getPlaceholderContent();

  return (
    <div 
      className={`bg-gradient-to-br ${content.bgGradient} flex flex-col items-center justify-center w-full h-full ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        {content.icon}
      </div>
    </div>
  );
};

export default CardPlaceholder;
