import { useMemo } from "react";
import { AuthenticatedItem } from "@/data/types";
import { SafeUser, MenuItemConfig } from "../types";
import { MENU_ITEMS } from "../constants";

export const useSafeUser = (user?: AuthenticatedItem): SafeUser => {
  return useMemo(() => {
    const name = user?.name || "Usuario";
    const lastName = user?.lastName || "";
    
    return {
      name,
      lastName,
      fullName: `${name} ${lastName}`.trim(),
      verified: user?.verified || false,
      imageUrl: user?.image?.url,
      createdAt: user?.createdAt,
      joinedDate: user?.createdAt 
        ? new Date(user.createdAt).toLocaleDateString("es-ES", { 
            year: "numeric", 
            month: "long" 
          })
        : "Fecha desconocida",
      isHoster: user?.role?.some(role => role.name === "hoster") || false,
    };
  }, [user]);
};

export const useFilteredMenuItems = (safeUser: SafeUser): MenuItemConfig[] => {
  return useMemo(() => {
    return MENU_ITEMS.filter(item => {
      if (!item.condition) return true;
      return item.condition(safeUser);
    });
  }, [safeUser]);
};

export const useMenuConfig = (user?: AuthenticatedItem) => {
  const safeUser = useSafeUser(user);
  const menuItems = useFilteredMenuItems(safeUser);

  return {
    safeUser,
    menuItems,
  };
};