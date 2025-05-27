import React, { FC } from "react";
import rightImgDemo from "@/images/BecomeAnAuthorImg.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Logo from "@/shared/Logo";
import Image from "next/image";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-20 self-center" imgLight={{src:"/logo-light.svg",height:600, width:600}} img={{src:"/logo-dark.svg",height:400, width:400}} />
        <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
          Próximo GScouting Trip: Camping Isla Cerralvo
        </h2>
        <span className="block md:text-lg text-neutral-500 dark:text-neutral-400 mt-2">
          Explora antes que todos un paraíso aún sin guías
        </span>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Únete a nuestra expedición exclusiva rumbo a Isla Cerralvo, también conocida como Isla Jacques Cousteau. Te llevamos a acampar en uno de los lugares más prístinos del Mar de Cortés, donde no llegan los tours ni el wifi, pero sí las historias que se quedan para siempre.
        </span>
        <ButtonPrimary className="mt-6 sm:mt-11">
          Únete como Scout
        </ButtonPrimary>
      </div>
      <div className="flex-grow">
        <Image alt="" src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
