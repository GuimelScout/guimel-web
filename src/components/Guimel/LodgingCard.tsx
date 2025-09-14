import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_EXPERIENCES_LISTINGS } from "@/data/listings";
import { ActivityType, ExperiencesDataType, LodgingType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import { MapPinIcon, HomeIcon } from "@heroicons/react/24/outline";

export interface LodgingCardProps {
  className?: string;
  ratioClass?: string;
  data: LodgingType;
  size?: "default" | "small";
}

const LodgingCard: FC<LodgingCardProps> = ({
  size = "default",
  className = "",
  data,
  ratioClass = "aspect-w-3 aspect-h-3",
}) => {

  const {name, address, link, price, reviewCount, reviewStar, gallery} = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-xl overflow-hidden border-2 border-orange-100 shadow-lg">
        <GallerySlider
          uniqueID={`ExperiencesCard_${name}`}
          ratioClass={ratioClass}
          galleryImgs={gallery ?? []}
          //@ts-ignore
          href={`hospedaje/${link}`}
        />
        <BtnLikeIcon isLiked={true} className="absolute right-2 top-2" />
        {/* Lodging Icon */}
        <div className="absolute left-2 top-2 bg-orange-500 text-white p-1.5 rounded-lg shadow-lg">
          <HomeIcon className="w-3 h-3" />
        </div>
        {/* Lodging Badge */}
        <div className="absolute left-2 bottom-2">
          <Badge name="Hospedaje" color="yellow" className="bg-orange-500 text-white text-xs px-2 py-1" />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "py-4 space-y-3 p-3" : "p-2 space-y-1"}>
        <div className="space-y-1">
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-xs space-x-1">
            {size === "default" && <MapPinIcon className="w-4 h-4" />}
            {size === "small" && <MapPinIcon className="w-3 h-3" />}
            <span className="line-clamp-1">{address}</span>
          </div>

          <div className="flex items-center space-x-2">
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-base" : "text-sm"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
        </div>
        <div className="border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className={size === "default" ? "text-base font-semibold" : "text-sm font-semibold"}>
            ${parseFloat(price).toFixed(2)}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /persona
              </span>
            )}
            {size === "small" && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                /persona
              </span>
            )}
          </span>
          <StartRating reviewCount={reviewCount} point={reviewStar || 0} />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ExperiencesCard group relative bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-1 ${className}`}>
      {renderSliderGallery()}
     {/*  @ts-ignore */}
     <Link href={`hospedaje/${link}`}>{renderContent()}</Link>
    </div>
  );
};

export default LodgingCard;
