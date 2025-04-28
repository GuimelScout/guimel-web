// context/UserContext.tsx
"use client";

import { AuthenticatedItem } from "@/data/types";
import { getAuthenticatedUser } from "@/utils/getAuthUser";
import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  user: AuthenticatedItem | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>; // para poder forzar actualización manual
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  loading: true,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const userData = await getAuthenticatedUser();
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // cachearlo
      } else {
        setUser(undefined);
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(undefined);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const cachedUser = localStorage.getItem("user");
      if (cachedUser) {
        try {
          const parsedUser = JSON.parse(cachedUser);
          setUser(parsedUser);
          setLoading(false);
        } catch (e) {
          console.error("Error parsing cached user", e);
          await refreshUser();
        }
      } else {
        await refreshUser();
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);