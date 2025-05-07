"use client";

import React, { useEffect } from "react";
import { useUser } from "context/UserContext";
import { useQuery } from "@apollo/client";
import { BOOKINGS_QUERY } from "@/components/Guimel/account/QueryAccount.queries";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import BookingCard from "@/components/Guimel/account/BookinCard";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { RouteGuimel } from "@/routers/routes";
import { BookingsDataType, BookingType } from "@/components/Guimel/account/types";
import { useRouter } from "next/navigation";

const AccountSavelists = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Mis Reservas</h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
              <SkeletonLoader height="h-40" />
              <SkeletonLoader height="h-40" />
              <SkeletonLoader height="h-40" />
              <SkeletonLoader height="h-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
      if (!loading && !user) {
        router.push(RouteGuimel.login);
      }
    }, [user, loading]);

  const { data, loading: loadBookings } = useQuery<BookingsDataType>(BOOKINGS_QUERY, {
    variables: {
    where: { user: { id: { equals: user?.id ?? undefined } } }
    },
    fetchPolicy: "no-cache",
  });   

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold flex flex-row gap-4 items-center">
          <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 12.2H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 16.2H12.38"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>Mis Reservas</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {
          data && data.bookings && data.bookings.length > 0 ? (
            data.bookings.map((b:BookingType) => {
              return (
                <div key={b.id}>
                  <BookingCard data={b} />
                </div>
              )
            })
          ) : (
            <div className="gap-8" >
              <p>Aún no tienes reservas</p>
              <ButtonPrimary href={RouteGuimel.activity} className="mt-4" >Explora aquí</ButtonPrimary>
            </div>
          )
        }
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;