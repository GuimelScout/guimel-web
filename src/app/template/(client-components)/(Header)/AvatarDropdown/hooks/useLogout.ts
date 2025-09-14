import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useUser } from "context/UserContext";
import { RouteGuimel } from "@/routers/routes";
import { LOG_OUT_MUTATION } from "@/components/Guimel/login/QueryLogin.queries";

export const useLogout = () => {
  const { setUser, refreshUser } = useUser();
  const router = useRouter();
  const [logout, { loading, error }] = useMutation(LOG_OUT_MUTATION);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setUser(undefined);
      refreshUser();
      router.push(RouteGuimel.home);
    } catch (err) {
      // Still clear user state even if logout mutation fails
      setUser(undefined);
      refreshUser();
      router.push(RouteGuimel.home);
    }
  }, [logout, setUser, refreshUser, router]);

  return {
    handleLogout,
    isLoggingOut: loading,
    logoutError: error,
  };
};