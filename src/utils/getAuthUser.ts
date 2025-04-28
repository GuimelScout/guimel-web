// utils/getAuthUserClient.ts
import { createApolloClient } from "@/utils/apollo-client";
import { AUTHENTICATED_ITEM_QUERY } from "@/components/Guimel/login/withAuthentication.queries";

export async function getAuthenticatedUser(): Promise<any | null> {
  try {
    const client = createApolloClient();

    const { data } = await client.query({
      query: AUTHENTICATED_ITEM_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.authenticatedItem ?? null; 
  } catch (error) {

    return null;
  }
}