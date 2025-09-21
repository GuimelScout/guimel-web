"use client";

import React, { FC } from "react";
import Heading from "@/shared/Heading";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HosterCard from "@/components/Guimel/hoster/HosterCard";
import { useHosters } from "@/components/Guimel/hoster/hooks/useHosters";

interface HostersSectionProps {
  className?: string;
  gridClassName?: string;
  hosterSortBy?: 'reviewStar' | 'createdAt' | 'name';
  hosterSortOrder?: 'asc' | 'desc';
  hosterLimit?: number;
}

const HostersSection: FC<HostersSectionProps> = ({ 
  className, 
  gridClassName, 
  hosterSortBy, 
  hosterSortOrder, 
  hosterLimit 
}) => {
  const { hosters: sortedHosters, loading: hostersLoading } = useHosters({
    sortBy: hosterSortBy,
    sortOrder: hosterSortOrder,
    limit: hosterLimit
  });

  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Conoce a nuestros anfitriones verificados que crean experiencias únicas.
 Historias reales, aventuras auténticas, momentos que transforman." isCenter>
        Nuestros Anfitriones
      </Heading>
      <span className="block text-center md:text-lg text-neutral-500 dark:text-neutral-400 mt-2 mb-2">
        Profesionales certificados que diseñan experiencias inolvidables.
      </span>
      <span className="block text-center md:text-lg text-neutral-500 dark:text-neutral-400 mb-4">
        Conecta con expertos locales y descubre nuevas aventuras.
      </span>
      
      {hostersLoading ? (
        <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
            </div>
          ))}
        </div>
      ) : sortedHosters.length > 0 ? (
        <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
          {sortedHosters.map((hoster, index) => (
            <HosterCard
              key={hoster.id}
              hoster={hoster}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No hay anfitriones disponibles
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Pronto tendremos anfitriones verificados para ti.
          </p>
        </div>
      )}
      
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonPrimary href={"/contacto"} targetBlank>
          Conviértete en Anfitrión
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default HostersSection;
