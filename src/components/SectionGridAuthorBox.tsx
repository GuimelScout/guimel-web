import CardAuthorBox from "@/components/CardAuthorBox";
import CardAuthorBox2 from "@/components/CardAuthorBox2";
import Heading from "@/shared/Heading";
import { DEMO_AUTHORS } from "@/data/authors";
import { AuthorType, Host } from "@/data/types";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import HosterCard from "@/components/Guimel/hoster/HosterCard";
import { useHosters } from "@/components/Guimel/hoster/hooks/useHosters";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
  showHosters?: boolean;
  hosterSortBy?: 'reviewStar' | 'createdAt' | 'name';
  hosterSortOrder?: 'asc' | 'desc';
  hosterLimit?: number;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
  showHosters = false,
  hosterSortBy = 'reviewStar',
  hosterSortOrder, // No default value, let the hook decide
  hosterLimit,
}) => {
  // Use custom hook to get and sort hosters
  const { hosters: sortedHosters, loading: hostersLoading } = useHosters({
    sortBy: hosterSortBy,
    sortOrder: hosterSortOrder, // Will use intelligent default based on sortBy
    limit: hosterLimit
  });

  if (showHosters) {
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
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
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
  }

  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Conoce a quienes ya vivieron la experiencia de scoutear con nosotros.
 Fotos reales, historias compartidas, aventuras que aún resuenan." isCenter>
        Muro Scout: nuestra comunidad exploradora
      </Heading>
      <span className="block text-center md:text-lg text-neutral-500 dark:text-neutral-400 mt-2 mb-2">
        Nuestros scouts comparten sus rutas, recomendaciones y momentos favoritos.
      </span>
      <span className="block text-center md:text-lg text-neutral-500 dark:text-neutral-400 mb-4">
        Dale follow, conecta, y únete a la comunidad que explora con propósito.
      </span>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {authors.map((author, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={author.id} author={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.id}
              author={author}
            />
          )
        )}
      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonPrimary href={"https://www.instagram.com/guimelscouting/"} targetBlank >Unirme al Muro</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;
