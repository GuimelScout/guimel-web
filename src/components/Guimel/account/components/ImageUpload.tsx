import React, { useRef, useState } from 'react';
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUpload: (file: File) => void;
  isEditing: boolean;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onImageUpload,
  isEditing,
  isLoading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    if (isEditing && !isLoading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className={`relative rounded-full overflow-hidden cursor-pointer transition-all duration-200 ${
          isEditing ? 'hover:scale-105' : 'cursor-default'
        } ${isLoading ? 'opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <PhotoIcon className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
        
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
            <CameraIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">
              {isLoading ? 'Subiendo...' : 'Cambiar'}
            </span>
          </div>
        )}

        {dragActive && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center rounded-full">
            <div className="text-blue-600 text-sm font-medium">Suelta la imagen aquí</div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={!isEditing || isLoading}
      />

      {isEditing && (
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Haz clic o arrastra una imagen
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            JPG, PNG, GIF hasta 5MB
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
