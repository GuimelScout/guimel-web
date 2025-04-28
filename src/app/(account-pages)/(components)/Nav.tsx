"use client";

import { Route } from "@/routers/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export const Nav = () => {
  const pathname = usePathname();

  const listNav: any[] = [
    Route.account,
    Route.bookings,
    Route.payments,
  ] 

  return (
    <div className="container">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
       {listNav.map((item,i) => {
          const isActive = pathname === item;
          return (
            <Link
              key={i}
              href={item}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
                isActive
                  ? "border-primary-500 font-medium"
                  : "border-transparent"
              }`}
            >
              {item.toString().replace("-", " ").replace("/", " ")}
            </Link>
          );
        })} 
      </div>
    </div>
  );
};
