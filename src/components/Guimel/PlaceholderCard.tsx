import React from 'react';
import { CalendarIcon, BuildingOfficeIcon, StarIcon } from '@heroicons/react/24/solid';

interface PlaceholderCardProps {
  type: 'activity' | 'lodging' | 'review';
  title: string;
  description: string;
  className?: string;
}

const PlaceholderCard: React.FC<PlaceholderCardProps> = ({ 
  type, 
  title, 
  description, 
  className = '' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'activity':
        return <CalendarIcon className="w-6 h-6 text-gray-400" />;
      case 'lodging':
        return <BuildingOfficeIcon className="w-6 h-6 text-gray-400" />;
      case 'review':
        return <StarIcon className="w-6 h-6 text-gray-400" />;
      default:
        return <CalendarIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 text-center relative overflow-hidden group hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 flex flex-col justify-center items-center min-h-[280px] ${className}`}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform duration-300">
        {getIcon()}
      </div>
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </div>
  );
};

export default PlaceholderCard;
