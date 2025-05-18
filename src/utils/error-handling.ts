import { ApolloError } from '@apollo/client';
import { toast } from 'sonner'

/**
 * Handles errors from GraphQL mutations. If the error is an ApolloError, it
 * will show the error message. Otherwise, it will show a generic error message.
 *
 * @param error The error to handle
 * @returns void
 */
export function handleGqlError(error: unknown): void {
  //IMPORTANT: it's necessary to add <Toaster position="top-right" closeButton richColors/>

  let message = "Tuvimos un problema de comunicación, intente de nuevo más tarde.";
  if (error instanceof ApolloError) {
    const rawMessage = error.message;
    if (rawMessage.includes("Unique constraint failed") && rawMessage.includes("email")) {
      message = "Este correo ya está registrado.";
    } else {
      message = rawMessage;
    }

    toast.warning(message);
    return;
  }

  if (error instanceof Error && error.message) {
    toast.error(error.message);
    return;
  }

  toast.error(message);
}