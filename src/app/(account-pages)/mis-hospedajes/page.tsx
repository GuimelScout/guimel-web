"use client"

import React, { useEffect, useState } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { LODGINGS_QUERY, PAYMENTS_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import { LodgingsDataType, STATUS_PAYMENTS, STATUS_PAYMENTS_COLORS } from "@/components/Guimel/account/types";
import { useQuery } from "@apollo/client";
import { LodgingType, PaymentType } from "@/data/types";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { useHostCheck } from "@/components/Guimel/account/hooks/useHostCheck";
import HostOnlyAccess from "@/components/Guimel/account/HostOnlyAccess";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { 
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  StarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const LodgingCard = ({ lodging }: { lodging: LodgingType }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      {/* Header with logo and basic info */}
      <div className="flex items-start gap-4 mb-4">
        {lodging?.logo?.url ? (
          <img
            src={lodging.logo.url}
            alt={lodging.name}
            className="w-20 h-20 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
          />
        ) : (
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-700 rounded-xl flex items-center justify-center">
            <BuildingOfficeIcon className="w-10 h-10 text-orange-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-orange-900 dark:text-white mb-2">
            {lodging.name}
          </h3>
          {lodging.location && lodging.location.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPinIcon className="w-4 h-4" />
              <span>{lodging.location.map(loc => loc.name).join(", ")}</span>
            </div>
          )}
          {lodging.address && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {lodging.address}
            </p>
          )}
        </div>
      </div>

      {/* Commission info */}
      <div className="mb-4 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
        <div className="flex items-center gap-2 mb-2">
          <DocumentTextIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span className="text-sm font-medium text-teal-900 dark:text-teal-100">Tarifa de Confirmación</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {lodging.commission_type === 'percentage' ? 'Porcentaje' : 'Fijo'}
          </span>
          <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
            {lodging.commission_type === 'percentage' 
              ? `${lodging.commission_value || 0}%` 
              : `$${lodging.commission_value || 0} MXN`
            }
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Precio base:</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            ${Number(lodging.price).toFixed(2)} MXN/persona
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-2 mb-4">
        {typeof lodging.activityCount === 'number' && lodging.activityCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
            <MapPinIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {lodging.activityCount} Actividad{lodging.activityCount !== 1 ? 'es' : ''}
            </span>
          </div>
        )}
        {typeof lodging.bookingCount === 'number' && lodging.bookingCount > 0 && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
            <UserGroupIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {lodging.bookingCount} Reserva{lodging.bookingCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        {typeof lodging.paymentCount === 'number' && lodging.paymentCount > 0 && (
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
            <CheckCircleIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              {lodging.paymentCount} Pago{lodging.paymentCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        {typeof lodging.reviewCount === 'number' && lodging.reviewCount > 0 && (
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
            <StarIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {lodging.reviewCount} Reseña{lodging.reviewCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
        {typeof lodging.reviewStar === 'number' && lodging.reviewStar > 0 && (
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
            <StarIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {lodging.reviewStar} ⭐
            </span>
          </div>
        )}
      </div>

      {/* Action button */}
      {lodging.link && (
        <div className="flex justify-end">
          <a
            href={`/hospedaje/${lodging.link}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium underline"
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

  const pageTitle = "Mis Hospedajes";

  const { data, loading: loadingLodgings } = useQuery<LodgingsDataType>(LODGINGS_QUERY, {
    variables: {
      where: { hostBy: { id: { equals: user?.id ?? undefined } } },
      orderBy: [{createdAt: "desc"}]
    },
    fetchPolicy: "no-cache",
    skip: !hasHostAccess
  });

  // Filter lodgings based on search term
  const filteredLodgings = data?.lodgings?.filter((lodging: LodgingType) => {
    const matchesSearch = searchTerm === "" || 
      lodging.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lodging.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lodging.location?.some(loc => 
        loc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesSearch;
  }) || [];

  // Calculate statistics
  const stats = {
    total: data?.lodgings?.length || 0,
    withActivities: data?.lodgings?.filter(l => l.activityCount && l.activityCount > 0).length || 0,
    withBookings: data?.lodgings?.filter(l => l.bookingCount && l.bookingCount > 0).length || 0,
    withReviews: data?.lodgings?.filter(l => l.reviewCount && l.reviewCount > 0).length || 0,
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
    <div className="bg-gradient-to-r from-orange-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
            <BuildingOfficeIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Hospedajes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y supervisa todas tus propiedades
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ButtonPrimary 
            href={RouteGuimel.contact} 
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Nueva Propiedad
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
            <BuildingOfficeIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <MapPinIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Con Actividades</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.withActivities}</p>
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
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
            <StarIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Con Reseñas</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.withReviews}</p>
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
            placeholder="Buscar por nombre, dirección o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <BuildingOfficeIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tienes hospedajes aún
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Pide a un administrador que te agregue tus hospedajes y aparecerán aquí para que puedas gestionarlos.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <ButtonPrimary 
          href={RouteGuimel.contact} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Solicitar Hospedaje
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
        No se encontraron hospedajes
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Intenta ajustar tu término de búsqueda
      </p>
      <button
        onClick={() => setSearchTerm("")}
        className="text-blue-600 dark:text-blue-400 hover:underline"
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
        description="Únete a nuestra comunidad de anfitriones y ofrece hospedaje único a viajeros de todo el mundo."
        features={[
          "Lista y gestiona tus propiedades",
          "Establece precios competitivos",
          "Recibe huéspedes de todo el mundo",
          "Genera ingresos con tu espacio",
          "Construye tu reputación como anfitrión",
          "Accede a herramientas de gestión avanzadas"
        ]}
        ctaText="Convertirme en Anfitrión"
        ctaLink={RouteGuimel.contact}
      />
    );
  }

  if (loading || loadingLodgings) {
    return renderLoadingState();
  }

  return (
    <div className="space-y-8">
      {renderHeader()}
      {data?.lodgings && data.lodgings.length > 0 && renderStats()}
      {data?.lodgings && data.lodgings.length > 0 && renderFilters()}
      {data?.lodgings && data.lodgings.length > 0 ? (
        filteredLodgings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLodgings.map((lodging: LodgingType) => (
              <LodgingCard key={lodging.id} lodging={lodging} />
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
