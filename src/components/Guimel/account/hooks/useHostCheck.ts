import { useUser } from "context/UserContext";
import { useQuery } from "@apollo/client";
import { AUTHENTICATED_ITEM_QUERY } from "@/components/Guimel/login/withAuthentication.queries";

export const useHostCheck = () => {
  const { user: contextUser, loading: contextLoading } = useUser();
  
  const { data: authData, loading: authLoading } = useQuery(AUTHENTICATED_ITEM_QUERY, {
    skip: !contextUser?.id,
    fetchPolicy: "cache-and-network"
  });

  const user = authData?.authenticatedItem || contextUser;
  const loading = contextLoading || authLoading;

  const isHost = user?.role?.some((role: any) => role.name === 'hoster') || false;
  const isAdmin = user?.role?.some((role: any) => role.name === 'admin') || false;
  const hasHostAccess = isHost || isAdmin;

  return {
    user,
    loading,
    isHost,
    isAdmin,
    hasHostAccess
  };
};
