import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { ActivityType, StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import GallerySlider from "./GallerySlider";
import { RouteGuimel } from "@/routers/routes";

export interface StayCardProps {
  className?: string;
  data: ActivityType;
  size?: "default" | "small";
}


const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    name,
    address,
    price,
    reviewCount,
    reviewStar,
    id,
    gallery,
    link
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`ExperiencesCard_${name}`}
          ratioClass="aspect-w-3 aspect-h-3"
          galleryImgs={gallery ?? []}
          //@ts-ignore
          href={`${RouteGuimel.activity}/${link}`}
        />
        <BtnLikeIcon isLiked={true} className="absolute right-3 top-3 z-[1]" />
         <SaleOffBadge className="absolute left-3 top-3" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {name} ·  beds
          </span>
          <div className="flex items-center space-x-2">
             <Badge name="ADS" color="green" />
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {price}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          {!!reviewStar && (
            <StartRating reviewCount={reviewCount} point={reviewStar} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
        size === "default"
          ? "border border-neutral-100 dark:border-neutral-800 "
          : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      {/* @ts-ignore */}
      <Link href={`${RouteGuimel.activity}/${link}`}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;
