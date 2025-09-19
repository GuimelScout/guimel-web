import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION, UPLOAD_USER_IMAGE_MUTATION, GET_USER_QUERY } from '../QueryUser.queries';
import { UserType, UserUpdateData } from '../UserTypes';
import { useUser } from '../../../../../context/UserContext';

export const useUserEdit = (user: UserType | undefined) => {
  const { refreshUser } = useUser();
  const [formData, setFormData] = useState<UserUpdateData>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: ['GetUser'],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      if (data?.updateUser) {
        cache.writeQuery({
          query: GET_USER_QUERY,
          variables: { id: user?.id },
          data: {
            user: data.updateUser
          }
        });
      }
    }
  });
  
  const [uploadImage] = useMutation(UPLOAD_USER_IMAGE_MUTATION, {
    refetchQueries: ['GetUser'],
    awaitRefetchQueries: true
  });

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
      // Update basic user data
      const basicUpdateData = {
        name: formData.name?.trim() || '',
        lastName: formData.lastName?.trim() || '',
        secondLastName: formData.secondLastName?.trim() || '',
        email: formData.email?.trim() || '',
        phone: formData.phone?.trim() || '',
        countryCode: formData.countryCode?.trim() || '',
        description: formData.description?.trim() || '',
        instagram: formData.instagram?.trim() || '',
        facebook: formData.facebook?.trim() || '',
        twitter: formData.twitter?.trim() || '',
        linkedin: formData.linkedin?.trim() || '',
        tiktok: formData.tiktok?.trim() || '',
        youtube: formData.youtube?.trim() || '',
        website: formData.website?.trim() || '',
      };


      const basicResult = await updateUser({
        variables: {
          id: user.id,
          data: basicUpdateData
        }
      });

      await refreshUser();

      setSuccess('Perfil actualizado exitosamente');
      setIsEditing(false);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      console.error('Error updating user:', err);
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

      await refreshUser();

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
