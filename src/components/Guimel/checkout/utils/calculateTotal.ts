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
 * Calculate base commission for an activity or lodging (without Stripe fees)
 * @param price - Base price
 * @param commission - Commission data
 * @returns Commission amount (without Stripe fees), rounded to 2 decimal places
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
  
  return Math.round(baseCommission * 100) / 100;
};

/**
 * Calculate payment breakdown for both payment types
 * 
 * TOTAL CALCULATION FORMULA:
 * The total is calculated using the following formula:
 *   ((price + commission) * guests) + stripeFee
 * 
 * Where:
 * - price: Base price per person
 * - commission: Commission calculated per person (can be percentage or fixed)
 * - guests: Number of guests
 * - stripeFee: Stripe fee calculated on ((price + commission) * guests)
 * 
 * IMPORTANT: The stripeFee is calculated on the subtotal ((price + commission) * guests),
 * not on the base price only.
 * 
 * For each activity/lodging:
 * 1. Calculate commission per person: calculateCommission(pricePerGuest, commission)
 * 2. Calculate subtotal: (pricePerGuest + commissionPerGuest) * guests
 * 3. Calculate stripeFee on the subtotal: calculateStripeFee(subtotal)
 * 4. Final total is: subtotal + stripeFee
 * 
 * Payment types:
 * - full_payment: Includes base price + commission + stripeFee (everything paid now)
 * - commission_only: Only commission + stripeFee (paid now), base price is paid at property
 * 
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
  if (activitiesSelected.length > 0) {
    activitiesSelected.forEach(activity => {
      const pricePerGuest = parseFloat(activity.price || "0.00");
      
      // Get commission data from database
      const commission: CommissionData = {
        type: activity.commission_type || 'fixed',
        value: Number(activity.commission_value) || 15 // Convert string to number, default 15 fixed if not specified
      };
      
      // Calculate commission per guest (base commission)
      const commissionPerGuest = calculateCommission(pricePerGuest, commission);
      
      // Calculate: (price + commission) * guests
      const subtotal = (pricePerGuest + commissionPerGuest) * guestAdultsInputValue;
      
      // Calculate Stripe fee on the subtotal
      const stripeFee = calculateStripeFee(subtotal);
      
      // Final total: ((price + commission) * guests) + stripeFee
      const finalTotal = subtotal + stripeFee;
      
      fullPaymentTotal += finalTotal;
      commissionOnlyTotal += (commissionPerGuest * guestAdultsInputValue) + stripeFee;
      payAtPropertyTotal += pricePerGuest * guestAdultsInputValue;
    });
  }

  // Calculate for lodging if exists
  if (lodginSelected) {
    const pricePerGuest = parseFloat(lodginSelected.price || "0.00");
    
    // Get commission data for lodging from database
    const commission: CommissionData = {
      type: lodginSelected.commission_type || 'percentage',
      value: Number(lodginSelected.commission_value) || 10 // Convert string to number, default 10% if not specified
    };
    
    // Calculate commission per guest (base commission)
    const commissionPerGuest = calculateCommission(pricePerGuest, commission);
    
    // Calculate: (price + commission) * guests
    const subtotal = (pricePerGuest + commissionPerGuest) * guestAdultsInputValue;
    
    // Calculate Stripe fee on the subtotal
    const stripeFee = calculateStripeFee(subtotal);
    
    // Final total: ((price + commission) * guests) + stripeFee
    const finalTotal = subtotal + stripeFee;
    
    fullPaymentTotal += finalTotal;
    commissionOnlyTotal += (commissionPerGuest * guestAdultsInputValue) + stripeFee;
    payAtPropertyTotal += pricePerGuest * guestAdultsInputValue;
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
