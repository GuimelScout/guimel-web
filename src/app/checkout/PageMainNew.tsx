"use client";

import React, { FC } from "react";
import CheckoutPageMain from "@/components/Guimel/checkout/CheckoutPageMain";

export interface CheckOutPagePageMainProps {
  className?: string;
  params: { activity: string, guestsCount: string, startD: string, endD: string }
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = (props) => {
  return <CheckoutPageMain {...props} />;
};

export default CheckOutPagePageMain;
