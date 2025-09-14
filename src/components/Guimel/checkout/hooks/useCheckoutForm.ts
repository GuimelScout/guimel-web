import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckoutFormData } from "../types";

const checkoutSchema = z.object({
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

export const useCheckoutForm = (user?: any) => {
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nameCard: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      countryCode: "+52",
      phone: user?.phone ?? "",
      notes: "",
    },
  });

  return form;
};
