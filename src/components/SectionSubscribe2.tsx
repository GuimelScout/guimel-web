"use client";

import React, { FC } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  const router = useRouter();

  const handleJoinScouts = () => {
    // Create URL with predefined message
    const message = encodeURIComponent("Me gustaría ser parte de los scouts");
    router.push(`/contacto?message=${message}`);
  };

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Unete a nuestro equipo de Scouts 🎉</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          ¿Te gustaría ser de los primeros en descubrir nuevos lugares? Únete a nuestras expediciones privadas, ayúdanos a mapear experiencias, y vive lo que otros aún no conocen.
        </span>
        <ul className="space-y-4 mt-10">
          <li className="flex flex-col items-start space-x-4">
            <div className="flex flex-row gap-3">
              <Badge name="01" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Viajas primero, pagas menos
              </span>
            </div>
            <span className="text-neutral-500 dark:text-neutral-400 mt-2">Los spots en scouting tienen tarifas especiales por ser experiencias piloto.</span>
          </li>
          <li className="flex flex-col items-start space-x-4">
            <div className="flex flex-row gap-3">
              <Badge color="red" name="02" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Vive lo auténtico
              </span>
            </div>
            <span className="text-neutral-500 dark:text-neutral-400 mt-2">Sin filtros, sin multitudes. Convivencia directa con quienes hacen el lugar único.</span>
          </li>
           <li className="flex flex-col items-start space-x-4">
            <div className="flex flex-row gap-3">
              <Badge color="green" name="03" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Conecta con otros exploradores
              </span>
            </div>
            <span className="text-neutral-500 dark:text-neutral-400 mt-2">Comparte ruta con personas que, como tú, buscan lo genuino. Historias, caminos y café en fogata.</span>
          </li>
          {/* <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium magazines
            </span>
          </li> */}
        </ul>
        <div className="mt-10">
          <ButtonPrimary 
            onClick={handleJoinScouts}
            className="px-8 py-3 text-lg"
          >
            ¡Quiero ser Scout! 🎯
          </ButtonPrimary>
        </div>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
