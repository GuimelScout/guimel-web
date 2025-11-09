import React, { FC, useEffect } from "react";
import { useUser } from "context/UserContext";
import { Toaster } from 'sonner';
import { useCheckout } from "./hooks/useCheckout";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { usePayment } from "./hooks/usePayment";
import CheckoutSidebar from "./components/CheckoutSidebar";
import PaymentForm from "./components/PaymentForm";
import { CheckOutPagePageMainProps } from "./types";

const CheckoutPageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  params
}) => {
  const { user } = useUser();
  const { checkoutState, updateCheckoutState, data, activitiesRelated, loadingActivitiesRelated, getTotal, breakdown } = useCheckout(params);
  const form = useCheckoutForm(user);
  const { processPayment, loadingPayment } = usePayment();

  useEffect(() => {
    if (user) {
      form.reset({
        nameCard: user.name ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        countryCode: "+52",
        phone: user.phone ?? "",
        notes: "",
      });
    }
  }, [user, form]);

  const handleLocationSelect = (location: any) => {
    if (data?.activity) {
      updateCheckoutState({
        activitiesSelected: [data.activity],
        locationSelected: location,
      });
    }
  };

  const handleLodgingToggle = () => {
    updateCheckoutState({
      isLodging: !checkoutState.isLodging,
      lodginSelected: checkoutState.isLodging ? null : checkoutState.lodginSelected,
    });
  };

  const handleLodgingSelect = (lodging: any) => {
    updateCheckoutState({
      lodginSelected: lodging,
      isLodging: lodging !== null,
    });
  };

  const handleActivityToggle = (activity: any) => {
    updateCheckoutState({
      activitiesSelected: checkoutState.activitiesSelected.includes(activity)
        ? checkoutState.activitiesSelected.filter((item) => item !== activity)
        : [...checkoutState.activitiesSelected, activity],
    });
  };

  const handleDateChange = (startDate: Date | null) => {
    updateCheckoutState({ startDate });
  };

  const handleGuestsChange = (adults: number, children: number) => {
    updateCheckoutState({
      guestAdultsInputValue: adults,
      guestChildrenInputValue: children,
    });
  };

  const handlePaymentTypeChange = (paymentType: 'full_payment' | 'commission_only') => {
    updateCheckoutState({ paymentType });
  };

  const handleSubmit = async (e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    const formData = form.getValues();
    await processPayment(formData, checkoutState, data);
  };

  const renderSidebar = () => (
    <CheckoutSidebar
      data={{
        activity: data?.activity,
        activitiesRelated: activitiesRelated?.activities || [],
        loadingActivitiesRelated,
      }}
      checkoutState={checkoutState}
      onLocationSelect={handleLocationSelect}
      onLodgingToggle={handleLodgingToggle}
      onLodgingSelect={handleLodgingSelect}
      onActivityToggle={handleActivityToggle}
      getTotal={getTotal}
      breakdown={breakdown}
    />
  );


  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10">
          <PaymentForm
            onSubmit={handleSubmit}
            errors={form.formState.errors}
            register={form.register}
            loadingPayment={loadingPayment}
            total={getTotal()}
            paymentType={checkoutState.paymentType}
            onPaymentTypeChange={handlePaymentTypeChange}
            breakdown={breakdown}
            startDate={checkoutState.startDate}
            setStartDate={(date) => {
              const newDate = typeof date === 'function' ? date(checkoutState.startDate) : date;
              handleDateChange(newDate);
            }}
            guestAdultsInputValue={checkoutState.guestAdultsInputValue}
            setGuestAdultsInputValue={(value) => {
              const newValue = typeof value === 'function' ? value(checkoutState.guestAdultsInputValue) : value;
              handleGuestsChange(newValue, checkoutState.guestChildrenInputValue);
            }}
            guestChildrenInputValue={checkoutState.guestChildrenInputValue}
            setGuestChildrenInputValue={(value) => {
              const newValue = typeof value === 'function' ? value(checkoutState.guestChildrenInputValue) : value;
              handleGuestsChange(checkoutState.guestAdultsInputValue, newValue);
            }}
            activity={data?.activity ?? null}
          />
        </div>
        
        <div className="hidden lg:block flex-grow">
          {renderSidebar()}
        </div>
      </main>
      
      <Toaster position="bottom-center" closeButton richColors />
    </div>
  );
};

export default CheckoutPageMain;
