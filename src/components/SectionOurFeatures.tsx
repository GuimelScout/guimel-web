import React, { FC } from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Explora. Descubre. Conecta.
        </span>
        <h2 className="font-semibold text-4xl mt-5">Unete a la Comunidad </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Exploramos por ti" />
            <span className="block text-xl font-semibold">
              Accede a destinos únicos
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Nuestros scouts recorren México en busca de lugares auténticos y experiencias inolvidables. Tú solo eliges a dónde quieres ir.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Visibilidad real, sin costo " />
            <span className="block text-xl font-semibold">
              Conecta con una comunidad viajera
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Publicar tu espacio o experiencia en Scouteando México es gratuito. Nosotros te ayudamos a llegar a personas que valoran lo local y lo distinto.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Reservas seguras y sin complicaciones" />
            <span className="block text-xl font-semibold">
              Simple para ti, confiable para todos
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Facilitamos el contacto directo con los anfitriones. Sin comisiones ocultas, sin rodeos.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
