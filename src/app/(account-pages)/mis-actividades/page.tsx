"use client"

import React, { useEffect, useState } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { ACTIVITIES_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import { useQuery } from "@apollo/client";
import { ActivitiesDataType, ActivityType } from "@/data/types";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { useHostCheck } from "@/components/Guimel/account/hooks/useHostCheck";
import HostOnlyAccess from "@/components/Guimel/account/HostOnlyAccess";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { 
  MapPinIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const ActivityCard = ({ activity }: { activity: ActivityType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Header with image and basic info */}
      <div className="flex items-start gap-4 mb-4">
        {activity?.image?.url ? (
          <img
            src={activity.image.url}
            alt={activity.name}
            className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
          />
        ) : (
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-700 rounded-xl flex items-center justify-center">
            <MapPinIcon className="w-10 h-10 text-blue-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
            {activity.name}
          </h3>
          {activity.location && activity.location.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{activity.location.map(loc => loc.name).join(", ")}</span>
            </div>
          )}
          {activity.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {activity.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4">
        {typeof activity.lodgingCount === 'number' && activity.lodgingCount > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
            <BuildingOfficeIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              {activity.lodgingCount} Hospedaje{activity.lodgingCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        {typeof activity.bookingCount === 'number' && activity.bookingCount > 0 && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
            <UserGroupIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {activity.bookingCount} Reserva{activity.bookingCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Action button */}
      {activity.link && (
        <div className="flex justify-end">
          <a
            href={`/actividad/${activity.link}`}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver detalles →
          </a>
        </div>
      )}
    </div>
  );
};

const AccountBilling = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { hasHostAccess, loading: hostLoading } = useHostCheck();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const pageTitle = "Mis Actividades";

  const { data, loading: loadingActivities } = useQuery<ActivitiesDataType>(ACTIVITIES_QUERY, {
    variables: {
      where: { hostBy: { id: { equals: user?.id ?? undefined } } },
      orderBy: [{createdAt: "desc"}]
    },
    fetchPolicy: "no-cache",
    skip: !hasHostAccess
  });

  // Filter activities based on search term
  const filteredActivities = data?.activities?.filter((activity: ActivityType) => {
    const matchesSearch = searchTerm === "" || 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.location?.some(loc => 
        loc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesSearch;
  }) || [];

  // Calculate statistics
  const stats = {
    total: data?.activities?.length || 0,
    withLodging: data?.activities?.filter(a => a.lodgingCount && a.lodgingCount > 0).length || 0,
    withBookings: data?.activities?.filter(a => a.bookingCount && a.bookingCount > 0).length || 0,
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

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
    <div className="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
            <MapPinIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Actividades</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y supervisa todas tus actividades
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ButtonPrimary 
            href={RouteGuimel.contact} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Nueva Actividad
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <MapPinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
            <BuildingOfficeIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Con Hospedaje</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.withLodging}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <UserGroupIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Con Reservas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.withBookings}</p>
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
            placeholder="Buscar por nombre, descripción o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <MapPinIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tienes actividades aún
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Pide a un administrador que te agregue tus actividades y aparecerán aquí para que puedas gestionarlas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <ButtonPrimary 
          href={RouteGuimel.contact} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Solicitar Actividad
        </ButtonPrimary>
      </div>
    </div>
  );

  const renderNoResults = () => (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
        <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No se encontraron actividades
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Intenta ajustar tu término de búsqueda
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="text-purple-600 dark:text-purple-400 hover:underline"
      >
        Limpiar búsqueda
      </button>
    </div>
  );

  // Show host-only access message if user is not a host
  if (!hostLoading && !hasHostAccess) {
    return (
      <HostOnlyAccess
        title="Conviértete en Anfitrión"
        description="Únete a nuestra comunidad de anfitriones y comparte tus actividades únicas con viajeros de todo el mundo."
        features={[
          "Crea y gestiona tus propias actividades",
          "Establece tus propios precios y horarios",
          "Conecta con viajeros interesados",
          "Genera ingresos adicionales",
          "Construye tu reputación como anfitrión",
          "Accede a herramientas de gestión avanzadas"
        ]}
        ctaText="Convertirme en Anfitrión"
        ctaLink={RouteGuimel.contact}
      />
    );
  }
  
  if (loading || loadingActivities) {
    return renderLoadingState();
  }

  return (
    <div className="space-y-8">
      {renderHeader()}
      {data?.activities && data.activities.length > 0 && renderStats()}
      {data?.activities && data.activities.length > 0 && renderFilters()}
      {data?.activities && data.activities.length > 0 ? (
        filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity: ActivityType) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          renderNoResults()
        )
      ) : (
        renderEmptyState()
      )}
    </div>
  );
};

export default AccountBilling;
