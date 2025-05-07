"use client"

import React from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import Input from "@/shared/Input";
import { Toaster } from "sonner";
import { useUser } from "context/UserContext";
import SkeletonLoader from "@/shared/Guimel/SkeletonLoader";
import { withAuth } from "hooks/withAuth";

export interface AccountPageProps {
}

 function AccountPage ({}: AccountPageProps) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Información de tu cuenta</h2>
        <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <SkeletonLoader width="w-32" height="h-32" rounded="rounded-full" className="mx-auto" />
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div className="space-y-8">
            <SkeletonLoader height="h-10" />
            <SkeletonLoader height="h-10" />
            <SkeletonLoader height="h-10" />
            <SkeletonLoader height="h-10" />
            <SkeletonLoader height="h-10" />
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold flex flex-row gap-4 items-center">
      <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>Información de tu cuenta</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar sizeClass="w-32 h-32" imgUrl={user?.image?.url ?? undefined}/>
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">Cambiar</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          <div>
            <Label>Nombre</Label>
            <Input className="mt-1.5" defaultValue={user?.name} />
          </div>
          <div>
            <Label>Apellido Materno</Label>
            <Input className="mt-1.5" defaultValue={user?.lastName} />
          </div>
          <div>
            <Label>Apellido Paterno</Label>
            <Input className="mt-1.5" defaultValue={user?.secondLastName} />
          </div>
          <div>
            <Label>Email</Label>
            <Input className="mt-1.5" defaultValue={user?.email} />
          </div>
          {/* <div className="max-w-lg">
            <Label>Date of birth</Label>
            <Input className="mt-1.5" type="date" defaultValue="1990-07-22" />
          </div> */}
          {/* <div>
            <Label>Addess</Label>
            <Input className="mt-1.5" defaultValue="New york, USA" />
          </div> */}
          <div>
            <Label>Teléfono</Label>
            <Input className="mt-1.5" defaultValue={user?.phone} />
          </div>
          {/* ---- */}
          {/* <div>
            <Label>About you</Label>
            <Textarea className="mt-1.5" defaultValue="..." />
          </div> */}
          {/* <div className="pt-2">
            <ButtonPrimary>Actualizar Información</ButtonPrimary>
          </div> */}
        </div>
      </div>
      <Toaster position="top-right" closeButton richColors/>
    </div>
  );
};


export default withAuth(AccountPage);