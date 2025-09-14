"use client"

import React, { useEffect } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { BOOKINGS_HOSTER_QUERY } from "@/components/Guimel/hoster/QueryHoster.queries";

// Tipos para booking y bookings
interface BookingUser {
  name: string;
  phone: string;
  email: string;
}
interface BookingActivity {
  image?: { url: string };
  name: string;
  link: string;
}
interface BookingLodging {
  name: string;
  logo?: { url: string };
}
interface BookingType {
  id: string;
  code: string;
  start_date: string;
  end_date: string;
  status: string;
  user: BookingUser;
  guestsCount: string;
  createdAt: string;
  activity?: BookingActivity | null;
  lodging?: BookingLodging | null;
}

const BookingCard = ({ booking }: { booking: BookingType }) => {
  // Siempre hay activity
  const activity = booking.activity;
  const lodging = booking.lodging;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden p-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex items-center gap-3">
          {activity?.image?.url && (
            <img
              src={activity.image.url}
              alt={activity.name}
              className="w-14 h-14 object-cover rounded-lg border"
            />
          )}
          <div>
            <div className="font-semibold text-base">{activity?.name}</div>
            <div className="text-xs text-gray-500">Actividad</div>
          </div>
        </div>
        <span className="text-sm text-gray-500 break-all">#{booking.code}</span>
      </div>

      {lodging && (
        <div className="flex items-center gap-3 mt-2">
          {lodging.logo?.url && (
            <img
              src={lodging.logo.url}
              alt={lodging.name}
              className="w-10 h-10 object-cover rounded-lg border"
            />
          )}
          <div>
            <div className="font-semibold text-sm">{lodging.name}</div>
            <div className="text-xs text-gray-500">Hospedaje</div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between items-start sm:items-center">
        <div>
          <span className="text-sm text-gray-800 font-medium">
            Cliente: {booking.user.name}
          </span>
          <span className="block text-xs text-gray-500">
            {booking.user.email} | {booking.user.phone}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-800 font-medium">
            Personas: {booking.guestsCount}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-800 font-medium">
            {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
          </span>
        </div>
        <span className="text-sm px-3 py-1 rounded-xl bg-blue-100 text-blue-700">
          {booking.status === "paid" ? "Pagado" : booking.status}
        </span>
      </div>
      {activity?.link && (
        <a
          href={`/actividad/${activity.link}`}
          className="text-primary-500 text-sm underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver actividad
        </a>
      )}
    </div>
  );
};

const BookingsList = ({ bookings }: { bookings: BookingType[] }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Calendario */}
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Anillas del calendario */}
          <path
            d="M7 3V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 3V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Línea superior */}
          <path
            d="M3 9H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Check de reserva */}
          <path
            d="M9 15l2 2l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200 text-center mb-2">
          ¡Sin reservas aún!
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Aún no han reservado en algún hospedaje o actividad.<br />
          Cuando recibas una reserva, aparecerá aquí.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking: BookingType) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

const ReservasDeClientes = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const pageTitle = 'Reservas de Clientes';

  const { data, loading: loadingBookings } = useQuery(BOOKINGS_HOSTER_QUERY, {
    variables: {
      where: {
        OR: [
          { activity: { some: { hostBy: { id: { equals: user?.id ?? undefined } } }} },
          { lodging: { hostBy: { id: { equals: user?.id ?? undefined } } } },
        ],
      },
      orderBy: [{ createdAt: "desc" }],
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

  if (loading || loadingBookings) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">{pageTitle}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 space-y-6">
            <div className="space-y-8">
              <SkeletonLoader height="h-20" />
              <SkeletonLoader height="h-20" />
              <SkeletonLoader height="h-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold flex flex-row gap-4 items-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* Calendario */}
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Anillas del calendario */}
          <path
            d="M7 3V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 3V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Línea superior */}
          <path
            d="M3 9H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Check de reserva */}
          <path
            d="M9 15l2 2l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {pageTitle}
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <BookingsList bookings={data?.bookings || []} />
    </div>
  );
};

export default ReservasDeClientes;

