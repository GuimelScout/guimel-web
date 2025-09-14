import React from "react";
import Image from "next/image";

const LogoSvgLight = () => {
  return (
    <Image
        className="hidden lg:block absolute lg:left-full lg:top-0 xl:top-1/2 z-10  lg:max-w-sm 2xl:max-w-none"
        src={"/logo.svg"}
        width={50}
        height={50}
        alt="Logo Guimel"
      />
  );
};

export default LogoSvgLight;
