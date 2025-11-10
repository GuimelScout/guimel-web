import { TwMainColor } from "@/data/types";

export const LOCATION_TYPES = {
  flora_and_fauna_protection_area: "Area de Proteccion de Flora y Fauna",
  natural_resources_protection_area: "Area de Protección de Recursos Naturales",
  natural_monument: "Monumento Natural",
  national_park: "Parque Nacional",
  biosphere_reserve: "Reserva de la Biosfera",
  sanctuary: "Santuario",
} as const;

export const LOCATION_TYPES_COLORS: Record<keyof typeof LOCATION_TYPES, TwMainColor> = {
  flora_and_fauna_protection_area: "green",
  natural_resources_protection_area: "blue",
  natural_monument: "purple",
  national_park: "yellow",
  biosphere_reserve: "cyan",
  sanctuary: "indigo",
} as const;

