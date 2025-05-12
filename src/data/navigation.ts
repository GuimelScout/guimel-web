import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";
import { RouteGuimel } from "@/routers/routes";

export const NAVIGATION: NavItemType[] = [
  {
    id: ncNanoId(),
    href: RouteGuimel.home,
    name: "Inicio",
  },
  {
    id: ncNanoId(),
    href: RouteGuimel.activity,
    name: "Actividades",
  },
  {
    id: ncNanoId(),
    href: RouteGuimel.location,
    name: "Lugares",
  },
  {
    id: ncNanoId(),
    href: RouteGuimel.lodging,
    name: "Hospedaje",
  },
  {
    id: ncNanoId(),
    href: RouteGuimel.about,
    name: "Acerca de",
  },
  {
    id: ncNanoId(),
    href: RouteGuimel.contact,
    name: "Contacto",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [

];
