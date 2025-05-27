import React, { FC } from "react";
import ButtonCircle from "@/shared/ButtonCircle";
import rightImg from "@/images/SVG-subcribe2.png";
import Badge from "@/shared/Badge";
import Input from "@/shared/Input";
import Image from "next/image";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
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
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Escribe tu email"
            type="email"
            rounded="rounded-full"
            sizeClass="h-12 px-5 py-3"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
            size="w-10 h-10"
          >
            <i className="las la-arrow-right text-xl"></i>
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
