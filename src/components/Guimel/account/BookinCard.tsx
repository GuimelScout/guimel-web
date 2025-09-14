import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { BookingType, STATUS_BOOKING, STATUS_BOOKING_COLORS } from "./types";
import { RouteGuimel } from "@/routers/routes";
import { formatDateSpanish, parseLocalDateString } from "@/utils/date-format-helper";

export interface BookingCardProps {
  className?: string;
  data: BookingType;
}

const BookingCard: FC<BookingCardProps> = ({
  className = "",
  data,
}) => {
  const { 
    id, 
    activity, 
    lodging, 
    payment, 
    status, 
    start_date,
    end_date,
    guestsCount,
    createdAt,
    code
   } = data;

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
         <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={activity?.gallery ?? []}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`ActivityGalleryBooking_${id}`}
          href={undefined}
        /> 
        <Badge
            className="absolute left-5 top-5"
            name={
              <div className="flex items-center">
                <i className="text-sm las la-tag"></i>
                <span className="ml-1">{STATUS_BOOKING[status]}</span>
              </div>
            }
            color={STATUS_BOOKING_COLORS[status]}
          />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="flex flex-col align-left gap-2">
            <h3 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">#{code}</span>
            </h3>
            <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
            <div className="flex flex-row gap-5">
              <h3 className="text-lg font-medium capitalize">
                <Link href={{ pathname: `${RouteGuimel.activity}/${activity?.link}` }}>
                  <span className="line-clamp-2 text-xs text-gray-400">Actividad</span>
                  <span className="line-clamp-2">{`${activity?.name}`}</span>
                </Link>
              </h3>
              {
                lodging ? 
              <h3 className="text-lg font-medium capitalize">
                <Link href={{ pathname: `${RouteGuimel.lodging}/${lodging.link}` }}>
                  <span className="line-clamp-2 text-xs text-gray-400">Hospedaje</span>
                  <span className="line-clamp-2">{lodging ? `${lodging.name}` : ""}</span>
                </Link>
              </h3> : <></>
              }
            </div>
          </div>
         
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-calendar"></i>
                  <span className="ml-1">{formatDateSpanish(parseLocalDateString(data?.start_date), true)} - {formatDateSpanish(parseLocalDateString(data?.end_date))}</span>
                </div>
              }
              color="indigo"
            />
          </div>
          <div className="inline-flex space-x-3 ml-2">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">{guestsCount} personas</span>
                </div>
              }
              color="yellow"
            />
          </div>
         
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <div className="flex w-full justify-between items-end mb-4">
            <div className="flex flex-row gap-2 items-center">
              <span className="text-sm text-green-800">Pagaste:</span>
              <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
                {`$${Number(payment.amount).toFixed(2)}`}
              </span>
            </div>
          </div>
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <span className="text-xs text-gray-400 pt-4">
            Fecha de creación: {data?.createdAt
              ? new Date(data.createdAt).toLocaleString("es-MX", {
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
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
    >
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
       <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
        isLiked={true}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      /> 
    </div>
  );
};

export default BookingCard;
