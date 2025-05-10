import React, { FC } from "react";
import { LocationType } from "@/data/types";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Link from "next/link";
import Image from "next/image";

export interface CardCategory3Props {
  className?: string;
  location: LocationType;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = "",
  location,
}) => {
  const { lodgingCount, name, image, activityCount, link } = location;

  return (
    <Link
    //@ts-ignore
    href={`/ubicacion/${link}`}
    className={`nc-CardCategory3 group block rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${className} mb-6`}
  >
    <div className="relative w-full h-48 sm:h-56 overflow-hidden">
      <Image
        src={image.url || ""}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        alt={`ubicación ${name} guimel`}
        fill
        sizes="(max-width: 400px) 100vw, 300px"
      />

      {/* Badge "Favorito" */}
      <div className="absolute top-3 left-3 z-20 bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        Favorito
      </div>

      {/* Gradiente para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
    </div>

    <div className="p-5 space-y-3 relative z-20">
      <h2 className="text-xl font-extrabold text-gray-900 truncate">
        {name.toLocaleUpperCase()}
      </h2>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-indigo-600">
          <svg className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v8.25M19.5 10.5v8.25M4.5 18.75h15M9.75 14.25h4.5v4.5h-4.5z" />
          </svg>
          <span>{lodgingCount} hospedajes</span>
        </div>

        <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-yellow-600">
          <svg className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25l3.09 6.26 6.91 1-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1L12 2.25z" />
          </svg>
          <span>{activityCount || 0} actividades</span>
        </div>
      </div>
    </div>
  </Link>
  );
};

export default CardCategory3;
