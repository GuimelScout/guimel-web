"use client"

import React, { useEffect, useState } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { BOOKINGS_HOSTER_QUERY } from "@/components/Guimel/hoster/QueryHoster.queries";
import { useHostCheck } from "@/components/Guimel/account/hooks/useHostCheck";
import HostOnlyAccess from "@/components/Guimel/account/HostOnlyAccess";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// Tipos para booking y bookings
interface BookingUser {
  name: string;
  phone: string;
  email: string;
}
interface BookingActivity {
  image?: { url: string } | null;
  name: string;
  link: string;
  hostBy?: {
    id: string;
  };
}
interface BookingLodging {
  name: string;
  logo?: { url: string } | null;
  hostBy?: {
    id: string;
  };
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
  activity?: BookingActivity[] | null;
  lodging?: BookingLodging | null;
}

const BookingCard = ({ booking }: { booking: BookingType }) => {
  const activities = booking.activity || [];
  const lodging = booking.lodging;
  const primaryActivity = activities[0];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {primaryActivity?.image?.url ? (
            <img
              src={primaryActivity.image.url}
              alt={primaryActivity.name}
              className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-700 rounded-xl flex items-center justify-center">
              <MapPinIcon className="w-8 h-8 text-blue-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg text-blue-900 dark:text-white">
              {primaryActivity?.name || 'Actividades'}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPinIcon className="w-4 h-4" />
              <span>
                {activities.length > 1 
                  ? `${activities.length} Actividades` 
                  : 'Actividad'
                }
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Código</div>
          <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
            #{booking.code}
          </div>
        </div>
      </div>

      {/* Activities section - show all if multiple */}
      {activities.length > 1 && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <MapPinIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
              {activities.length} Actividades Incluidas
            </span>
          </div>
          <div className="space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">{activity.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lodging section */}
      {lodging && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-orange-50 dark:bg-orange-700/50 rounded-lg">
          {lodging.logo?.url ? (
            <img
              src={lodging.logo.url}
              alt={lodging.name}
              className="w-10 h-10 object-cover rounded-lg border border-orange-200 dark:border-orange-600"
            />
          ) : (
            <div className="w-10 h-10 bg-orange-200 dark:bg-orange-600 rounded-lg flex items-center justify-center">
              <BuildingOfficeIcon className="w-5 h-5 text-orange-400" />
            </div>
          )}
          <div>
            <div className="font-medium text-orange-900 dark:text-white">{lodging.name}</div>
            <div className="flex items-center gap-2 text-xs text-orange-500 dark:text-orange-400">
              <BuildingOfficeIcon className="w-3 h-3" />
              <span>Hospedaje</span>
            </div>
          </div>
        </div>
      )}

      {/* Client info */}
      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <UserGroupIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-900 dark:text-green-100">Cliente</span>
        </div>
        <div className="text-sm text-gray-900 dark:text-white font-medium">
          {booking.user.name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300">
          {booking.user.email} • {booking.user.phone}
        </div>
      </div>

      {/* Booking details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Fechas</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Personas</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {booking.guestsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Status and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(booking.status)}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
            {booking.status === "paid" ? "Pagado" : 
             booking.status === "pending" ? "Pendiente" :
             booking.status === "cancelled" ? "Cancelado" : booking.status}
          </span>
        </div>
        {primaryActivity?.link && (
          <a
            href={`/actividad/${primaryActivity.link}`}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {activities.length > 1 ? 'Ver actividades' : 'Ver actividad'}
          </a>
        )}
      </div>
    </div>
  );
};

const BookingsList = ({ 
  bookings, 
  onClearFilters,
  hasFilters = false
}: { 
  bookings: BookingType[];
  onClearFilters: () => void;
  hasFilters?: boolean;
}) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {hasFilters ? 'No se encontraron reservas' : 'No tienes reservas de clientes aún'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {hasFilters 
            ? 'Intenta ajustar tus filtros de búsqueda'
            : 'Cuando los clientes reserven tus actividades o hospedajes, aparecerán aquí para que puedas gestionarlas.'
          }
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {bookings.map((booking: BookingType) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

const ReservasDeClientes = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { hasHostAccess, loading: hostLoading } = useHostCheck();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const pageTitle = 'Reservas de Clientes';

  const { data, loading: loadingBookings, error: queryError } = useQuery(BOOKINGS_HOSTER_QUERY, {
    variables: {
      where: {
        OR: [
          { activity: { some: { hostBy: { id: { equals: user?.id ?? undefined } } } } },
          { lodging: { hostBy: { id: { equals: user?.id ?? undefined } } } },
        ],
      },
      orderBy: [{ createdAt: "desc" }],
    },
    fetchPolicy: "no-cache",
    skip: !hasHostAccess
  });


  // Filter bookings based on search and status (hoster filtering is done in GraphQL)
  const filteredBookings = data?.bookings?.filter((booking: BookingType) => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      booking.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.activity?.some(activity => 
        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      booking.lodging?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Calculate statistics based on filtered bookings
  const stats = {
    total: filteredBookings.length,
    paid: filteredBookings.filter((b: BookingType) => b.status === 'paid').length,
    pending: filteredBookings.filter((b: BookingType) => b.status === 'pending').length,
    cancelled: filteredBookings.filter((b: BookingType) => b.status === 'cancelled').length,
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderLoadingState = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
            <UserGroupIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reservas de Clientes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona las reservas de tus actividades y hospedajes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ButtonPrimary 
            href={RouteGuimel.activity} 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ver Actividades
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pagadas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.paid}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
            <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Canceladas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.cancelled}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por código, actividad, hospedaje o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Todos los estados</option>
            <option value="paid">Pagadas</option>
            <option value="pending">Pendientes</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <UserGroupIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tienes reservas de clientes aún
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Cuando los clientes reserven tus actividades o hospedajes, aparecerán aquí para que puedas gestionarlas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <ButtonPrimary 
          href={RouteGuimel.activity} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Ver Actividades
        </ButtonPrimary>
        <ButtonPrimary 
          href={RouteGuimel.lodging} 
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-6 py-3 rounded-lg transition-colors"
        >
          Ver Hospedajes
        </ButtonPrimary>
      </div>
    </div>
  );

  // Show host-only access message if user is not a host
  if (!hostLoading && !hasHostAccess) {
    return (
      <HostOnlyAccess
        title="Conviértete en Anfitrión"
        description="Únete a nuestra comunidad de anfitriones y gestiona las reservas de tus clientes de manera profesional."
        features={[
          "Gestiona todas las reservas de tus actividades",
          "Controla las reservas de tus hospedajes",
          "Comunícate directamente con tus clientes",
          "Monitorea el rendimiento de tu negocio",
          "Accede a reportes detallados",
          "Herramientas de gestión avanzadas"
        ]}
        ctaText="Convertirme en Anfitrión"
        ctaLink={RouteGuimel.contact}
      />
    );
  }

  if (loading || loadingBookings) {
    return renderLoadingState();
  }

  return (
    <div className="space-y-8">
      {renderHeader()}
      {data?.bookings && data.bookings.length > 0 && renderStats()}
      {data?.bookings && data.bookings.length > 0 && renderFilters()}
      {data?.bookings && data.bookings.length > 0 ? (
        <BookingsList 
          bookings={filteredBookings} 
          hasFilters={searchTerm !== "" || statusFilter !== "all"}
          onClearFilters={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
        />
      ) : (
        renderEmptyState()
      )}
    </div>
  );
};

export default ReservasDeClientes;

