import React, { useCallback } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import UserProfile from "./UserProfile";
import MenuItem from "./MenuItem";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./LogoutButton";
import { SafeUser, MenuItemConfig } from "../types";
import { PANEL_CLASSES, DIVIDER_CLASSES } from "../constants";

interface DropdownPanelProps {
  user: SafeUser;
  menuItems: MenuItemConfig[];
  close: () => void;
}

const DropdownPanel: React.FC<DropdownPanelProps> = ({ 
  user, 
  menuItems, 
  close 
}) => {
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className={PANEL_CLASSES.container}>
        <div className={PANEL_CLASSES.inner}>
          <div className={PANEL_CLASSES.content}>
            {/* User Profile Section */}
            <UserProfile user={user} />

            {/* Divider */}
            <div className={DIVIDER_CLASSES} />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onClose={handleClose} 
              />
            ))}

            {/* Divider */}
            <div className={DIVIDER_CLASSES} />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Logout Button */}
            <LogoutButton onClose={handleClose} />
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default React.memo(DropdownPanel);