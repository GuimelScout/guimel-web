"use client"

import React, { useEffect } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { PAYMENTS_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import { PaymentsDataType, STATUS_PAYMENTS, STATUS_PAYMENTS_COLORS } from "@/components/Guimel/account/types";
import { useQuery } from "@apollo/client";
import { PaymentType } from "@/data/types";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";

const AccountBilling = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Mis pagos</h2>
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

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading]);

  const { data, loading: loadingPayments } = useQuery<PaymentsDataType>(PAYMENTS_QUERY, {
    variables: {
    where: { user: { id: { equals: user?.id ?? undefined } } },
    orderBy: [{createdAt: "desc"}
  ]
    },
    fetchPolicy: "no-cache",
  });   

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold flex flex-row gap-4 items-center">
      <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 10H21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 15H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 15H13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Pagos</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col gap-3">
      {data && data.payments && data.payments.length > 0 ? (
        data.payments.map((p: PaymentType) => {
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden p-4 flex flex-col gap-4"
            >
              {/* Encabezado */}
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex items-center gap-3">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 15H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 15H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium break-words">Reserva: #{p.booking.code}</span>
                </div>
                <span className="text-sm text-gray-500 break-all">#ID: {p.id}</span>
              </div>

              {/* Detalles de pago */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between items-start sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-800">Pago por:</span>
                  <span className="px-3 py-1.5 border-2 border-secondary-500 rounded-lg text-sm font-medium text-secondary-500">
                    {`$${Number(p.amount).toFixed(2)}`}
                  </span>
                </div>

                <span className={`text-sm px-3 py-1 rounded-xl ${STATUS_PAYMENTS_COLORS[p.status]}`}>
                  {STATUS_PAYMENTS[p.status]}
                </span>

                <span className="text-sm text-gray-400">
                  {p?.createdAt
                    ? new Date(p.createdAt).toLocaleString("es-MX", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "Fecha desconocida"}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4">
          <p className="text-sm text-gray-600 text-center">Aún no tienes pagos</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AccountBilling;
