import React, { FC } from "react";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { BookingType, STATUS_BOOKING, STATUS_BOOKING_COLORS } from "./types";
import { RouteGuimel } from "@/routers/routes";
import { formatDateSpanish, parseLocalDateString } from "@/utils/date-format-helper";
import { MapPinIcon, CalendarIcon, UserGroupIcon, CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline";
import ImageWithPlaceholder from "../ImageWithPlaceholder";

export interface BookingCardProps {
  className?: string;
  data: BookingType;
}

const BookingCard: FC<BookingCardProps> = ({
  className = "",
  data,
}) => {
  const { 
    id, 
    activity, 
    lodging, 
    payment, 
    status, 
    start_date,
    end_date,
    guestsCount,
    createdAt,
    code
   } = data;

  const location = activity?.[0]?.location?.[0];

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reserva #{code}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateSpanish(parseLocalDateString(start_date), true)} - {formatDateSpanish(parseLocalDateString(end_date))}
            </p>
          </div>
        </div>
        <Badge
          className="px-3 py-1"
          name={STATUS_BOOKING[status]}
          color={STATUS_BOOKING_COLORS[status]}
        />
      </div>
    );
  };

  const renderActivities = () => {
    if (!activity || activity.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Actividades ({activity.length})
        </h4>
        <div className="space-y-3">
          {activity.map((act, index) => (
            <div key={act.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link 
                    href={`${RouteGuimel.activity}/${act.link}` as any}
                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {act.name}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {act.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <CurrencyDollarIcon className="w-3 h-3" />
                      ${Number(act.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3" />
                      {act.address}
                    </span>
                  </div>
                </div>
                <div className="ml-3 w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithPlaceholder
                    image={act.image}
                    alt={act.name}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                    placeholderText=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLodging = () => {
    if (!lodging) return null;

    return (
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          Hospedaje
        </h4>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link 
                href={`${RouteGuimel.lodging}/${lodging.link}` as any}
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                {lodging.name}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                {lodging.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <CurrencyDollarIcon className="w-3 h-3" />
                  ${Number(lodging.price).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {lodging.address}
                </span>
              </div>
            </div>
            {lodging.logo && (
              <div className="ml-3 w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={lodging.logo.url} 
                  alt={lodging.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderLocation = () => {
    if (!location) return null;

    return (
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Ubicación
        </h4>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                {location.name}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {location.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBookingDetails = () => {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Detalles de la Reserva
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Scouts</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{guestsCount} personas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Pagado</p>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ${Number(payment.amount).toFixed(2)} MXN
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fechas Reservadas</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDateSpanish(parseLocalDateString(start_date), true)} - {formatDateSpanish(parseLocalDateString(end_date))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Fecha de Creación</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {createdAt ? new Date(createdAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }) : "Fecha desconocida"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${
                status === 'paid' ? 'bg-green-500' :
                status === 'pending' ? 'bg-yellow-500' :
                status === 'cancelled' ? 'bg-red-500' :
                'bg-blue-500'
              }`}></div>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Estado</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {STATUS_BOOKING[status]}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-BookingCard group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="p-6">
        {renderHeader()}
        {renderActivities()}
        {renderLodging()}
        {renderLocation()}
        {renderBookingDetails()}
      </div>
    </div>
  );
};

export default BookingCard;
