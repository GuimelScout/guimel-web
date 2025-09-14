"use client";

import React from "react";
import CheckOutPagePageMain from "./PageMainNew";
import {loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const page = ({
  searchParams,
}: {
  searchParams: {
    activity: string;
    guestsCount: string;
    startDate: string;
    endDate: string;
  };
}) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PULISHABLE_KEY ?? "");

  return <Elements stripe={stripePromise}>
    <CheckOutPagePageMain params={{
    activity: searchParams.activity,
    guestsCount: searchParams.guestsCount,
    startD: searchParams.startDate,
    endD: searchParams.endDate,
  }} />
  </Elements>;
};

export default page;
