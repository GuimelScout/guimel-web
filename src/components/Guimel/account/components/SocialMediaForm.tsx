import React from 'react';
import { SOCIAL_MEDIA_FIELDS, SocialMediaField } from '../UserTypes';
import { UserUpdateData } from '../UserTypes';

interface SocialMediaFormProps {
  formData: UserUpdateData;
  onInputChange: (field: keyof UserUpdateData, value: string) => void;
  isEditing: boolean;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  formData,
  onInputChange,
  isEditing
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Redes Sociales
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Conecta tus redes sociales para que otros usuarios puedan encontrarte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOCIAL_MEDIA_FIELDS.map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span className="text-lg">{field.icon}</span>
                {field.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    isEditing 
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white' 
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                />
                {formData[field.name] && (
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${field.color}`}></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;
