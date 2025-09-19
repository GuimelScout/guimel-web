import { BookingType } from "@/components/Guimel/account/types";
import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";


export interface LocationType {
  id: string;
  name: string;
  description: string;
  lodgingCount: number;
  activityCount: number;
  link: string;
  image: ImageType;
  gallery?: Array<GalleryImageType>; 
  activity?: Array<ActivityType>;
  lodging?: Array<LodgingType>;
}

export interface ActivityType {
  id:string;
  name: string;
  description: string;
  address:string;
  link: string;
  price: string;
  reviewCount: number;
  reviewStar : number;
  image: ImageType;
  gallery?: Array<GalleryImageType>;
  includes: Array<Include>;
  descriptionActivities?: { document: Element[] };
  hostBy?: Host;
  lodging?: Array<LodgingType>
  lodgingCount?: number;
  location?: Array<LocationType>;
  bookingCount?: number;
}



export interface PaymentType{
  id: string;
  amount: string;
  notes: string;
  status: string;
  paymentMethod: PaymentMethodType;
  booking: BookingType;
  createdAt: Date;
}

export interface PaymentMethodType{
  id: string;
  lastFourDigits: number;
  cardType: string;
}

export const CARD_TYPE: { [key: string]: string } = {
  'card': "Tarjeta",
  'visa': "Visa",
  'mastercard': "Mastercard",
};

export interface LodgingType {
  id:string;
  name: string;
  link: string;
  address:string;
  price: string;
  reviewCount: number;
  reviewStar : number;
  logo: ImageType;
  gallery?: Array<GalleryImageType>;
  includes: Array<Include>;
  hostBy?: Host;
  bookingCount?: number;
  paymentCount?: number;
  activityCount?: number;
  location?: Array<LocationType>;
}

export interface Host {
  id: string;
  name: string; 
  secondLastName: string; 
  lastName: string;
  description: string;
  email: string; 
  phone:string;
  link: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  website?: string;
  activityCount: number;
  lodgingCount: number;
  reviewsCount: number;
  reviewStar:number;
  image: ImageType;
  role: Array<Role>;
  verified: boolean;
  createdAt: Date;
  activity?: Array<ActivityType>;
  lodging?: Array<LodgingType>;
  reviews?: Array<ReviewType>;
}

export interface ReviewType {
  id: string;
  rating: number;
  review: string;
  createdAt: Date;
  user: {
    name: string;
    lastName: string;
    image: ImageType;
  };
  activity?: {
    name: string;
  };
  lodging?: {
    name: string;
  };
}

export interface Role {
  id:string;
  name:string;
}

export type AuthenticatedItem = Host;

export interface Include {
  name: string;
  description: string;
}

export type Text = {
  text: string;
};

export type Element = {
  children: Node[];
  [key: string]: unknown; 
};

export type Node = Element | Text;

export interface LodgingType {
  name: string;
  description: string;
  address:string;
  link: string;
  price: string;
  reviewCount: number;
  reviewStar : number;
  logo: ImageType;
  gallery?: Array<GalleryImageType>; 
}

export interface GalleryImageType {
  id: string;
  description: string;
  image: ImageType
}

export interface ImageType {
  url: string;
}

export interface LocationDataType {
    location: LocationType;
}

export interface ActivityDataType {
  activity: ActivityType;
}

export interface LodgingDataType {
  lodging: LodgingType;
}

export interface ActivitiesDataType {
    activities: Array<ActivityType>;
    activitiesCount:number
}

export interface LodginsDataType {
  lodgings: Array<LodgingType>;
  lodgingsCount:number
}

export interface SlateNode {
  text: string;
  type: string;
  level?: number;
  children: Array<{ text?: string; type?: string; children?: SlateNode[] }>;
}

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string> | string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
