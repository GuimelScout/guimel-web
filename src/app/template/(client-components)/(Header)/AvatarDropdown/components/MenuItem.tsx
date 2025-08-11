import React, { useCallback } from "react";
import Link from "next/link";
import { MenuItemProps } from "../types";
import { MENU_ITEM_CLASSES } from "../constants";

const MenuItem: React.FC<MenuItemProps> = ({ item, onClose }) => {
  const handleClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const IconComponent = item.icon;

  return (
    <Link
      href={item.href as any}
      className={MENU_ITEM_CLASSES.container}
      onClick={handleClick}
      aria-label={item.label}
    >
      <div className={MENU_ITEM_CLASSES.iconContainer}>
        <IconComponent className="text-current" size={24} />
      </div>
      <div className={MENU_ITEM_CLASSES.textContainer}>
        <p className={MENU_ITEM_CLASSES.text}>{item.label}</p>
      </div>
    </Link>
  );
};

export default React.memo(MenuItem);