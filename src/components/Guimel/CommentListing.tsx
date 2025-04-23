import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar";
import { Host } from "@/data/types";

interface ReviewType {
  user?: Host;
  createdAt: Date;
  review: string;
  rating: number;
}

export interface CommentListingProps {
  className?: string;
  data: ReviewType;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          hasChecked={data?.user?.verified}
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={data?.user?.name ?? 'Invitado'}
          imgUrl={data?.user?.image?.url ?? undefined}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data.user?.name ?? "Invitado"} {data.user?.lastName ?? ""}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString("en-US", { 
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "Fecha desconocida"}
            </span>
          </div>
          <div className="flex text-yellow-500">
          {[1, 2, 3, 4, 5].map((item) => (
            <StarIcon
              key={item}
              className={`w-4 h-4 ${item <= data.rating ? "text-yellow-500" : "text-gray-300"}`}
            />
          ))}
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data.review}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
