import { ActivityType } from "@/data/types";
import { PaymentBreakdowns, CommissionData } from "../types";

/**
 * Calculate Stripe fee: 3.6% + $3.00 MXN
 * @param amount - Amount to calculate fee for
 * @returns Stripe fee amount rounded to 2 decimal places
 */
export const calculateStripeFee = (amount: number): number => {
  return Math.round(((amount * 0.036) + 3) * 100) / 100;
};

/**
 * Calculate commission for an activity or lodging (including Stripe fees)
 * @param price - Base price per guest
 * @param commission - Commission data
 * @returns Commission amount including Stripe fees per guest, rounded to 2 decimal places
 */
export const calculateCommission = (price: number, commission: CommissionData): number => {
  // Ensure commission.value is a valid number
  const commissionValue = Number(commission.value) || 0;
  
  let baseCommission: number;
  if (commission.type === 'percentage') {
    baseCommission = Math.round(((price * commissionValue) / 100) * 100) / 100;
  } else {
    baseCommission = commissionValue;
  }
  
  // Add Stripe fee to the commission (calculated on price + baseCommission)
  const stripeFee = calculateStripeFee(price + baseCommission);
  return Math.round((baseCommission + stripeFee) * 100) / 100;
};

/**
 * Calculate payment breakdown for both payment types
 * @param activitiesSelected - Array of selected activities
 * @param lodginSelected - Selected lodging (can be null)
 * @param guestAdultsInputValue - Number of adult guests
 * @returns Payment breakdowns for both payment types
 */
export const calculatePaymentBreakdowns = (
  activitiesSelected: ActivityType[],
  lodginSelected: any | null,
  guestAdultsInputValue: number
): PaymentBreakdowns => {
  let fullPaymentTotal = 0;
  let commissionOnlyTotal = 0;
  let payAtPropertyTotal = 0;

  // Calculate for activities
  activitiesSelected.forEach(activity => {
    const pricePerGuest = parseFloat(activity.price || "0.00");
    const basePrice = pricePerGuest * guestAdultsInputValue;
    
    // Get commission data from database
    const commission: CommissionData = {
      type: activity.commission_type || 'fixed',
      value: Number(activity.commission_value) || 15 // Convert string to number, default 15 fixed if not specified
    };
    
    // Calculate commission on the total base price, not per guest
    const totalCommissionAmount = calculateCommission(basePrice, commission);
    
    fullPaymentTotal += basePrice + totalCommissionAmount;
    commissionOnlyTotal += totalCommissionAmount;
    payAtPropertyTotal += basePrice;
  });

  // Calculate for lodging if exists
  if (lodginSelected) {
    const pricePerGuest = parseFloat(lodginSelected.price || "0.00");
    const basePrice = pricePerGuest * guestAdultsInputValue;
    
    // Get commission data for lodging from database
    const commission: CommissionData = {
      type: lodginSelected.commission_type || 'percentage',
      value: Number(lodginSelected.commission_value) || 10 // Convert string to number, default 10% if not specified
    };
    
    // Calculate commission on the total base price, not per guest
    const totalCommissionAmount = calculateCommission(basePrice, commission);
    
    fullPaymentTotal += basePrice + totalCommissionAmount;
    commissionOnlyTotal += totalCommissionAmount;
    payAtPropertyTotal += basePrice;
  }

  return {
    full_payment: {
      payNow: fullPaymentTotal,
      payAtProperty: 0
    },
    commission_only: {
      payNow: commissionOnlyTotal,
      payAtProperty: payAtPropertyTotal
    }
  };
};

/**
 * Calculate the total price for checkout including all selected activities and lodging
 * @param activitiesSelected - Array of selected activities
 * @param lodginSelected - Selected lodging (can be null)
 * @param guestAdultsInputValue - Number of adult guests
 * @returns Total price as a string with 2 decimal places
 */
export const calculateTotal = (
  activitiesSelected: ActivityType[],
  lodginSelected: any | null,
  guestAdultsInputValue: number
): string => {
  const activitiesTotal = activitiesSelected.reduce((total, activity) => {
    const activityPrice = parseFloat(activity.price || "0.00") * guestAdultsInputValue;
    return total + activityPrice;
  }, 0);
  
  const lodgingPrice = parseFloat(lodginSelected?.price || "0.00") * guestAdultsInputValue;
  
  const finalTotal = activitiesTotal + lodgingPrice;
  
  return finalTotal.toFixed(2);
};

/**
 * Calculate total and return formatted with currency
 * @param activitiesSelected - Array of selected activities
 * @param lodginSelected - Selected lodging (can be null)
 * @param guestAdultsInputValue - Number of adult guests
 * @returns Formatted total with currency (e.g., "$1050.00 MXN")
 */
export const calculateTotalWithCurrency = (
  activitiesSelected: ActivityType[],
  lodginSelected: any | null,
  guestAdultsInputValue: number
): string => {
  const total = calculateTotal(activitiesSelected, lodginSelected, guestAdultsInputValue);
  return `$${total} MXN`;
};

/**
 * Calculate remaining amount to pay at property for commission_only payments
 * @param booking - Booking object with activity, lodging, and guestsCount
 * @returns Remaining amount as a string with 2 decimal places
 */
export const calculateRemainingAmount = (booking: any): string => {
  if (booking.payment_type !== 'commission_only') return "0.00";
  
  let totalBasePrice = 0;
  
  // Calculate activity base price
  if (booking.activity && booking.activity.length > 0) {
    booking.activity.forEach((activity: any) => {
      const activityPrice = parseFloat(activity.price || "0.00");
      totalBasePrice += activityPrice * booking.guestsCount;
    });
  }
  
  // Calculate lodging base price
  if (booking.lodging) {
    const lodgingPrice = parseFloat(booking.lodging.price || "0.00");
    totalBasePrice += lodgingPrice * booking.guestsCount;
  }
  
  return totalBasePrice.toFixed(2);
};
