'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_HOSTER_DETAILS_QUERY, GET_HOSTER_REVIEWS } from './QueryHoster.queries';
import ImageWithPlaceholder from '@/components/Guimel/ImageWithPlaceholder';
import { StarIcon,  MapPinIcon, CalendarIcon, PhoneIcon, EnvelopeIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { InstagramIcon, FacebookIcon, TwitterIcon, LinkedInIcon, TikTokIcon, YouTubeIcon, WebsiteIcon } from '@/components/Guimel/icons/SocialMediaIcons';
import { useCreateReview } from './hooks/useCreateReview';
import Avatar from '@/shared/Avatar';
import PlaceholderCard from '@/components/Guimel/PlaceholderCard';
import { usePlaceholders } from '@/components/Guimel/hooks/usePlaceholders';
import { RouteGuimel } from '@/routers/routes';

interface HosterDetailsClientProps {
  hosterLink: string;
}

const HosterDetailsClient: React.FC<HosterDetailsClientProps> = ({ hosterLink }) => {
  const { data, loading, error, refetch } = useQuery(GET_HOSTER_DETAILS_QUERY, {
    variables: { link: hosterLink },
    fetchPolicy: "cache-and-network"
  });

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(GET_HOSTER_REVIEWS, {
    variables: {  where: {
      OR: [
        //@ts-ignore
        { activity: { hostBy: { id: { equals: data?.user?.id } } } },
        //@ts-ignore
        { lodging: { hostBy: { id: { equals: data?.user?.id } } } },
        //@ts-ignore
        { user: { id: { equals: data?.user?.id } } }
      ]
    },},
    fetchPolicy: "cache-and-network"
  });

  const hoster = data?.user;
  
  const activityPlaceholders = usePlaceholders('activity', hoster?.activity?.length || 0, hoster?.activity?.length < 4 ? 3 : 6 );
  const lodgingPlaceholders = usePlaceholders('lodging', hoster?.lodging?.length || 0, hoster?.lodging?.length < 4 ? 3 : 6  );

  const {
    rating,
    review,
    reviewType,
    isLoading: reviewLoading,
    error: reviewError,
    success: reviewSuccess,
    handleRatingChange,
    handleReviewChange,
    handleReviewTypeChange,
    handleSubmit,
    reset
  } = useCreateReview({
    onSuccess: () => {
      refetch();
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hoster) {
    notFound();
  }
  const fullName = `${hoster.name} ${hoster.lastName} ${hoster.secondLastName || ''}`.trim();
  const displayName = `${hoster.name} ${hoster.lastName}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden sticky top-8">
              
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-6 text-white text-center">
                <div className="relative inline-block">
                <Avatar
                    hasChecked={hoster.verified}
                    sizeClass="h-20 w-20 text-lg"
                    radius="rounded-full"
                    imgUrl={hoster.image?.url}
                    userName={displayName}
                    containerClassName="ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-purple-200 dark:group-hover:ring-purple-800 transition-all duration-300"
                    hasCheckedClass="w-5 h-5 -top-1 -right-1"
                  />
                </div>
                
                <h1 className="text-xl font-bold mt-4 mb-1">{displayName}</h1>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(hoster.reviewStar || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold ml-1">
                    {hoster.reviewStar?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <p className="text-xs text-purple-100">
                  {hoster.totalReviews || 0} reseñas
                </p>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                {/* Description */}
                {hoster.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Sobre mí</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {hoster.description}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <MapPinIcon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {hoster.activityCount || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Actividades</div>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
                    <CalendarIcon className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {hoster.lodgingCount || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Hospedajes</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {hoster.email && (
                    <div className="flex items-center space-x-2 text-sm">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300 truncate">{hoster.email}</span>
                    </div>
                  )}
                  {hoster.phone && (
                    <div className="flex items-center space-x-2 text-sm">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">{hoster.phone}</span>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                {(hoster.instagram || hoster.facebook || hoster.twitter || hoster.linkedin || hoster.tiktok || hoster.youtube || hoster.website) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Redes Sociales</h3>
                    <div className="flex flex-wrap gap-3">
                      {hoster.website && (
                        <a
                          href={hoster.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                          title="Website"
                        >
                          <WebsiteIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                        </a>
                      )}
                      {hoster.instagram && (
                        <a
                          href={`https://instagram.com/${hoster.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 group shadow-lg hover:shadow-xl"
                          title="Instagram"
                        >
                          <InstagramIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {hoster.facebook && (
                        <a
                          href={`https://facebook.com/${hoster.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors group shadow-lg hover:shadow-xl"
                          title="Facebook"
                        >
                          <FacebookIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {hoster.twitter && (
                        <a
                          href={`https://twitter.com/${hoster.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-sky-500 rounded-full hover:bg-sky-600 transition-colors group shadow-lg hover:shadow-xl"
                          title="Twitter/X"
                        >
                          <TwitterIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {hoster.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${hoster.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors group shadow-lg hover:shadow-xl"
                          title="LinkedIn"
                        >
                          <LinkedInIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {hoster.tiktok && (
                        <a
                          href={`https://tiktok.com/@${hoster.tiktok}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors group shadow-lg hover:shadow-xl"
                          title="TikTok"
                        >
                          <TikTokIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                      {hoster.youtube && (
                        <a
                          href={`https://youtube.com/@${hoster.youtube}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full hover:bg-red-700 transition-colors group shadow-lg hover:shadow-xl"
                          title="YouTube"
                        >
                          <YouTubeIcon className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Join Date */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Miembro desde {new Date(hoster.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </div>
              </div>

          
              <div id="review-section" className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Agregar Reseña</h3>
                
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(hoster.id);
                  }}
                >
                  {/* Error/Success Messages */}
                  {reviewError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="text-red-700 dark:text-red-400 text-xs">{reviewError}</p>
                    </div>
                  )}
                  {reviewSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-green-700 dark:text-green-400 text-xs">{reviewSuccess}</p>
                    </div>
                  )}

                  {/* Rating Selection */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Califica tu experiencia
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((starRating) => (
                        <button
                          key={starRating}
                          type="button"
                          onClick={() => handleRatingChange(starRating)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            starRating <= rating
                              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                          }`}
                        >
                          <StarIcon 
                            className={`w-4 h-4 ${
                              starRating <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tu reseña
                    </label>
                    <textarea
                      rows={3}
                      value={review}
                      onChange={(e) => handleReviewChange(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Describe tu experiencia..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={reviewLoading || rating === 0 || !review.trim()}
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reviewLoading ? 'Enviando...' : 'Enviar Reseña'}
                  </button>
                </form>

                {/* Login Prompt */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ¿No tienes cuenta? 
                    <Link href="/registro" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium ml-1">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Actividades</h2>
              {hoster.activity && hoster.activity.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hoster.activity.map((activity: any) => (
                    <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="h-48 relative">
                        <ImageWithPlaceholder
                          image={activity.image}
                          alt={activity.name}
                          fill
                          className="object-cover"
                          placeholderText="Activity"
                          useCardPlaceholder
                          placeholderType='activity'
                        />
                       
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{activity.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{activity.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">${Number(activity.price).toFixed(2)} MXN/persona</span>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.reviewStar?.toFixed(1) || '0.0'} ({activity.reviewCount || 0})
                            </span>
                          </div>
                        </div>
                        <Link 
                          href={`/actividad/${activity.link}`}
                          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-blue-700 transition-colors"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {activityPlaceholders.map((placeholder) => (
                    <PlaceholderCard
                      key={placeholder.key}
                      type={placeholder.type}
                      title={placeholder.title}
                      description={placeholder.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay actividades disponibles</h3>
                  <p className="text-gray-600 dark:text-gray-400">Este anfitrión aún no ha publicado actividades.</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hospedajes</h2>
              {hoster.lodging && hoster.lodging.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hoster.lodging.map((lodging: any) => (
                    <div key={lodging.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="h-48 relative">
                        <ImageWithPlaceholder
                          image={lodging.logo}
                          alt={lodging.name}
                          fill
                          className="object-cover"
                          placeholderText="Lodging"
                          useCardPlaceholder
                          placeholderType='lodging'
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{lodging.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{lodging.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-600">${Number(lodging.price).toFixed(2)} MXN/persona</span>
                          <div className="flex items-center space-x-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {lodging.reviewStar?.toFixed(1) || '0.0'} ({lodging.reviewCount || 0})
                            </span>
                          </div>
                        </div>
                        <Link 
                          href={`/hospedaje/${lodging.link}`}
                          className="mt-3 w-full bg-orange-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-orange-700 transition-colors"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {lodgingPlaceholders.map((placeholder) => (
                    <PlaceholderCard
                      key={placeholder.key}
                      type={placeholder.type}
                      title={placeholder.title}
                      description={placeholder.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay hospedajes disponibles</h3>
                  <p className="text-gray-600 dark:text-gray-400">Este anfitrión aún no ha publicado hospedajes.</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reseñas</h2>
              {reviewsData?.reviews && reviewsData?.reviews.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {reviewsData.reviews.map((review: any) => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 ">
                          <Avatar
                            hasChecked={review.createdBy?.verified}
                            sizeClass="h-12 w-12 text-lg"
                            radius="rounded-full"
                            imgUrl={review.createdBy?.image?.url}
                            userName={`${review.createdBy?.name} ${review.createdBy?.lastName}`}
                            containerClassName="ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-purple-200 dark:group-hover:ring-purple-800 transition-all duration-300"
                            hasCheckedClass="w-5 h-5 -top-1 -right-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                               { (review.createdBy) ?  `${review.createdBy.name} ${review.createdBy.lastName}` : 'Invitado'}
                            </h4>
                            <div className="flex items-center flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {(review.activity || review.lodging) && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 truncate">
                              <>
                              <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                              {` reseña en `}
                              </span>
                              {review.activity ? (
                                <a className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" href={`${RouteGuimel.activity}/${review.activity?.link}`}>{review.activity?.name}</a>
                              ) : (
                                <a className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300" href={`${RouteGuimel.lodging}/${review.lodging?.link}`}>{review.lodging?.name}</a>
                              )}
                              </>
                            </p>
                          )}
                          <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">{review.review}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <StarIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No hay reseñas disponibles</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Sé el primero en dejar una reseña sobre este anfitrión.</p>
                  <button
                    onClick={() => {
                      const reviewSection = document.getElementById('review-section');
                      if (reviewSection) {
                        reviewSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <StarIcon className="w-4 h-4" />
                    Agregar Reseña
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HosterDetailsClient;