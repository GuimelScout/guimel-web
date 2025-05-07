"use client";

import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_WITH_PASSWORD } from "@/components/Guimel/login/QueryLogin.queries";
import { Toaster } from "sonner";
import { handleGqlError } from "@/utils/error-handling";
import { useRouter } from "next/navigation";
import { useUser } from "context/UserContext";
import { RouteGuimel } from "@/routers/routes";

export interface PageLoginProps {}

const schema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});


const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();
  const { refreshUser, user } = useUser();

  const [authenticateWithPassword, { loading }] = useMutation(
    AUTHENTICATE_WITH_PASSWORD,
  );
  

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  }); 

  const onSubmit = async (dataForm:any) => {
    const { email, password } = dataForm;
    const response = await authenticateWithPassword({
      variables: { email, password },
    });

    try {
      if (
        response.data?.authenticateUserWithPassword?.__typename ===
        "UserAuthenticationWithPasswordSuccess"
      ) {
        refreshUser();
        router.push(RouteGuimel.account);
      } else {
        throw new Error("Autenticación fallida. Comprueba tus credenciales.");
      }
    } catch (error) {
      handleGqlError(error);
    }
  };

  if(user){
    router.push(RouteGuimel.account);
  }


  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Iniciar sesión
        </h2>
        <div className="max-w-md mx-auto space-y-6">
       
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="example@guimel.com"
                {...register("email")}
                className="mt-1"
              />
            </label>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
                {/* @ts-ignore */}
               <Link href={RouteGuimel.login} className="text-sm underline font-medium">
                  ¿Olvidaste la contraseña?
                </Link> 
              </span>
              <Input type="password"
                {...register("password")}
                className="mt-1" />
            </label>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <ButtonPrimary type="submit" loading={loading}>Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
           ¿Eres nuevo? {` `}
            {/* @ts-ignore */}
            <Link href={RouteGuimel.signup}className="font-semibold underline">
              Registrate aquí
            </Link> 
          </span>
        </div>
      </div>
      <Toaster position="top-right" closeButton richColors/>
    </div>
  );
};

export default PageLogin;
