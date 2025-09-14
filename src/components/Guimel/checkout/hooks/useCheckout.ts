import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ActivityDataType, ActivitiesDataType} from "@/data/types";
import { ACTIVITIES_QUERY, ACTIVITY_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import { CheckoutState, CheckoutParams } from "../types";
import { calculateTotal, calculateTotalWithCurrency } from "../utils/calculateTotal";

export const useCheckout = (params: CheckoutParams) => {
  const { startD, endD, guestsCount, activity } = params;

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    startDate: null,
    endDate: null,
    guestAdultsInputValue: Number(guestsCount),
    guestChildrenInputValue: 0,
    isLodging: false,
    loadingPayment: false,
    lodginSelected: null,
    locationSelected: null,
    activitiesSelected: [],
  });

  const [total, setTotal] = useState<string>("0.00");

  const { data } = useQuery<ActivityDataType>(ACTIVITY_QUERY, {
    variables: { where: { link: activity } },
  });

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
        id: {
          not: { equals: data?.activity.id }
        }
      }
    },
    fetchPolicy: "no-cache",
    skip: !checkoutState.locationSelected?.id,
  });

  // Initialize dates
  useEffect(() => {
    setCheckoutState(prev => ({
      ...prev,
      startDate: startD ? new Date(startD) : null,
      endDate: endD ? new Date(endD) : null,
    }));
  }, [startD, endD]);

  useEffect(() => {
    if (data?.activity) {
      setCheckoutState(prev => {
        if (!prev.activitiesSelected.some(a => a.id === data.activity.id)) {
          const newState = {
            ...prev,
            activitiesSelected: [data.activity],
          };

          if (data.activity.location && data.activity.location.length > 0) {
            newState.locationSelected = data.activity.location[0] || null;
            setTimeout(() => refetch(), 0);
          }

          return newState;
        }
        return prev;
      });
    }
  }, [data?.activity, refetch]);

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
    data,
    activitiesRelated,
    loadingActivitiesRelated,
    refetch,
    getTotal,
  };
};
