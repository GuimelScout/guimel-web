import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';
import { CREATE_CONTACT_MUTATION } from '../QueryContact.queries';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface UseContactFormProps {
  onSuccess?: () => void;
}

export const useContactForm = ({ onSuccess }: UseContactFormProps = {}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createContact] = useMutation(CREATE_CONTACT_MUTATION);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return;
    }
    
    if (!formData.phone.trim()) {
      setError('El teléfono es requerido');
      return;
    }
    
    if (!formData.message.trim()) {
      setError('El mensaje es requerido');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await createContact({
        variables: {
          data: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim()
          }
        }
      });

      // Show success toast
      toast.success('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (err: any) {
      console.error('Error creating contact:', err);
      const errorMessage = err.message || 'Error al enviar el mensaje. Intenta de nuevo.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setError(null);
  };

  return {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    reset
  };
};
