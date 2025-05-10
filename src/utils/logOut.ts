import { useApolloClient, useMutation } from "@apollo/client";
export async function logOut(): Promise<any | null> {
  const client = useApolloClient();

  // Reset the Apollo Client store
  await client.resetStore();
}

