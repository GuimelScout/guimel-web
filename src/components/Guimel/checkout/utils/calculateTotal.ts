import { ActivityType } from "@/data/types";

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
