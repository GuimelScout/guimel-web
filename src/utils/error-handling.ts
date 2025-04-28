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
  //IMPORTANT its necesary to add TOAST tag in front
  //<Toaster position="top-right" closeButton richColors/>
  if (error instanceof ApolloError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof Error && error.message) {
    toast.error(error.message);
    return;
  }

  toast.error("Tuvimos un problema de comunicación, intente de nuevo más tarde.");
}
