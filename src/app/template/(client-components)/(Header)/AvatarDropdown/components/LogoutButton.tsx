import React, { useCallback } from "react";
import { LogoutButtonProps } from "../types";
import { LogoutIcon } from "../icons";
import { MENU_ITEM_CLASSES } from "../constants";
import { useLogout } from "../hooks/useLogout";

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClose }) => {
  const { handleLogout, isLoggingOut } = useLogout();

  const handleClick = useCallback(async () => {
    onClose();
    await handleLogout();
  }, [onClose, handleLogout]);

  return (
    <button
      className={MENU_ITEM_CLASSES.container}
      onClick={handleClick}
      disabled={isLoggingOut}
      aria-label="Cerrar sesión"
      type="button"
    >
      <div className={MENU_ITEM_CLASSES.iconContainer}>
        <LogoutIcon className="text-current" size={24} />
      </div>
      <div className={MENU_ITEM_CLASSES.textContainer}>
        <p className={MENU_ITEM_CLASSES.text}>
          {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
        </p>
      </div>
    </button>
  );
};

export default React.memo(LogoutButton);