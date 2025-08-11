import React from "react";
import Avatar from "@/shared/Avatar";
import { UserProfileProps } from "../types";

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar 
        hasChecked={user.verified} 
        sizeClass="h-10 w-10" 
        radius="rounded-full" 
        imgUrl={user.imageUrl} 
      />
      <div className="flex-grow">
        <h4 className="font-semibold">{user.fullName}</h4>
        <p className="text-xs mt-0.5">
          Te uniste en {user.joinedDate}
        </p>
      </div>
    </div>
  );
};

export default React.memo(UserProfile);