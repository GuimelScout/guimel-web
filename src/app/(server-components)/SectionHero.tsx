import React, { FC } from "react";
import imagePng from "@/images/hero-right.png";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
  title?:string;
  subtitle?:string;
  image?:string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "",title = "Scouteando México", subtitle="Unimos a la Comunidad con esos lugares ocultos de México.", image=imagePng }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14  xl:pr-14 lg:mr-10 xl:mr-0">
          <h1 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            {title}
          </h1>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </span>
          <ButtonPrimary
            onClick={() => {
              const el = document.getElementById("gscouting-trip");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            sizeClass="px-5 py-4 sm:px-7"
          >
            GScouting Trip
          </ButtonPrimary> 
        </div>
        <div className="flex-grow">
          <Image className="w-full h-auto rounded-lg" src={image} alt={title} width={500} height={500}/>
        </div>
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
       {/*  <HeroSearchForm /> */}
      </div> 
    </div>
  );
};

export default SectionHero;
