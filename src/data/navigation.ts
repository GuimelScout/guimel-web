import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Inicio",
  },
  {
    id: ncNanoId(),
    href: "/actividad",
    name: "Actividades",
  },
  {
    id: ncNanoId(),
    href: "/ubicacion",
    name: "Lugares",
  },
  {
    id: ncNanoId(),
    href: "/hospedaje",
    name: "Hospedaje",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Acerca de",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Nosotros",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [

];
