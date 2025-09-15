"use client";

import StartRating from "@/components/StartRating";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import ImageWithPlaceholder from "@/components/Guimel/ImageWithPlaceholder";
import { useQuery } from "@apollo/client";
import {  CARD_TYPE } from "@/data/types";
import { BOOKING_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import  { formatDateSpanish, parseLocalDateString } from "@/utils/date-format-helper";
import { BookingDataType } from "@/components/Guimel/account/types";
import { RouteGuimel } from "@/routers/routes";
import MapPinIcon from "@/components/Guimel/icons/MapPinIcon";
import { useUser } from "context/UserContext";
import Link from "next/link";
import { CheckCircleIcon, CalendarIcon, UserGroupIcon, MapPinIcon as MapPin, CreditCardIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import SuccessAnimation from "@/components/Guimel/SuccessAnimation";

export interface PayPageProps {
  searchParams: { [key: string]: string | undefined };
}

const PayPage: FC<PayPageProps> = ({ searchParams }) => {
  const { user, loading } = useUser();

  const renderContent = () => {
    const { data, loading: bookingLoading } = useQuery<BookingDataType>(BOOKING_QUERY, {
      variables: { where: { id: searchParams.booking} },
    });

    if (bookingLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!data?.booking) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Reserva no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No pudimos encontrar la reserva solicitada.
          </p>
          <ButtonPrimary href="/">Volver al inicio</ButtonPrimary>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-green-200 dark:border-green-800">
          <div className="flex justify-center mb-6">
            <SuccessAnimation size={80} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Pago Exitoso! 🎉
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Tu reserva ha sido confirmada y está lista para disfrutar
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 inline-block shadow-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Código de reserva</span>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">
              {data.booking.code}
            </p>
          </div>
        </div>

        {/* Activities Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CalendarIcon className="w-6 h-6 mr-3 text-blue-600" />
            Actividades Reservadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.booking.activity?.map((activity) => (
              <div key={activity.id} className="group bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <ImageWithPlaceholder
                    image={activity.image}
                    alt={activity.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    useCardPlaceholder={true}
                    placeholderType="activity"
                  />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {activity.name}
                </h3>
                
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm truncate">{activity.address}</span>
                </div>
                
                <StartRating point={activity.reviewStar} reviewCount={activity.reviewCount} />
              </div>
            ))}
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Detalles del Viaje
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fechas</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatDateSpanish(parseLocalDateString(data.booking.start_date), true)} - {formatDateSpanish(parseLocalDateString(data.booking.end_date))}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <UserGroupIcon className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scouts</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {data.booking.guestsCount} personas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lodging Section */}
        {data.booking.lodging && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-orange-600" />
              Hospedaje Incluido
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden">
                <ImageWithPlaceholder
                  image={data.booking.lodging.logo}
                  alt={data.booking.lodging.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  useCardPlaceholder={true}
                  placeholderType="lodging"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {data.booking.lodging.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    {data.booking.lodging.address}
                  </p>
                </div>
                
                <StartRating point={data.booking.lodging.reviewStar} reviewCount={data.booking.lodging.reviewCount} />
              </div>
            </div>
          </div>
        )}

        {/* Payment Details */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <CreditCardIcon className="w-6 h-6 mr-3 text-purple-600" />
            Detalles del Pago
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400">Total pagado</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${parseFloat(data.booking.payment.amount!).toFixed(2)} MXN
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400">Método de pago</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {CARD_TYPE[data.booking.payment.paymentMethod.cardType as keyof typeof CARD_TYPE] || "Tarjeta"}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400">Fecha de pago</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDateSpanish(parseLocalDateString(data.booking.createdAt.toString().split("T")[0]))}
              </span>
            </div>
            
            {data.booking.payment.notes && (
              <div className="py-3">
                <div className="flex items-start space-x-3">
                  <DocumentTextIcon className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 block text-sm">Notas adicionales</span>
                    <span className="text-gray-900 dark:text-white">{data.booking.payment.notes}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link href={"/reservas" as any}>
              <ButtonPrimary className="w-full sm:w-auto">
                Ver Mis Reservas
              </ButtonPrimary>
            </Link>
          ) : (
            <Link href={RouteGuimel.login}>
              <ButtonPrimary className="w-full sm:w-auto">
                Iniciar Sesión
              </ButtonPrimary>
            </Link>
          )}
          
          <Link href="/">
            <ButtonSecondary className="w-full sm:w-auto">
              Explorar Más Actividades
            </ButtonSecondary>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PayPage min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default PayPage;
