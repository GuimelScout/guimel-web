import React, { Dispatch, SetStateAction } from "react";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Select from "@/shared/Select";
import { CardElement } from "@stripe/react-stripe-js";
import { useThemeMode } from "@/utils/useThemeMode";
import { CheckoutFormData, PaymentBreakdowns } from "../types";
import PaymentTypeSelector from "./PaymentTypeSelector";
import StayDatesRangeInput from "../../../Guimel/activity/StayDatesRangeInput";
import GuestsInput from "../../../Guimel/activity/GuestsInput";

interface PaymentFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: any;
  register: any;
  loadingPayment: boolean;
  total: string;
  paymentType: 'full_payment' | 'commission_only';
  onPaymentTypeChange: (type: 'full_payment' | 'commission_only') => void;
  breakdown: PaymentBreakdowns;
  // Props for date and guest controls (matching existing components)
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  guestAdultsInputValue: number;
  setGuestAdultsInputValue: Dispatch<SetStateAction<number>>;
  guestChildrenInputValue: number;
  setGuestChildrenInputValue: Dispatch<SetStateAction<number>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  errors,
  register,
  loadingPayment,
  total,
  paymentType,
  onPaymentTypeChange,
  breakdown,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  guestAdultsInputValue,
  setGuestAdultsInputValue,
  guestChildrenInputValue,
  setGuestChildrenInputValue,
}) => {
  const { isDarkMode } = useThemeMode();

  return (
    <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
      <h2 className="text-3xl lg:text-4xl font-semibold">
        Confirmar tu reservación
      </h2>

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Detalles de tu reservación</h3>
        
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
          <StayDatesRangeInput 
            className="flex-1 z-[11]" 
            startDate={startDate} 
            setStartDate={setStartDate} 
            endDate={endDate} 
            setEndDate={setEndDate}
          />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput 
            className="flex-1" 
            guestAdultsInputValue={guestAdultsInputValue} 
            setGuestAdultsInputValue={setGuestAdultsInputValue} 
            guestChildrenInputValue={guestChildrenInputValue} 
            setGuestChildrenInputValue={setGuestChildrenInputValue} 
          />
        </form>
      </div>
      
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      
      <PaymentTypeSelector
        paymentType={paymentType}
        onPaymentTypeChange={onPaymentTypeChange}
        breakdown={breakdown}
      />
      
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      
      <form onSubmit={onSubmit}>
        <div className="mt-6">
          <Tab.Group>
            <Tab.List className="flex my-5 gap-1">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    type="button"
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center justify-center focus:outline-none ${
                      selected
                        ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                        : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    <span className="mr-2.5">Tarjeta de crédito</span>
                    <Image className="w-8" src={visaPng} alt="visa" />
                    <Image className="w-8" src={mastercardPng} alt="mastercard" />
                  </button>
                )}
              </Tab>
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel className="space-y-5">
                <div className="space-y-1">
                  <Label>Nombre en la tarjeta*</Label>
                  <div className="flex flex-row gap-4">
                    <Input
                      {...register("nameCard")}
                      placeholder="Tu nombre"
                    />
                    <Input
                      {...register("lastName")}
                      placeholder="Tu apellido"
                    />
                  </div>
                  {errors.nameCard && (
                    <p className="text-red-500 text-sm">{errors.nameCard.message}</p>
                  )}
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Correo Electrónico*</Label>
                  <Input
                    {...register("email")}
                    placeholder="ejemplo@guimel.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Teléfono*</Label>
                  <div className="flex flex-row gap-4">
                    <Select
                      className="flex-[2]"
                      {...register("countryCode")}
                      defaultValue="+52"
                    >
                      <option value="+52">🇲🇽 +52</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+57">🇨🇴 +57</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+44">🇬🇧 +44</option>
                    </Select>
                    <Input
                      {...register("phone")}
                      placeholder="Tu número de teléfono"
                      className="flex-[10]"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}
                  {errors.countryCode && (
                    <p className="text-red-500 text-sm">{errors.countryCode.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label>Datos de la tarjeta</Label>
                  <div className="block w-full border border-neutral-200 focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50 bg-white dark:border-neutral-700 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "14px",
                            color: isDarkMode ? "#ffffff" : "#1f2937",
                            fontFamily: "inherit",
                            "::placeholder": {
                              color: isDarkMode ? "#9ca3af" : "#9ca3af",
                            },
                          },
                          invalid: {
                            color: "#dc2626",
                          },
                        },
                        disableLink: false,
                        hidePostalCode: true,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Notas</Label>
                  <Textarea
                    {...register("notes")}
                    placeholder="Escribe aquí"
                  />
                  <span className="text-sm text-neutral-500 block">
                    Escribe algunas notas sobre tu pago (opcional).
                  </span>
                  {errors.notes && (
                    <p className="text-red-500 text-sm">{errors.notes.message}</p>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          
          <div className="pt-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {paymentType === 'full_payment' ? 'Total a pagar' : 'Pago ahora'}
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ${breakdown[paymentType].payNow.toFixed(2)} MXN
                </p>
                {paymentType === 'commission_only' && breakdown.commission_only.payAtProperty > 0 && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    + ${breakdown.commission_only.payAtProperty.toFixed(2)} MXN al llegar
                  </p>
                )}
              </div>
              <ButtonPrimary type="submit" loading={loadingPayment} className="w-full">
                {paymentType === 'full_payment' 
                  ? `Confirmar y pagar $${breakdown[paymentType].payNow.toFixed(2)} MXN`
                  : `Pagar tarifa de confirmación $${breakdown[paymentType].payNow.toFixed(2)} MXN`
                }
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
