"use client";

import StartRating from "@/components/StartRating";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { ActivityDataType, BookingDataType, CARD_TYPE } from "@/data/types";
import { ACTIVITY_QUERY, BOOKING_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import dateFormat, { formatDateSpanish, parseLocalDateString } from "@/utils/date-format-helper";

export interface PayPageProps {
  searchParams: { [key: string]: string | undefined };
}

const PayPage: FC<PayPageProps> = ({ searchParams }) => {

  console.log("searchParams");
  console.log(searchParams);
  const renderContent = () => {
    console.log("searchParam activity");
    console.log(searchParams.activity);

      const { data } = useQuery<BookingDataType>(BOOKING_QUERY, {
        variables: { where: { id: searchParams.booking} },
      });

      console.log("data");
      console.log(data);

    return (
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          ¡Felicidades! 🎉
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Tu experiencia esta lista</h3>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt={data?.booking?.activity?.name || searchParams.activity || "-"}
                  src={data?.booking?.activity.image.url!}
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {data?.booking.activity.address}
                </span>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {data?.booking.activity.name}
                </span>
              </div>
              {/* <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                2 beds · 2 baths
              </span> */}
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StartRating point={data?.booking.activity.reviewStar} reviewCount={data?.booking.activity.reviewCount} />
            </div>
          </div>

         

          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Fecha</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {formatDateSpanish(parseLocalDateString(data?.booking?.start_date), true)} - {formatDateSpanish(parseLocalDateString(data?.booking?.end_date))}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Personas</span>
                <span className="mt-1.5 text-lg font-semibold">{data?.booking.guestss} Huéspedes</span>
              </div>
            </div>
          </div>
        </div>

        {
            (data?.booking.lodging) ? 
            <>
              <h4 className="text-2xl font-semibold">¡Incluiste el siguiente hospedaje!</h4>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                    <Image
                      fill
                      className="object-cover"
                      alt={data?.booking?.lodging?.name || searchParams.lodging || "-"}
                      src={data?.booking?.lodging.logo.url!}
                    />
                  </div>
                </div>
                <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {data?.booking.lodging.address}
                    </span>
                    <span className="text-base sm:text-lg font-medium mt-1 block">
                      {data?.booking.lodging.name}
                    </span>
                  </div>
                  {/* <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                    2 beds · 2 baths
                  </span> */}
                  <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                  <StartRating point={data?.booking.lodging.reviewStar} reviewCount={data?.booking.lodging.reviewCount} />
                </div>
              </div>             
            </>  
            : 
            <></>
          }

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Detalles de la reserva</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Código</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {data?.booking.code}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Fecha de creación</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
              {formatDateSpanish(parseLocalDateString(data?.booking?.createdAt.toString().split("T")[0]))}
              </span>
            </div>
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Total</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                ${parseFloat(data?.booking.payment.amount!).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Método de pago</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {CARD_TYPE[data?.booking.payment.paymentMethod.cardType as keyof typeof CARD_TYPE] || "Tipo de tarjeta desconocido"}
              </span>
            </div>
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Tus notas</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {data?.booking.payment.notes}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/">Explore more stays</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PayPage;
