import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface LogoProps {
  img?: StaticImageData;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "w-24",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {img ? (
        <img
          className={`block max-h-30 ${imgLight ? "dark:hidden" : ""}`}
          src={img.src}
          alt="Logo Scouteando México"
        />
      ) : (
        "Logo Guimel"
      )}
      {imgLight && (
        <img
          className="hidden max-h-30 dark:block"
          src={imgLight.src}
          alt="Logo Scouteando México"
        />
      )} 
    </Link>
  );
};

export default Logo;
