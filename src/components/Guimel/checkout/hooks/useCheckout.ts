import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ActivityDataType, ActivitiesDataType, LodgingDataType} from "@/data/types";
import { ACTIVITIES_QUERY, ACTIVITY_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import { CheckoutState, CheckoutParams, PaymentBreakdowns } from "../types";
import { calculateTotal, calculateTotalWithCurrency, calculatePaymentBreakdowns } from "../utils/calculateTotal";
import { LODGING_QUERY } from "../../hospedaje/QueryHospedaje.queries";

export const useCheckout = (params: CheckoutParams) => {
  const { startD, guestsCount, activity, lodging } = params;

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    startDate: null,
    guestAdultsInputValue: Number(guestsCount),
    guestChildrenInputValue: 0,
    isLodging: false,
    loadingPayment: false,
    lodginSelected: null,
    locationSelected: null,
    activitiesSelected: [],
    paymentType: 'full_payment',
  });

  const [total, setTotal] = useState<string>("0.00");
  const [breakdown, setBreakdown] = useState<PaymentBreakdowns>({
    full_payment: { payNow: 0, payAtProperty: 0 },
    commission_only: { payNow: 0, payAtProperty: 0 }
  });

  let activityData: ActivityDataType | undefined;
  let lodgingData: LodgingDataType | undefined;

  if(activity) {
  
    const { data: activityDataQuery } = useQuery<ActivityDataType>(ACTIVITY_QUERY, {
      variables: { where: { link: activity } },
    });

    activityData = activityDataQuery;
  
  } else if(lodging) {
  
    const { data: lodgingDataQuery } = useQuery<LodgingDataType>(LODGING_QUERY, {
      variables: { where: { link: lodging } },
    });
    lodgingData = lodgingDataQuery;
  
  }

  const { data: activitiesRelated, loading: loadingActivitiesRelated, refetch } = useQuery<ActivitiesDataType>(ACTIVITIES_QUERY, {
    variables: {
      where: {
        location: {
          some: {
            id: {
              equals: checkoutState.locationSelected?.id
            }
          }
        },
        ...(activityData ? {
          id: {
            not: { equals: activityData?.activity.id }
          }
        } : {}),
        ...(lodgingData ? {
          lodging: {
            some: {
              id: { equals: lodgingData?.lodging.id }
            }
          }
        } : {}),
      }
    },
    fetchPolicy: "no-cache",
    skip: !checkoutState.locationSelected?.id,
  });

  useEffect(() => {
    setCheckoutState(prev => ({
      ...prev,
      startDate: startD ? (() => {
        const [year, month, day] = startD.split('-').map(Number);
        return new Date(year, month - 1, day);
      })() : null,
    }));
  }, [startD]);

  useEffect(() => {
    if (activityData && activityData?.activity) {
      setCheckoutState(prev => {
        if (
          !prev.activitiesSelected.some(a => a.id === activityData!.activity?.id)
        ) {
          const newState = {
            ...prev,
            activitiesSelected: [activityData!.activity],
          };

          if (
            Array.isArray(activityData!.activity.location) &&
            activityData!.activity.location.length > 0
          ) {
            newState.locationSelected = activityData!.activity.location[0] || null;
            setTimeout(() => refetch(), 0);
          }

          return newState;
        }
        return prev;
      });
    }
    if (lodgingData && lodgingData?.lodging) {
      setCheckoutState(prev => {
        if (!prev.isLodging) {
          const newState = {
            ...prev,
            lodginSelected: lodgingData!.lodging,
          };

          if (lodgingData!.lodging.location && lodgingData!.lodging.location.length > 0) {
            newState.locationSelected = lodgingData!.lodging.location[0] || null;
            setTimeout(() => refetch(), 0);
          }

          return newState;
        }
        return prev;
      });
    }

  }, [activityData?.activity, refetch, lodgingData?.lodging]);

  useEffect(() => {
    if (checkoutState.locationSelected?.id) {
      refetch();
    }
  }, [checkoutState.locationSelected?.id, refetch]);

  useEffect(() => {
    const total = calculateTotal(
      checkoutState.activitiesSelected,
      checkoutState.lodginSelected,
      checkoutState.guestAdultsInputValue
    );
    setTotal(total);

    const paymentBreakdowns = calculatePaymentBreakdowns(
      checkoutState.activitiesSelected,
      checkoutState.lodginSelected,
      checkoutState.guestAdultsInputValue
    );
    setBreakdown(paymentBreakdowns);
  }, [
    checkoutState.activitiesSelected.length,
    checkoutState.activitiesSelected.map(a => a.id).join(','),
    checkoutState.lodginSelected?.id,
    checkoutState.guestAdultsInputValue
  ]);

  const updateCheckoutState = (updates: Partial<CheckoutState>) => {
    setCheckoutState(prev => {
      const newState = { ...prev, ...updates };
      
      if (updates.locationSelected?.id) {
        setTimeout(() => {
          refetch();
        }, 100);
      }

        if (updates.activitiesSelected) {
          const total = calculateTotal(
            newState.activitiesSelected,
            newState.lodginSelected,
            newState.guestAdultsInputValue
          );
          setTotal(total);

          const paymentBreakdowns = calculatePaymentBreakdowns(
            newState.activitiesSelected,
            newState.lodginSelected,
            newState.guestAdultsInputValue
          );
          setBreakdown(paymentBreakdowns);
        }
      
      return newState;
    });
  };

  const getTotal = (): string => {
    return calculateTotalWithCurrency(
      checkoutState.activitiesSelected,
      checkoutState.lodginSelected,
      checkoutState.guestAdultsInputValue
    );
  };

  return {
    checkoutState,
    updateCheckoutState,
    activityData,
    lodgingData,
    activitiesRelated,
    loadingActivitiesRelated,
    refetch,
    getTotal,
    breakdown,
  };
};
