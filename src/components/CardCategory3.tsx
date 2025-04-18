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
  const { lodgingCount, name,  image, activityCount, link } = location;
  return (
    //@ts-ignore
    <Link href={`/ubicacion/${link}`} className={`nc-CardCategory3 flex flex-col ${className}`}>
        <div className="relative w-full aspect-w-5 aspect-h-5 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group">
          <Image
            src={image.url || ""}
            className="object-cover w-full h-full rounded-2xl brightness-50"
            alt={`ubicacion ${name} guimel`}
            fill
            sizes="(max-width: 400px) 100vw, 300px"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 transition-opacity opacity-0 group-hover:opacity-100"></span>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl sm:text-3xl font-medium text-white bg-opacity-50 px-4 py-2 rounded-lg">
              {name.toLocaleUpperCase()}
            </h2>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-3 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v8.25M19.5 10.5v8.25M4.5 18.75h15M9.75 14.25h4.5v4.5h-4.5z" />
                </svg>
                <span className="text-md">{lodgingCount} hospedajes</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25l3.09 6.26 6.91 1-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1L12 2.25z" />
                </svg>
                <span className="text-md">{activityCount || 0} actividades</span>
              </div>
            </div>
          </div>
        </div>

    </Link>
  );
};

export default CardCategory3;
