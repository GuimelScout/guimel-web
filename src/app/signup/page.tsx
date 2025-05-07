import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { RouteGuimel } from "@/routers/routes";
import Select from "@/shared/Select";

export interface PageSignUpProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Registro
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">

            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <span className="text-neutral-800 dark:text-neutral-200">Nombre</span>
                <Input type="text" placeholder="Roberto" className="mt-1 w-full" />
              </div>
              <div className="flex-1">
                <span className="text-neutral-800 dark:text-neutral-200">Apellido</span>
                <Input type="text" placeholder="Diaz" className="mt-1 w-full" />
              </div>
            </div>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="ejemplo@guimel.com"
                className="mt-1"
              />
            </label>
            <div className="space-y-1">
              <label>Teléfono*</label>
              <div className="flex flex-row gap-4">
              <Select 
                className="flex-[2]"
                defaultValue="+52"
                >
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+44">🇬🇧 +44</option>
              </Select>

              <Input
                  placeholder="Tu número de teléfono"
                  className="flex-[10]"
                />
              </div>
            </div>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
              </span>
              <Input type="password" placeholder="*********" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            ¿Ya tienes una cuenta? {` `}
            <Link href={RouteGuimel.login} className="font-semibold underline">
              Inicia Sesión
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
