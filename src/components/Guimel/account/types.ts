import { ActivityType, GalleryImageType, LodgingType, PaymentType, TwMainColor } from "@/data/types";

export interface BookingDataType {
  booking: BookingType;
}

export interface BookingsDataType {
  bookings: Array<BookingType>;
}

export interface BookingType {
  id : string;
  activity?: ActivityType | undefined;
  lodging?: LodgingType | undefined;
  payment: PaymentType;
  gallery?: Array<GalleryImageType>;
  status: string;
  start_date: string;
  end_date: string;
  guestss: number;
  createdAt: Date;
  code: string;
}

export const STATUS_BOOKING : { [key: string]: string } = {
  paid: "Pagado",
  pending: "Pendiente",
  cancelled: "Cancelado",
  confirmed: "Confirmado",
  completed: "Completado",
}

export const STATUS_BOOKING_COLORS : { [key: string]: TwMainColor } = {
  paid: "blue",
  pending: "gray",
  cancelled: "red",
  confirmed: "green",
  completed: "green",
}


export interface LodgingsDataType {
  lodgings: Array<LodgingType>;
}

export const STATUS_PAYMENTS : { [key: string]: string } = {
  pending: "Pendiente",
  processing: "Procesando",
  succeeded: "Exitoso",
  cancelled: "Cancelado",
  failed: "Fallido",
  refunded: "Devuelto",
}

export const STATUS_PAYMENTS_COLORS : { [key: string]: string } = {
  pending: "text-gray-600 bg-gray-100",
  processing: "text-gray-600 bg-gray-100",
  succeeded: "text-green-600 bg-green-100",
  cancelled: "text-red-600 bg-red-100",
  failed: "text-red-600 bg-red-100", 
  refunded: "text-blue-600 bg-blue-100",
}