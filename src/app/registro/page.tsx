"use client"

import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { RouteGuimel } from "@/routers/routes";
import Select from "@/shared/Select";
import { useMutation } from "@apollo/client";
import { AUTHENTICATE_WITH_PASSWORD, USER_REGISTER } from "@/components/Guimel/login/QueryLogin.queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleGqlError } from "@/utils/error-handling";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { useUser } from "context/UserContext";

export interface PageSignUpProps {}

  const schema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    lastName: z.string().min(1, { message: "El apellido es requerido" }),
    countryCode: z.string().min(1, { message: "El código de país es requerido" }),
    phone: z.string().min(1, { message: "El teléfono es requerido" }),
    email: z.string().email("Ingresa un correo electrónico válido"),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  });

  const loginSocials = [
    {
      name: "Continue with Facebook",
      href: "#",
      icon: facebookSvg,
    },
    {
      name: "Continue with Twitter",
      href: "#",
      icon: twitterSvg,
    },
    {
      name: "Continue with Google",
      href: "#",
      icon: googleSvg,
    },
  ];



const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const router = useRouter();
  const { refreshUser } = useUser();

  const [registerUser, { loading }] = useMutation(
    USER_REGISTER,
  );

  const [authenticateWithPassword, { loading:loadignLogin }] = useMutation(
    AUTHENTICATE_WITH_PASSWORD,
  );

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      countryCode:"+52",
      phone:"",
      password: "",
      confirmPassword: "",
    },
  }); 

  const onSubmit = async (dataForm:any) => {
    const { name, lastName, email, password, confirmPassword, countryCode, phone } = dataForm;
    try {
      const response = await registerUser({
        variables: { 
          data: {
            name,
            lastName,
            email,
            password,
            countryCode,
            phone
          }},
        });
      
      if (response.data?.createUser) {
        const responseLogin = await authenticateWithPassword({
          variables: { email, password },
        });

       if (
          responseLogin.data?.authenticateUserWithPassword?.__typename ===
          "UserAuthenticationWithPasswordSuccess"
        ) {
          await refreshUser();
          setTimeout(() => {
            router.replace(RouteGuimel.activity);
          },0);
        } else {
          throw new Error("Autenticación fallida. Comprueba tus credenciales.");
        }

      } else {
        throw new Error("Hubo un error al registrarte, intenta de nuevo más tarde.");
      }
    } catch (error) {
      handleGqlError(error);
    }
  };
  
  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Registro
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)} >

            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <span className="text-neutral-800 dark:text-neutral-200">Nombre</span>
                <Input type="text" placeholder="Roberto" {...register("name")} className="mt-1 w-full" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <span className="text-neutral-800 dark:text-neutral-200">Apellido</span>
                <Input type="text" placeholder="Diaz" {...register("lastName")} className="mt-1 w-full" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                {...register("email")}
                placeholder="ejemplo@guimel.com"
                className="mt-1"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </label>
            <div className="space-y-1">
              <label>Teléfono*</label>
              <div className="flex flex-row gap-4">
              <Select 
                className="flex-[2]"
                defaultValue="+52"
                {...register("countryCode")}
                >
                  <option value="+52">🇲🇽 +52</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+57">🇨🇴 +57</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+44">🇬🇧 +44</option>
              </Select>

              <Input
                  placeholder="Tu número de teléfono"
                  {...register("phone")}
                  className="flex-[10]"
                />
              </div>
              {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode.message}</p>}
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
              </span>
              <Input type="password" placeholder="*********" {...register("password")} className="mt-1" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirmar Contraseña
              </span>
              <Input type="password" placeholder="*********" {...register("confirmPassword")} className="mt-1" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </label>
            <ButtonPrimary loading={loading} type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            ¿Ya tienes una cuenta? {` `}
            <Link href={RouteGuimel.login} className="font-semibold underline">
              Inicia Sesión
            </Link>
          </span>
        </div>
      </div>
      <Toaster position="top-center" closeButton richColors/>
    </div>
  );
};

export default PageSignUp;