"use client";

import React, { FC } from "react";
import CheckoutPageMain from "@/components/Guimel/checkout/CheckoutPageMain";

export interface CheckOutPagePageMainProps {
  className?: string;
  params: { activity: string | null, lodging: string | null, guestsCount: string, startD: string }
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = (props) => {
  return <CheckoutPageMain {...props} />;
};

export default CheckOutPagePageMain;
