import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW_MUTATION } from '../QueryReview.queries';
import { GET_HOSTER_DETAILS_QUERY } from '../QueryHoster.queries';

interface CreateReviewData {
  rating: number;
  review: string;
  reviewType: 'activity' | 'lodging';
  targetId: string;
}

interface UseCreateReviewProps {
  onSuccess?: () => void;
}

export const useCreateReview = ({ onSuccess }: UseCreateReviewProps = {}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviewType, setReviewType] = useState<'activity' | 'lodging'>('activity');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [createReview] = useMutation(CREATE_REVIEW_MUTATION, {
    refetchQueries: ['GetHosterDetails'],
    awaitRefetchQueries: true
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setError(null);
  };

  const handleReviewChange = (value: string) => {
    setReview(value);
    setError(null);
  };

  const handleReviewTypeChange = (type: 'activity' | 'lodging') => {
    setReviewType(type);
    setError(null);
  };

  const handleSubmit = async (targetId: string) => {
    if (rating === 0) {
      setError('Por favor selecciona una calificación');
      return;
    }

    if (!review.trim()) {
      setError('Por favor escribe tu reseña');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const reviewData = {
        rating,
        review: review.trim(),
        user: { connect: { id: targetId } }
      };

      await createReview({
        variables: { data: reviewData }
      });

      setSuccess('Reseña enviada exitosamente');
      setRating(0);
      setReview('');
      
      if (onSuccess) {
        onSuccess();
      }
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al enviar la reseña');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setRating(0);
    setReview('');
    setReviewType('activity');
    setError(null);
    setSuccess(null);
  };

  return {
    rating,
    review,
    reviewType,
    isLoading,
    error,
    success,
    handleRatingChange,
    handleReviewChange,
    handleReviewTypeChange,
    handleSubmit,
    reset
  };
};
