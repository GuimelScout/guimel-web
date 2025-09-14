"use client"

import React, { useEffect } from "react";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { ACTIVITIES_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import { useQuery } from "@apollo/client";
import { ActivitiesDataType, ActivityType } from "@/data/types";
import { useRouter } from "next/navigation";
import { RouteGuimel } from "@/routers/routes";
import { useHostCheck } from "@/components/Guimel/account/hooks/useHostCheck";
import HostOnlyAccess from "@/components/Guimel/account/HostOnlyAccess";

const AccountBilling = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { hasHostAccess, loading: hostLoading } = useHostCheck();

  const pageTitle = "Mis Actividades";

  const { data, loading: loadingPayments } = useQuery<ActivitiesDataType>(ACTIVITIES_QUERY, {
    variables: {
      where: { hostBy: { id: { equals: user?.id ?? undefined } } },
      orderBy: [{createdAt: "desc"}
    ]
    },
    fetchPolicy: "no-cache",
    skip: !hasHostAccess
  });  

  useEffect(() => {
    if (!loading && !user) {
      router.push(RouteGuimel.login);
    }
  }, [user, loading, router]);

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
  
  if (loading) {
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
        {pageTitle}</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col gap-3">
      {data && data.activities && data.activities.length > 0 ? (
        data.activities.map((p: ActivityType) => {
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden p-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                {p?.image?.url && (
                  <img
                    src={p.image.url}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                )}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="font-semibold text-lg">{p?.name}</div>
                  {p?.location && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Ubicación:</span> {p.location.map((l) => l.name).join(" | ")}
                    </div>
                  )}
                  {p?.description && (
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {p.description}
                    </div>
                  )}
                  {p?.link && (
                    <a
                      href={`/actividad/${p.link}`}
                      className="text-primary-500 text-sm underline mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver detalles
                    </a>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[110px]">
                  {typeof p.lodgingCount === 'number' && (
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Hospedajes: {p.lodgingCount}
                    </div>
                  )}
                  {typeof p.bookingCount === 'number' && (
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      Reservas: {p.bookingCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10m-9 4h10m-9 4h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 text-center mb-2">
            ¡Sin actividades aún!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Aún no te han añadido alguna actividad.<br />
            Pide a un administrador que te agregue tus actividades y aparecerán aquí.
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AccountBilling;
