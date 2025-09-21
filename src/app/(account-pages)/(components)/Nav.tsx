"use client";

import { RouteGuimel } from "@/routers/routes";
import { useUser } from "context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useCallback } from "react";
import { AuthenticatedItem } from "@/data/types";

// Types and interfaces for better type safety
interface NavItem {
  path: string;
  label: string;
  key: string;
}

// Constants for better maintainability
const USER_ROLES = {
  HOSTER: "hoster",
} as const;

const NAV_ITEMS = {
  DEFAULT: [
    { path: RouteGuimel.account, key: "account", label: "Cuenta" },
    { path: RouteGuimel.bookings, key: "bookings", label: "Mis Reservas" },
    { path: RouteGuimel.payments, key: "payments", label: "Pagos" },
  ],
  HOSTER: [
    { path: RouteGuimel.account, key: "account", label: "Cuenta" },
    { path: RouteGuimel.client_bookings, key: "client_bookings", label: "Reservas de Clientes" },
    { path: RouteGuimel.my_activities, key: "my_activities", label: "Mis Actividades" },
    { path: RouteGuimel.my_lodgings, key: "my_lodgings", label: "Mis Hospedajes" },
  ],
} as const;

// Utility functions
const isUserHoster = (user: AuthenticatedItem | undefined): boolean => {
  return user?.role?.some((role) => role.name === USER_ROLES.HOSTER) ?? false;
};

const getNavigationItems = (user: AuthenticatedItem | undefined): NavItem[] => {
  return isUserHoster(user) ? [...NAV_ITEMS.HOSTER] : [...NAV_ITEMS.DEFAULT];
};

// Loading skeleton component
const NavSkeleton: React.FC = () => (
  <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
    <div className="container">
      <div className="flex overflow-x-auto scrollbar-hide">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="block py-5 px-6 flex-shrink-0"
          >
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Individual nav item component for better performance
const NavItem: React.FC<{ item: NavItem; isActive: boolean }> = React.memo(({ item, isActive }) => {
  return (
    <Link
      href={item.path as any}
      className={`
        relative block py-5 px-6 flex-shrink-0 text-sm font-medium
        transition-all duration-200 ease-in-out focus:outline-none group
        ${
          isActive
            ? "text-blue-600 dark:text-blue-400 font-semibold bg-white dark:bg-gray-800 shadow-[0_-2px_0_0_theme(colors.teal.400)]"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
      aria-current={isActive ? "page" : undefined}
      title={`Navigate to ${item.label}`}
    >
      <span className="relative z-10">
        {item.label}
      </span>
    </Link>
  );
});

NavItem.displayName = 'NavItem';

// Main Nav component
export const Nav: React.FC = () => {
  const pathname = usePathname();
  const { user, loading } = useUser();

  // Memoize navigation items to prevent unnecessary recalculations
  const navigationItems = useMemo(() => {
    if (loading) return [];
    return getNavigationItems(user);
  }, [user, loading]);

  // Memoize the render function to prevent unnecessary re-renders
  const renderNavItems = useCallback(() => {
    return navigationItems.map((item) => {
      const isActive = pathname === item.path;
      return (
        <NavItem
          key={item.key}
          item={item}
          isActive={isActive}
        />
      );
    });
  }, [navigationItems, pathname]);

  // Handle loading state
  if (loading) {
    return <NavSkeleton />;
  }

  // Handle error state - if no navigation items available
  if (navigationItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="py-5 px-6 text-gray-500 dark:text-gray-400">
              No navigation items available
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav 
      className="border-b border-gray-200 dark:border-gray-700"
      role="navigation" 
      aria-label="Account navigation"
    >
      <div className="container">
        <div className="flex overflow-x-auto scrollbar-hide">
          {renderNavItems()}
        </div>
      </div>
    </nav>
  );
};

// Export types for external use
export type { NavItem };
