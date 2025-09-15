import React, { FC } from "react";
import GallerySlider from "../GallerySlider";
import { GalleryImageType } from "@/data/types";
import { Route } from "@/routers/types";

export interface SmartGallerySliderProps {
  className?: string;
  galleryImgs: GalleryImageType[];
  ratioClass?: string;
  uniqueID: string;
  href?: Route<string>;
  imageClass?: string;
  galleryClass?: string;
  navigation?: boolean;
  cardType?: 'activity' | 'lodging' | 'default';
}

const SmartGallerySlider: FC<SmartGallerySliderProps> = ({
  cardType = 'default',
  ...props
}) => {
  // Determinar el tipo de placeholder basado en el contexto
  const getPlaceholderType = () => {
    if (cardType === 'activity') return 'activity';
    if (cardType === 'lodging') return 'lodging';
    return 'default';
  };

  return (
    <GallerySlider
      {...props}
      // Pasar el tipo de placeholder como prop personalizada
      cardType={getPlaceholderType()}
    />
  );
};

export default SmartGallerySlider;
