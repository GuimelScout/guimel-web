import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
  level?: 1 | 2 | 3 | 4| 5 | 6;
}



const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  level = 1,
  ...args
}) => {
  const renderHeading = (level: 1 | 2 | 3 |4 | 5 |6) => {
    switch (level) {
      case 1:
        return (
          <h1 className={`text-3xl md:text-4xl font-semibold`} {...args}>
            {children || `Section Heading`}
          </h1>
        );
      case 2:
        return (
          <h2 className={`text-2xl md:text-2xl font-semibold`} {...args}>
            {children || `Section Heading`}
          </h2>
        );
      case 3:
        return (
          <h3 className={`text-xl md:text-xl font-semibold`} {...args}>
            {children || `Section Heading`}
          </h3>
        );
      case 4:
        return (
          <h4 className={`text-lg md:text-lg font-semibold`} {...args}>
            {children || `Section Heading`}
          </h4>
        );
      case 5:
        return (
          <h5 className={`text-sm md:text-sm font-semibold`} {...args}>
            {children || `Section Heading`}
          </h5>
        );
      case 6:
        return (
          <h6 className={`text-sm md:text-sm font-semibold`} {...args}>
            {children || `Section Heading`}
          </h6>
        );
      default:
        return (
          <h2 className={`text-3xl md:text-3xl font-semibold`} {...args}>
            {children || `Section Heading`}
          </h2>
        );
    }
  };
  return (
    <div className={`nc-Section-Heading relative ${className}`}>
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto mb-4" : "max-w-2xl"
        }
      >
        {renderHeading(level)}
        {desc && (
          <span className="block mt-2 md:mt-3 font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  );
};

export default Heading;
