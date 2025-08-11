import { AuthenticatedItem } from "@/data/types";
import { ReactNode } from "react";

export interface IconProps {
  className?: string;
  size?: number;
}

export interface MenuItemConfig {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
  roles?: string[];
  condition?: (user: SafeUser) => boolean;
}

export interface MenuSection {
  id: string;
  items: MenuItemConfig[];
  showDivider?: boolean;
}

export interface SafeUser {
  name: string;
  lastName: string;
  fullName: string;
  verified: boolean;
  imageUrl?: string;
  createdAt?: Date;
  joinedDate: string;
  isHoster: boolean;
}

export interface AvatarDropdownProps {
  className?: string;
  user?: AuthenticatedItem;
}

export interface MenuItemProps {
  item: MenuItemConfig;
  onClose: () => void;
}

export interface UserProfileProps {
  user: SafeUser;
}

export interface LogoutButtonProps {
  onClose: () => void;
}