"use client"

import React, { useEffect } from "react";
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

const AccountBilling = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  const { hasHostAccess, loading: hostLoading } = useHostCheck();

  const pageTitle = "Mis Hospedajes";

  const { data, loading: loadingLodgin } = useQuery<LodgingsDataType>(LODGINGS_QUERY, {
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
      {data && data.lodgings && data.lodgings.length > 0 ? (
        data.lodgings.map((p: LodgingType) => {
          return (
            <div
            key={p.id}
            className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-2xl overflow-hidden p-4 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              {p?.logo?.url && (
                <img
                  src={p.logo.url}
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
                {p?.address && (
                  <div className="text-xs text-gray-400">{p.address}</div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {typeof p.activityCount === 'number' && (
                    <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Actividades: {p.activityCount}
                    </div>
                  )}
                </div>
                {p?.link && (
                  <a
                    href={`/hospedaje/${p.link}`}
                    className="text-primary-500 text-sm underline mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver detalles
                  </a>
                )}
              </div>
              {/* Badges alineados a la derecha */}
              <div className="flex flex-col items-end gap-2 min-w-[110px]">
                {typeof p.bookingCount === 'number' && (
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Reservas: {p.bookingCount}
                  </div>
                )}
                {typeof p.paymentCount === 'number' && (
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Pagos: {p.paymentCount}
                  </div>
                )}
                {typeof p.reviewCount === 'number' && (
                  <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    Reseñas: {p.reviewCount}
                  </div>
                )}
                {typeof p.reviewStar === 'number' && (
                  <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                    {p.reviewStar}
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
            ¡Sin Hospedajes aún!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Aún no te han añadido algún hospedaje.<br />
            Pide a un administrador que te agregue tus hospedajes y aparecerán aquí.
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AccountBilling;
