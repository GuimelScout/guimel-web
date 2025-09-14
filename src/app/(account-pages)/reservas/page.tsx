"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "context/UserContext";
import { useQuery } from "@apollo/client";
import { BOOKINGS_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import BookingCard from "@/components/Guimel/account/BookinCard";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { RouteGuimel } from "@/routers/routes";
import { BookingsDataType, BookingType, STATUS_BOOKING } from "@/components/Guimel/account/types";
import { useRouter } from "next/navigation";
import { 
  CalendarIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const AccountSavelists = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading]);

  const { data, loading: loadBookings } = useQuery<BookingsDataType>(BOOKINGS_QUERY, {
    variables: {
      where: { user: { id: { equals: user?.id ?? undefined } } },
      orderBy: [{createdAt: "desc"}]
    },
    fetchPolicy: "no-cache",
  });

  // Filter bookings based on search and status
  const filteredBookings = data?.bookings?.filter((booking) => {
    const matchesSearch = searchTerm === "" || 
      booking.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.activity?.some(act => act.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      booking.lodging?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Calculate statistics
  const stats = {
    total: data?.bookings?.length || 0,
    paid: data?.bookings?.filter(b => b.status === 'paid').length || 0,
    pending: data?.bookings?.filter(b => b.status === 'pending').length || 0,
    cancelled: data?.bookings?.filter(b => b.status === 'cancelled').length || 0,
  };

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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
            <CalendarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Reservas</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y revisa todas tus reservas de actividades
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ButtonPrimary 
            href={RouteGuimel.activity} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Nueva Reserva
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
            placeholder="Buscar por código, actividad o hospedaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
        <CalendarIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tienes reservas aún
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Explora nuestras increíbles actividades y crea tu primera reserva para comenzar tu aventura.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <ButtonPrimary 
          href={RouteGuimel.activity} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Explorar Actividades
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

  const renderBookings = () => (
    <div className="space-y-6">
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} data={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No se encontraron reservas
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Intenta ajustar tus filtros de búsqueda
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return renderLoadingState();
  }

  return (
    <div className="space-y-8">
      {renderHeader()}
      {data?.bookings && data.bookings.length > 0 && renderStats()}
      {data?.bookings && data.bookings.length > 0 && renderFilters()}
      {data?.bookings && data.bookings.length > 0 ? renderBookings() : renderEmptyState()}
    </div>
  );
};

export default AccountSavelists;