import { ActivityType, LocationType, LodgingType } from "@/data/types";

export interface CheckoutFormData {
  nameCard: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  notes?: string;
}

export interface CheckoutState {
  startDate: Date | null;
  endDate: Date | null;
  guestAdultsInputValue: number;
  guestChildrenInputValue: number;
  isLodging: boolean;
  loadingPayment: boolean;
  lodginSelected: LodgingType | null;
  locationSelected: LocationType | null;
  activitiesSelected: ActivityType[];
}

export interface CheckoutParams {
  activity: string;
  guestsCount: string;
  startD: string;
  endD: string;
}

export interface PaymentData {
  activityIds: string[];
  lodgingId?: string;
  locationId?: string;
  startDate: string;
  endDate: string;
  guestsCount: string;
  nameCard: string;
  email: string;
  notes: string;
  paymentMethodId: string;
  total: string;
  noDuplicatePaymentMethod: boolean;
}

export interface CheckoutSidebarProps {
  data: {
    activity: any;
    activitiesRelated: any;
    loadingActivitiesRelated: boolean;
  };
  checkoutState: CheckoutState;
  onLocationSelect: (location: LocationType) => void;
  onLodgingToggle: () => void;
  onLodgingSelect: (lodging: LodgingType | null) => void;
  onActivityToggle: (activity: ActivityType) => void;
  getTotal: () => string;
}

export interface CheckoutMainProps {
  checkoutState: CheckoutState;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  onGuestsChange: (adults: number, children: number) => void;
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  errors: any;
  register: any;
  loadingPayment: boolean;
}

export interface CheckOutPagePageMainProps {
  className?: string;
  params: { activity: string, guestsCount: string, startD: string, endD: string }
}
