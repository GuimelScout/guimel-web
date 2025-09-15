import React, { FC } from "react";

export interface BrokenImageIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  text?: string;
}

const BrokenImageIcon: FC<BrokenImageIconProps> = ({
  className = "",
  size = 'md',
  showText = false,
  text = "Broken image"
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          icon: 'w-4 h-4',
          text: 'text-xs'
        };
      case 'md':
        return {
          icon: 'w-8 h-8',
          text: 'text-sm'
        };
      case 'lg':
        return {
          icon: 'w-12 h-12',
          text: 'text-base'
        };
      default:
        return {
          icon: 'w-8 h-8',
          text: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        className={`${sizeClasses.icon} text-gray-400 dark:text-gray-500`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M4 4l16 16" 
        />
      </svg>
      
      {showText && (
        <span className={`${sizeClasses.text} text-gray-500 dark:text-gray-400 font-medium mt-1 text-center`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default BrokenImageIcon;
