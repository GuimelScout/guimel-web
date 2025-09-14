"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";
import { RouteGuimel } from "@/routers/routes";
import Link from "next/link";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Explorar",
    menus: [
      { href: RouteGuimel.home, label: "Inicio" },
      { href: RouteGuimel.activity, label: "Actividades" },
      { href: RouteGuimel.location, label: "Lugares" },
      { href: RouteGuimel.lodging, label: "Hospedaje" },
      { href: RouteGuimel.about, label: "Acerca de" },
    ],
  },
  {
    id: "2",
    title: "Mi Cuenta",
    menus: [
      { href: RouteGuimel.login, label: "Iniciar Sesión" },
      { href: RouteGuimel.signup, label: "Registrarse" },
      { href: RouteGuimel.account, label: "Mi Perfil" },
      { href: RouteGuimel.bookings, label: "Mis Reservas" },
      { href: RouteGuimel.payments, label: "Mis Pagos" },
    ],
  },
  {
    id: "3",
    title: "Para Anfitriones",
    menus: [
      { href: RouteGuimel.my_activities, label: "Mis Actividades" },
      { href: RouteGuimel.my_lodgings, label: "Mis Hospedajes" },
      { href: RouteGuimel.client_bookings, label: "Reservas de Clientes" },
    ],
  },
  {
    id: "4",
    title: "Soporte",
    menus: [
      { href: RouteGuimel.contact, label: "Contacto" },
      { href: "#", label: "Centro de Ayuda" },
      { href: "#", label: "Preguntas Frecuentes" },
      { href: "#", label: "Reportar Problema" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href as any}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo imgLight={{src:"/logo-light.svg",height:280, width:280}} img={{src:"/logo-dark.svg",height:280, width:280}} />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
        
        {/* Términos y Condiciones */}
        <div className="container mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-6000 dark:text-neutral-300">
              © {new Date().getFullYear()} Guimel. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href={"/terminos-y-condiciones" as any}
                className="text-sm text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                Términos y Condiciones
              </Link>
              <Link
                href={"/aviso-de-privacidad" as any}
                className="text-sm text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                Aviso de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
