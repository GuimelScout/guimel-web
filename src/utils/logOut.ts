import { useApolloClient, useMutation } from "@apollo/client";
import { destroyCookie } from 'nookies';
export async function logOut(): Promise<any | null> {
  const client = useApolloClient();

  destroyCookie(null, 'keystonejs-session');

  // Reset the Apollo Client store
  await client.resetStore();
}

