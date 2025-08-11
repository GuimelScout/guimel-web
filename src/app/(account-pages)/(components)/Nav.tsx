"use client";

import { RouteGuimel } from "@/routers/routes";
import { useUser } from "context/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
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
    { path: RouteGuimel.account, key: "account" },
    { path: RouteGuimel.bookings, key: "bookings" },
    { path: RouteGuimel.payments, key: "payments" },
  ],
  HOSTER: [
    { path: RouteGuimel.account, key: "account" },
    { path: RouteGuimel.client_bookings, key: "client_bookings" },
    { path: RouteGuimel.my_activities, key: "my_activities" },
    { path: RouteGuimel.my_lodgings, key: "my_lodgings" },
  ],
} as const;

// Utility functions
const formatNavLabel = (path: string): string => {
  return path
    .replace(/^\//, "") // Remove leading slash
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // C apitalize first letter of each word
};

const isUserHoster = (user: AuthenticatedItem | undefined): boolean => {
  return user?.role?.some((role) => role.name === USER_ROLES.HOSTER) ?? false;
};

const getNavigationItems = (user: AuthenticatedItem | undefined): NavItem[] => {
  const rawItems = isUserHoster(user) ? NAV_ITEMS.HOSTER : NAV_ITEMS.DEFAULT;
  
  return rawItems.map((item) => ({
    path: item.path,
    label: formatNavLabel(item.path),
    key: item.key,
  }));
};

// Loading skeleton component
const NavSkeleton: React.FC = () => (
  <div className="container">
    <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="block py-5 md:py-8 border-b-2 flex-shrink-0 border-transparent"
        >
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

// Main Nav component
export const Nav: React.FC = () => {
  const pathname = usePathname();
  const { user, loading } = useUser();

  // Memoize navigation items to prevent unnecessary recalculations
  const navigationItems = useMemo(() => {
    if (loading) return [];
    return getNavigationItems(user);
  }, [user, loading]);

  // Handle loading state
  if (loading) {
    return <NavSkeleton />;
  }

  // Handle error state - if no navigation items available
  if (navigationItems.length === 0) {
    return (
      <div className="container">
        <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
          <div className="py-5 md:py-8 text-gray-500">
            No navigation items available
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="container" role="navigation" aria-label="Account navigation">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.key}
              href={item.path as any}
              className={`
                block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize
                transition-colors duration-200 ease-in-out focus:ring-primary-500 focus:ring-offset-2
                ${
                  isActive
                    ? "border-primary-500 font-medium text-primary-600"
                    : "border-transparent hover:border-gray-300"
                }
              `}
              aria-current={isActive ? "page" : undefined}
              title={`Navigate to ${item.label}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// Export types for external use
export type { NavItem };
