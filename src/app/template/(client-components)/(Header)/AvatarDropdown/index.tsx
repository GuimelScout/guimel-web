"use client";

import React from "react";
import { Popover } from "@headlessui/react";
import AvatarButton from "./components/AvatarButton";
import DropdownPanel from "./components/DropdownPanel";
import { useMenuConfig } from "./hooks/useMenuConfig";
import { AvatarDropdownProps } from "./types";

const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ 
  className = "", 
  user 
}) => {
  const { safeUser, menuItems } = useMenuConfig(user);

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <Popover className={`AvatarDropdown relative flex ${className}`}>
      {({ close }) => (
        <>
          <AvatarButton user={safeUser} />
          <DropdownPanel 
            user={safeUser} 
            menuItems={menuItems} 
            close={close} 
          />
        </>
      )}
    </Popover>
  );
};

export default AvatarDropdown;