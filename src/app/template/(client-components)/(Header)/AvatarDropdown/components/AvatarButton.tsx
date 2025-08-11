import React from "react";
import { Popover } from "@headlessui/react";
import Avatar from "@/shared/Avatar";
import { SafeUser } from "../types";

interface AvatarButtonProps {
  user: SafeUser;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ user }) => {
  return (
    <Popover.Button
      className="self-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center"
      aria-label={`Menú de usuario de ${user.fullName}`}
    >
      <Avatar 
        hasChecked={user.verified} 
        sizeClass="h-10 w-10" 
        radius="rounded-full" 
        imgUrl={user.imageUrl} 
      />
    </Popover.Button>
  );
};

export default React.memo(AvatarButton);