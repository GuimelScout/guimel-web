import React, { FC } from "react";
import CardPlaceholder from "./CardPlaceholder";

const PlaceholderDemo: FC = () => {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          New Card Placeholders Preview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Activity Card Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Activity Card</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="activity"
                className="w-full h-full"
                customText="Adventure Activity"
              />
            </div>
          </div>

          {/* Lodging Card Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Lodging Card</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="lodging"
                className="w-full h-full"
                customText="Cozy Hotel"
              />
            </div>
          </div>

          {/* Location Card Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Location Card</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="location"
                className="w-full h-full"
                customText="Beautiful Place"
              />
            </div>
          </div>

          {/* Default Card Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Default Card</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="default"
                className="w-full h-full"
                customText="Generic Content"
              />
            </div>
          </div>

          {/* Activity Card without text */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Activity (No Text)</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="activity"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Lodging Card without text */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Lodging (No Text)</h3>
            <div className="aspect-w-3 aspect-h-3 rounded-xl overflow-hidden">
              <CardPlaceholder
                type="lodging"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2"></div>
              <p className="font-semibold">Themed Colors</p>
              <p>Blue for activities, orange for lodging, green for locations</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mx-auto mb-2"></div>
              <p className="font-semibold">Gradient Backgrounds</p>
              <p>Beautiful gradients with subtle patterns</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2 animate-pulse"></div>
              <p className="font-semibold">Animated Elements</p>
              <p>Floating particles and subtle animations</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2"></div>
              <p className="font-semibold">Professional Icons</p>
              <p>Clear, recognizable icons for each type</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderDemo;
