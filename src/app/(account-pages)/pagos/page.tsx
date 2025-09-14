"use client"

import React, { useEffect, useState } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { PAYMENTS_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import { PaymentsDataType, STATUS_PAYMENTS, STATUS_PAYMENTS_COLORS } from "@/components/Guimel/account/types";
import { useQuery } from "@apollo/client";
import { PaymentType } from "@/data/types";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { 
  CurrencyDollarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CreditCardIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid, XCircleIcon as XCircleSolid, ExclamationTriangleIcon as ExclamationTriangleSolid } from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/ButtonPrimary";

const AccountBilling = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, loading: loadingPayments } = useQuery<PaymentsDataType>(PAYMENTS_QUERY, {
    variables: {
      where: { user: { id: { equals: user?.id ?? undefined } } },
      orderBy: [{createdAt: "desc"}]
    },
    fetchPolicy: "no-cache",
  });  

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

  // Filter payments based on search and status
  const filteredPayments = data?.payments?.filter((payment) => {
    const matchesSearch = searchTerm === "" || 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.booking.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Calculate statistics
  const stats = {
    total: data?.payments?.length || 0,
    succeeded: data?.payments?.filter(p => p.status === 'succeeded').length || 0,
    pending: data?.payments?.filter(p => p.status === 'pending').length || 0,
    failed: data?.payments?.filter(p => p.status === 'failed').length || 0,
    totalAmount: data?.payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircleSolid className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ExclamationTriangleSolid className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircleSolid className="w-5 h-5 text-red-500" />;
      case 'cancelled':
        return <XCircleSolid className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
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
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
            <BanknotesIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Pagos</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Historial y detalles de todos tus pagos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ButtonPrimary 
            href={RouteGuimel.activity} 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
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
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <BanknotesIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pagos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <CheckCircleSolid className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Exitosos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.succeeded}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
            <ExclamationTriangleSolid className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <CurrencyDollarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Pagado</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalAmount.toFixed(2)}</p>
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
            placeholder="Buscar por ID, código de reserva o monto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">Todos los estados</option>
            <option value="succeeded">Exitosos</option>
            <option value="pending">Pendientes</option>
            <option value="failed">Fallidos</option>
            <option value="cancelled">Cancelados</option>
            <option value="refunded">Reembolsados</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <BanknotesIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tienes pagos aún
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        Cuando realices tu primera reserva y pago, aparecerá aquí tu historial de transacciones.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <ButtonPrimary 
          href={RouteGuimel.activity} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
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

  const renderPaymentCard = (payment: PaymentType) => (
    <div key={payment.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
            <CreditCardIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pago #{payment.id.slice(-8)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reserva #{payment.booking.code}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(payment.status)}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_PAYMENTS_COLORS[payment.status]}`}>
            {STATUS_PAYMENTS[payment.status]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-3">
          <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Monto</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              ${Number(payment.amount).toFixed(2)} MXN
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fecha</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              }) : "Fecha desconocida"}
            </p>
          </div>
        </div>
      </div>

      {payment.notes && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Notas</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{payment.notes}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>ID: {payment.id}</span>
        <span>
          {payment.createdAt ? new Date(payment.createdAt).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }) : ""}
        </span>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      {filteredPayments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPayments.map(renderPaymentCard)}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <MagnifyingGlassIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No se encontraron pagos
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Intenta ajustar tus filtros de búsqueda
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="text-green-600 dark:text-green-400 hover:underline"
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
      {data?.payments && data.payments.length > 0 && renderStats()}
      {data?.payments && data.payments.length > 0 && renderFilters()}
      {data?.payments && data.payments.length > 0 ? renderPayments() : renderEmptyState()}
    </div>
  );
};

export default AccountBilling;
