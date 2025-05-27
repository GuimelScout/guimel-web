"use client";

import React, { FC, useEffect, useState } from "react";
import { LocationType } from "@/data/types";
import CardCategory3 from "@/components/Guimel/CardCategory3";
import Heading from "@/shared/Heading";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import PrevBtn from "../PrevBtn";
import NextBtn from "../NextBtn";
import { variants } from "@/utils/animationVariants";
import { useWindowSize } from "react-use";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: LocationType[];
  categoryCardType?: "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
}
const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Nuestros Spots",
  subHeading = "Hacemos expediciones para descubrir lugares únicos, actividades locales auténticas y opciones reales de hospedaje. Luego, los compartimos con la comunidad.",
  className = "",
  itemClassName = "",
  categories = [],
  itemPerRow = 3,
  categoryCardType = "card3",
  sliderStyle = "style1",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [numberOfItems, setNumberOfitem] = useState(1);

  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 500) {
      setNumberOfitem(1);
    } else if (windowWidth < 768) {
      setNumberOfitem(2);
    } else if (windowWidth < 1024) {
      setNumberOfitem(Math.max(1, itemPerRow - 1));
    } else {
      setNumberOfitem(itemPerRow);
    }
  }, [itemPerRow, windowWidth]);

  function changeItemId(newVal: number) {
    if (newVal > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < categories.length - numberOfItems) {
        changeItemId(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1);
      }
    },
    trackMouse: true,
  });

  const renderCard = (item: LocationType) => {
    return <CardCategory3 location={item} />;
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <Heading desc={subHeading} isCenter={sliderStyle === "style2"}>
        {heading}
      </Heading>

      <MotionConfig
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="relative flow-root" {...handlers}>
          <div className="overflow-hidden rounded-xl">
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 sm:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
              {categories.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                    style={{ width: `${90 / numberOfItems}%` }}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                  >
                    {renderCard(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {currentIndex > 0 && (
            <PrevBtn
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1] hidden sm:block"
            />
          )}

          {categories.length > currentIndex + numberOfItems && (
            <NextBtn
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1] hidden sm:block"
            />
          )}
        </div>
      </MotionConfig>
    </div>
  );
};

export default SectionSliderNewCategories;
