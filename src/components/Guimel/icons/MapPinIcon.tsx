import React from "react";
import { IconProps } from "../../../app/template/(client-components)/(Header)/AvatarDropdown/types";

const MapPinIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 21C12 21 5 13.9375 5 9.5C5 6.18629 8.13401 3.5 12 3.5C15.866 3.5 19 6.18629 19 9.5C19 13.9375 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default React.memo(MapPinIcon);