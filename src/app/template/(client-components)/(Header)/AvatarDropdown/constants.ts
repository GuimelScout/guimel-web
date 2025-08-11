import { RouteGuimel } from "@/routers/routes";
import { MenuItemConfig, SafeUser } from "./types";
import { UserIcon, BookingIcon, CardIcon, HelpIcon } from "./icons";

export const MENU_ITEMS: MenuItemConfig[] = [
  {
    id: "account",
    label: "Mi Cuenta",
    href: RouteGuimel.account,
    icon: UserIcon,
  },
  {
    id: "client-bookings",
    label: "Reservas de clientes",
    href: RouteGuimel.client_bookings,
    icon: BookingIcon,
    condition: (user: SafeUser) => user.isHoster,
  },
  {
    id: "my-bookings",
    label: "Mis Reservas",
    href: RouteGuimel.bookings,
    icon: BookingIcon,
    condition: (user: SafeUser) => !user.isHoster,
  },
  {
    id: "my-lodgings",
    label: "Mis Hospedajes",
    href: RouteGuimel.my_lodgings,
    icon: CardIcon,
    condition: (user: SafeUser) => user.isHoster,
  },
  {
    id: "payments",
    label: "Pagos",
    href: RouteGuimel.payments,
    icon: CardIcon,
    condition: (user: SafeUser) => !user.isHoster,
  },
  {
    id: "my-activities",
    label: "Mis Actividades",
    href: RouteGuimel.my_activities,
    icon: CardIcon,
    condition: (user: SafeUser) => user.isHoster,
  },
  {
    id: "help",
    label: "Ayuda",
    href: "/#",
    icon: HelpIcon,
  },
];

export const MENU_ITEM_CLASSES = {
  container: "flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50",
  iconContainer: "flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300",
  textContainer: "ml-4",
  text: "text-sm font-medium",
};

export const DIVIDER_CLASSES = "w-full border-b border-neutral-200 dark:border-neutral-700";

export const PANEL_CLASSES = {
  container: "absolute z-10 w-screen max-w-[260px] px-4 top-full -right-10 sm:right-0 sm:px-0",
  inner: "overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5",
  content: "relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6",
};