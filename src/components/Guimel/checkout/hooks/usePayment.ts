import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CREATE_PAYMENT_METHOD, CREATE_USER, GET_PAYMENT_METHOD, GET_STRIPE_PAYMENT_METHODS, GET_USER, MAKE_PAYMENT } from "@/components/Guimel/checkout/QueryCheckOut.queries";
import { generatePassword } from "@/utils/helpers/generate_password";
import dateFormat from "@/utils/date-format-helper";
import { CheckoutFormData, PaymentData, CheckoutState } from "../types";

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
    console.log("🚀 [usePayment] Starting payment process");
    console.log("📋 [usePayment] Form data:", formData);
    console.log("🛒 [usePayment] Checkout state:", checkoutState);
    console.log("🎯 [usePayment] Activity data:", activityData);

    if (!stripe || !elements) {
      console.log("❌ [usePayment] Stripe or elements not available");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log("❌ [usePayment] Card element not found");
      return;
    }

    setLoadingPayment(true);
    const userName = `${formData.nameCard} ${formData.lastName}`;
    console.log("👤 [usePayment] User name:", userName);

    try {
      // Get or create user
      console.log("🔍 [usePayment] Looking for user with email:", formData.email);
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
        console.log("✅ [usePayment] User found:", getUser.user);
        userID = getUser.user.id;
        stripeCustomerId = getUser.user.stripeCustomerId;
      } else {
        console.log("🆕 [usePayment] Creating new user");
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
        console.log("✅ [usePayment] User created:", resUser.data.createUser);
        userID = resUser.data.createUser.id;
        stripeCustomerId = resUser.data.createUser.stripeCustomerId;
      }

      // Create payment method
      console.log("💳 [usePayment] Creating payment method with Stripe");
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
        console.log("❌ [usePayment] Stripe payment method error:", error);
        toast.error("Error al procesar el pago: " + error.message);
        setLoadingPayment(false);
        return;
      }
      console.log("✅ [usePayment] Payment method created:", paymentMethod);

      // Check for duplicate payment methods
      console.log("🔍 [usePayment] Checking for duplicate payment methods");
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
      console.log("📋 [usePayment] Existing payment methods:", methodsList);
      
      const stripePaymentMethodDuplicate = Array.isArray(methodsList)
        ? methodsList.find((method: any) => (
            method.card?.last4 === paymentMethod.card?.last4 &&
            method.card?.exp_month === paymentMethod.card?.exp_month &&
            method.card?.exp_year === paymentMethod.card?.exp_year &&
            method.card?.brand === paymentMethod.card?.brand
          ))
        : undefined;

      if (!stripePaymentMethodDuplicate) {
        console.log("🆕 [usePayment] Creating new payment method in database");
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
        console.log("✅ [usePayment] New payment method created:", paymentMethodID);
      } else {
        console.log("♻️ [usePayment] Using existing payment method:", stripePaymentMethodDuplicate.id);
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
        console.log("✅ [usePayment] Existing payment method found:", paymentMethodID);
      }

      // Create payment
      console.log("💰 [usePayment] Preparing payment data");
      const calculatedTotal = calculateTotal(checkoutState, activityData);
      console.log("🧮 [usePayment] Calculated total:", calculatedTotal);
      
      const paymentData: PaymentData = {
        activityIds: checkoutState.activitiesSelected.map(activity => activity.id),
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
        noDuplicatePaymentMethod
      };

      console.log("📤 [usePayment] Sending payment data to backend:", paymentData);
      const response = await makePayment({
        variables: paymentData
      });
      console.log("📥 [usePayment] Backend response:", response);

      if (response.data && response.data.makePayment.success) {
        console.log("🎉 [usePayment] Payment successful!");
        console.log("📋 [usePayment] Booking ID:", response.data.makePayment.data.booking);
        setLoadingPayment(false);
        toast.success(response.data.makePayment.message);
        router.push(`/pay-done?booking=${response.data.makePayment.data.booking}`);
      } else {
        console.log("❌ [usePayment] Payment failed:", response.data?.makePayment?.message);
        setLoadingPayment(false);
        toast.error(response.data.makePayment.message, {
          duration: Infinity
        });
      }
    } catch (error) {
      console.log("💥 [usePayment] Payment process error:", error);
      toast.error("Tuvimos un problema de comunicación, intente de nuevo más tarde.", {
        duration: Infinity
      });
      setLoadingPayment(false);
    }
  };

  const calculateTotal = (checkoutState: CheckoutState, activityData: any): string => {
    console.log("🧮 [usePayment] Calculating total for activities:", checkoutState.activitiesSelected);
    console.log("🧮 [usePayment] Guest adults count:", checkoutState.guestAdultsInputValue);
    console.log("🧮 [usePayment] Selected lodging:", checkoutState.lodginSelected);
    
    // Use the same calculation logic as useCheckout
    const activitiesTotal = checkoutState.activitiesSelected.reduce((total, activity) => {
      const activityPrice = parseFloat(activity.price || "0.00") * checkoutState.guestAdultsInputValue;
      console.log(`🧮 [usePayment] Activity ${activity.name}: $${activity.price} x ${checkoutState.guestAdultsInputValue} = $${activityPrice}`);
      return total + activityPrice;
    }, 0);
    
    const lodgingPrice = parseFloat(checkoutState.lodginSelected?.price || "0.00") * checkoutState.guestAdultsInputValue;
    console.log(`🧮 [usePayment] Lodging price: $${checkoutState.lodginSelected?.price || "0.00"} x ${checkoutState.guestAdultsInputValue} = $${lodgingPrice}`);
    
    const finalTotal = (activitiesTotal + lodgingPrice).toFixed(2);
    console.log(`🧮 [usePayment] Final total: ${activitiesTotal} + ${lodgingPrice} = ${finalTotal}`);
    
    return finalTotal;
  };

  return {
    processPayment,
    loadingPayment,
  };
};
