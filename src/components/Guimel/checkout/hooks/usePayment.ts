import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_PAYMENT_METHOD, CREATE_USER, GET_PAYMENT_METHOD, GET_STRIPE_PAYMENT_METHODS, GET_USER, MAKE_PAYMENT } from "@/components/Guimel/checkout/QueryCheckOut.queries";
import { generatePassword } from "@/utils/helpers/generate_password";
import dateFormat from "@/utils/date-format-helper";
import { CheckoutFormData, PaymentData, CheckoutState, PaymentBreakdowns } from "../types";
import { calculatePaymentBreakdowns } from "../utils/calculateTotal";

export const usePayment = () => {
  const client = useApolloClient();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [makePayment] = useMutation(MAKE_PAYMENT);
  const [createUser] = useMutation(CREATE_USER);
  const [createPaymentMethod] = useMutation(CREATE_PAYMENT_METHOD);

  const processPayment = async (
    formData: CheckoutFormData,
    checkoutState: CheckoutState,
    activityData: any
  ) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setLoadingPayment(true);
    const userName = `${formData.nameCard} ${formData.lastName}`;

    try {
      // Get or create user
      const { data: getUser } = await client.query({
        query: GET_USER,
        variables: {
          where: {
            email: formData.email,
          },
        },
        fetchPolicy: 'network-only',
      });

      let userID: string;
      let stripeCustomerId: string | null;

      if (getUser.user) {
        userID = getUser.user.id;
        stripeCustomerId = getUser.user.stripeCustomerId;
      } else {
        const password = generatePassword(formData.nameCard);
        
        const resUser = await createUser({
          variables: {
            data: {
              name: formData.nameCard,
              lastName: formData.lastName,
              phone: formData.phone,
              email: formData.email,
              password: password,
              countryCode: formData.countryCode
            }
          }
        });
        userID = resUser.data.createUser.id;
        stripeCustomerId = resUser.data.createUser.stripeCustomerId;
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: userName,
          email: formData.email,
          phone: formData.phone,
        },
      });

      if (error) {
        toast.error("Error al procesar el pago: " + error.message);
        setLoadingPayment(false);
        return;
      }

      // Check for duplicate payment methods
      const { data: getStripePaymentMethods } = await client.query({
        query: GET_STRIPE_PAYMENT_METHODS,
        variables: {
          email: formData.email,
        },
        fetchPolicy: 'network-only',
      });

      let paymentMethodID: string;
      let noDuplicatePaymentMethod: boolean;

      const methodsList = getStripePaymentMethods?.StripePaymentMethods?.data.data;
      
      const stripePaymentMethodDuplicate = Array.isArray(methodsList)
        ? methodsList.find((method: any) => (
            method.card?.last4 === paymentMethod.card?.last4 &&
            method.card?.exp_month === paymentMethod.card?.exp_month &&
            method.card?.exp_year === paymentMethod.card?.exp_year &&
            method.card?.brand === paymentMethod.card?.brand
          ))
        : undefined;

      if (!stripePaymentMethodDuplicate) {
        const res = await createPaymentMethod({
          variables: {
            data: {
              user: { connect: { id: userID } },
              cardType: paymentMethod.type,
              lastFourDigits: paymentMethod.card?.last4.toString(),
              expMonth: paymentMethod.card?.exp_month.toString(),
              expYear: paymentMethod.card?.exp_year.toString(),
              stripeProcessorId: "-",
              stripePaymentMethodId: paymentMethod.id,
              address: "",
              postalCode: paymentMethod.billing_details.address?.postal_code?.toString(),
              ownerName: userName,
              country: paymentMethod.card?.country,
            }
          }
        });
        paymentMethodID = res.data.createPaymentMethod.id;
        noDuplicatePaymentMethod = true;
            } else {
        const { data: getPaymentMethod } = await client.query({
          query: GET_PAYMENT_METHOD,
          variables: {
            where: {
              stripePaymentMethodId: stripePaymentMethodDuplicate.id,
            }
          },
          fetchPolicy: 'network-only',
        });
        paymentMethodID = getPaymentMethod.paymentMethod.id;
        noDuplicatePaymentMethod = false;
      }

      // Filter out null/undefined activities before calculation
      const validActivities = (checkoutState.activitiesSelected || []).filter(activity => 
        activity !== null && 
        activity !== undefined && 
        activity.id && 
        activity.price !== undefined &&
        activity.price !== null
      );
      
      const breakdown = calculatePaymentBreakdowns(
        validActivities,
        checkoutState.lodginSelected,
        checkoutState.guestAdultsInputValue
      );
      const calculatedTotal = breakdown[checkoutState.paymentType].payNow.toFixed(2);
      
      const paymentData: PaymentData = {
        activityIds: validActivities.map(activity => activity.id),
        lodgingId: checkoutState.lodginSelected?.id,
        locationId: checkoutState.locationSelected?.id,
        startDate: checkoutState.startDate ? dateFormat(checkoutState.startDate) || "" : "",
        endDate: checkoutState.endDate ? dateFormat(checkoutState.endDate) || "" : "",
        guestsCount: (checkoutState.guestAdultsInputValue + checkoutState.guestChildrenInputValue).toString(),
        nameCard: userName,
        email: formData.email,
        notes: formData.notes || "",
        paymentMethodId: paymentMethodID,
        total: calculatedTotal,
        noDuplicatePaymentMethod,
        paymentType: checkoutState.paymentType
      };

      const response = await makePayment({
        variables: paymentData
      });

      if (response.data && response.data.makePayment.success) {
        setLoadingPayment(false);
        toast.success(response.data.makePayment.message);
        router.push(`/pay-done?booking=${response.data.makePayment.data.booking}` as any);
      } else {
        setLoadingPayment(false); 
        toast.error(response.data.makePayment.message, {
          duration: Infinity
        });
      }
    } catch (error) {
      toast.error("Tuvimos un problema de comunicación, intente de nuevo más tarde.", {
        duration: Infinity
      });
      setLoadingPayment(false);
    }
  };

  return {
    processPayment,
    loadingPayment,
  };
};
