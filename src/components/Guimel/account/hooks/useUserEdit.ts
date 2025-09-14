import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION, UPLOAD_USER_IMAGE_MUTATION } from '../QueryUser.queries';
import { UserType, UserUpdateData } from '../UserTypes';

export const useUserEdit = (user: UserType | undefined) => {
  const [formData, setFormData] = useState<UserUpdateData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [uploadImage] = useMutation(UPLOAD_USER_IMAGE_MUTATION);

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        secondLastName: user.secondLastName || '',
        email: user.email || '',
        phone: user.phone || '',
        countryCode: user.countryCode || '',
        description: user.description || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        twitter: user.twitter || '',
        linkedin: user.linkedin || '',
        tiktok: user.tiktok || '',
        youtube: user.youtube || '',
        website: user.website || '',
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof UserUpdateData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handleCountryCodeChange = (countryCode: string) => {
    handleInputChange('countryCode', countryCode);
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Filter out empty strings and undefined values
      const updateData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key as keyof UserUpdateData] = value.trim();
        }
        return acc;
      }, {} as UserUpdateData);

      await updateUser({
        variables: {
          id: user.id,
          data: updateData
        }
      });

      setSuccess('Perfil actualizado exitosamente');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        secondLastName: user.secondLastName || '',
        email: user.email || '',
        phone: user.phone || '',
        countryCode: user.countryCode || '',
        description: user.description || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        twitter: user.twitter || '',
        linkedin: user.linkedin || '',
        tiktok: user.tiktok || '',
        youtube: user.youtube || '',
        website: user.website || '',
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      await uploadImage({
        variables: {
          id: user.id,
          image: file
        }
      });

      setSuccess('Imagen actualizada exitosamente');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al subir la imagen');
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = () => {
    if (!user) return false;
    
    return Object.keys(formData).some(key => {
      const field = key as keyof UserUpdateData;
      const currentValue = user[field] || '';
      const formValue = formData[field] || '';
      return currentValue !== formValue;
    });
  };

  return {
    formData,
    isEditing,
    isLoading,
    error,
    success,
    setIsEditing,
    handleInputChange,
    handleCountryCodeChange,
    handleSave,
    handleCancel,
    handleImageUpload,
    hasChanges: hasChanges()
  };
};
