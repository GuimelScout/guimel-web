"use client";

import { Tab } from "@headlessui/react";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "@/images/vis.png";
import mastercardPng from "@/images/mastercard.svg";
import Input from "@/shared/Input";
import Label from "@/components/Label";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import StartRating from "@/components/StartRating";
import NcModal from "@/shared/NcModal";
import Image from "next/image";
import StayDatesRangeInput from "../../components/Guimel/activity/StayDatesRangeInput";
import GuestsInput from "../../components/Guimel/activity/GuestsInput";
import dateFormat, { parseLocalDateString } from "@/utils/date-format-helper";
import { FetchResult, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ActivityDataType, LodgingType } from "@/data/types";
import { ACTIVITY_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import Heading from "@/shared/Heading";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CREATE_PAYMENT_METHOD, CREATE_USER, GET_PAYMENT_METHOD, GET_STRIPE_PAYMENT_METHODS, GET_USER, MAKE_PAYMENT } from "@/components/Guimel/checkout/QueryCheckOut.queries";
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation";
import Select from "@/shared/Select";
import { useUser } from "context/UserContext";
import { RouteGuimel } from "@/routers/routes";

export interface CheckOutPagePageMainProps {
  className?: string;
  params: { activity: string, guestss: string, startD: string, endD: string }
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
  params
}) => {
  const client = useApolloClient();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user, loading } = useUser();

  const { startD, endD, guestss, activity } = params;

  const [startDate, setStartDate] = useState<Date | null>(parseLocalDateString(startD));
  const [endDate, setEndDate] = useState<Date | null>(parseLocalDateString(endD));
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(Number(guestss));
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);

  const { data } = useQuery<ActivityDataType>(ACTIVITY_QUERY, {
    variables: { where: { link: activity} },
  });

  const [isLodging, setIsLodging] = useState<boolean>(false);
  const [loadingPayment, setLoadingPayment] = useState<boolean>(false);
  const [lodginSelected, setLodginSelected] = useState<LodgingType | null>();


  function getTotal(): string {
    return ((parseFloat(data?.activity.price || "0.00") * guestAdultsInputValue) + parseFloat(lodginSelected?.price || "0.00") * guestAdultsInputValue).toFixed(2);
  }

  const [makePayment, { loading: loadingMakePayment }] = useMutation(
    MAKE_PAYMENT
  );

  const [createUser] = useMutation(
    CREATE_USER
  );

  const [createPaymentMethod] = useMutation(
    CREATE_PAYMENT_METHOD
  );


  const schema = z.object({
    nameCard: z
      .string()
      .min(1, { message: "El nombre en la tarjeta es requerido" }),
    
    lastName: z
      .string()
      .min(1, { message: "El apellido es requerido" }),

    email: z
      .string({ message: "El correo es requerido" })
      
      .email({ message: "El correo es inválido" }),

    countryCode: z
      .string()
      .min(1, { message: "El código del país es requerido." }),

      phone: z
      .string()
      .min(1, { message: "El número de teléfono es requerido." })
      .refine((val) => !val || /^\d{10}$/.test(val), {
        message: "El teléfono debe tener exactamente 10 dígitos numéricos",
      }),

    notes: z.string().optional(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nameCard: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      countryCode: "+52",
      phone: user?.phone ?? "",
      notes: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nameCard: user.name ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        countryCode: "+52",
        phone: user.phone ?? "",
        notes: "",
      });
    }
  }, [user, reset]);


  const onSubmit = async (dataForm:any) => {

    let response: FetchResult<any>;
    let resUser: FetchResult<any>;
    let res: FetchResult<any>;
    let userID: string;
    let userName: string;
    let stripeCustomerId: string | null;

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    setLoadingPayment(true);
    userName = `${dataForm.nameCard} ${dataForm.lastName}`;
   
    const { data: getUser } = await client.query({
      query: GET_USER,
      variables: {
        where: {
          email: dataForm.email,
        },
      },
      fetchPolicy: 'network-only',
    });

      if(getUser.user){
        userID = getUser.user.id;
        stripeCustomerId = getUser.user.stripeCustomerId;
      }else{
        resUser = await createUser({
          variables:{
            data: {
              name: dataForm.nameCard,
              lastName: dataForm.lastName,
              phone: dataForm.phone,
              email: dataForm.email,
              password: `${dataForm.nameCard}12345`,
              countryCode: dataForm.countryCode
            }
          }
        });
        userID = resUser.data.createUser.id;
        stripeCustomerId = resUser.data.createUser.stripeCustomerId;
      }


      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: {
          name: userName,
          email: dataForm.email,
          phone: dataForm.phone,
        },
      });

      
      if (!error){

        const { data: getStripePaymentMethods } = await client.query({
          query: GET_STRIPE_PAYMENT_METHODS,
          variables: {
              email: dataForm.email,
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

        if(!stripePaymentMethodDuplicate){

          res = await createPaymentMethod({
            variables:{
              data: {
                user: { connect: { id: userID} },
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

          paymentMethodID = res.data.createPaymentMethod.id
          noDuplicatePaymentMethod = true;

        }else{

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

        const newPayment = {
          activityId:  data?.activity.id,
          lodgingId: lodginSelected?.id ?? undefined,
          startDate: dateFormat(startDate),
          endDate: dateFormat(endDate),
          guestss: (guestAdultsInputValue + guestChildrenInputValue).toString(),
          nameCard: userName,
          email: dataForm.email,
          notes: dataForm.notes,
          paymentMethodId: paymentMethodID,
          total: getTotal(),
          noDuplicatePaymentMethod
        };
        
        try {
          response = await makePayment({
            variables: { 
              ...newPayment
            },
          }); 
        
          if (response.data && response.data.makePayment.success) {
            setLoadingPayment(false);
            toast.success(response.data.makePayment.message);
            //@ts-ignore
            router.push(`${RouteGuimel.payDone}?booking=${response.data.makePayment.data.booking}`);
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
      }
      
  }; 

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">Tu experiencia</h3>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                fill
                sizes="200px"
                alt={data?.activity?.name || activity}
                src={data?.activity.image.url!}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {data?.activity.address}
              </span>
              <span className="text-base font-medium mt-1 block">
                {data?.activity.name}
              </span>
            </div>
           
            {/* <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span> */}
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating point={data?.activity.reviewStar} reviewCount={data?.activity.reviewCount} />
          </div>
        </div>
        { data?.activity.lodgingCount! > 0 ?
        
            <button
            className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
              isLodging
                ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
            onClick={() => {setLodginSelected(null); setIsLodging(!isLodging)} }
          >
            <span className="mr-2.5">¿Te gustaría incluir hospedaje?</span>
          </button> : <></>
        }
       {
        isLodging ?
          <div className={`grid grid-cols-2 gap-1`}>
            {data?.activity.lodging!.map((lod, i) => (
              <button
              className={`px-4 py-1.5 sm:px-2 sm:py-2 rounded-full flex items-center justify-start focus:outline-none gap-1   ${
                lodginSelected === lod
                ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
              onClick={() => {
                (lodginSelected === null || lodginSelected != lod) ? setLodginSelected(lod) : setLodginSelected(null);
              }}
              >
              <Image
                className="w-8 rounded-full"
                src={lod.logo.url}
                width={60}
                height={60}
                alt={lod.name}
                style={{minHeight:30,minWidth:30, maxHeight:30, maxWidth:30}}
                />
              <span className="mr-2.5">{lod.name}</span>
            </button>
            ))}
          </div>
         : <></>
       }

        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Detalles del precio</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>${parseFloat(data?.activity.price || "0.00").toFixed(2)} x {guestAdultsInputValue} personas</span>
            <span>${(parseFloat(data?.activity.price || "0.00") * guestAdultsInputValue).toFixed(2)}</span>
          </div>
         { isLodging && lodginSelected ?  
          <>
            <div className="flex flex-row items-center justify-start gap-2">
                <Heading level={5} className="font-bold" desc="Hospedaje"> </Heading>
                <Link
                  //@ts-ignore
                  href={`hospedaje/${lodginSelected.link}`}
                  target="_blank"
                  className="text-xs"
                >
                  Ver
                </Link>
            </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>${parseFloat(lodginSelected?.price || "0.00").toFixed(2)} x {guestAdultsInputValue} personas</span>
                <span>${(parseFloat(lodginSelected?.price || "0.00") * guestAdultsInputValue).toFixed(2)}</span>
              </div>
          </>
           : <></>
          }

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${getTotal()}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
  
 
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirmar tu reservación
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Fecha y huéspedes</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl mt-4">
            <StayDatesRangeInput className="flex-1 z-[11]" startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
            <GuestsInput className="flex-1" guestAdultsInputValue={guestAdultsInputValue} setGuestAdultsInputValue={setGuestAdultsInputValue} guestChildrenInputValue={guestChildrenInputValue} setGuestChildrenInputValue={setGuestChildrenInputValue} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pago</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-6">
                <Tab.Group>
                  <Tab.List className="flex my-5 gap-1">
                    {/* <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                            selected
                              ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                              : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          Paypal
                        </button>
                      )}
                    </Tab> */}
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                        type="button"
                          className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                            selected
                              ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                              : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          }`}
                        >
                          <span className="mr-2.5">Tarjeta de crédito</span>
                          <Image className="w-8" src={visaPng} alt="visa" />
                          <Image
                            className="w-8"
                            src={mastercardPng}
                            alt="mastercard"
                          />
                        </button>
                      )}
                    </Tab>
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel className="space-y-5">
                      
                      <div className="space-y-1">
                        <Label>Nombre en la tarjeta* </Label>
                        <div className="flex flex-row gap-4">
                          <Input 
                          {...register("nameCard")}
                          placeholder="Tu nombre" />
                          <Input 
                          {...register("lastName")}
                          placeholder="Tu apellido" />
                        </div>
                        {errors.nameCard && <p className="text-red-500 text-sm">{errors.nameCard.message}</p>}
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label>Correo Electrónico* </Label>
                        <Input 
                        {...register("email")}
                        placeholder="ejemplo@guimel.com" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                      <Label>Datos de la tarjeta </Label>
                        <div className="block w-full border border-neutral-200 focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50 bg-white dark:border-neutral-700 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3">
                        <CardElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "14px",
                                  color: "#1f2937",
                                  fontFamily: "inherit",
                                  "::placeholder": {
                                    color: "#9ca3af",
                                  },
                                },
                                invalid: {
                                  color: "#dc2626",
                                },
                              },
                              disableLink:false,
                              hidePostalCode: true,
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label>Notas </Label>
                        <Textarea 
                        {...register("notes")}
                        placeholder="Escribe aquí" />
                        <span className="text-sm text-neutral-500 block">
                          Escribe algunas notas sobre tu pago (opcional).
                        </span>
                        {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
                      </div>
                      
                    </Tab.Panel>
                    {/* <Tab.Panel className="space-y-5">
                      <div className="space-y-1">
                        <Label>Email </Label>
                        <Input type="email" defaultValue="example@gmail.com" />
                      </div>
                      <div className="space-y-1">
                        <Label>Password </Label>
                        <Input type="password" defaultValue="***" />
                      </div>
                      <div className="space-y-1">
                        <Label>Messager for author </Label>
                        <Textarea placeholder="..." />
                        <span className="text-sm text-neutral-500 block">
                          Write a few sentences about yourself.
                        </span>
                      </div>
                    </Tab.Panel> */}
                  </Tab.Panels>
                </Tab.Group>
                <div className="pt-8">
                  <ButtonPrimary type="submit" loading={loadingPayment} >Confirmar y pagar</ButtonPrimary>
                </div>
              </div>
            </form>
            <Toaster position="top-right" closeButton richColors/>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
