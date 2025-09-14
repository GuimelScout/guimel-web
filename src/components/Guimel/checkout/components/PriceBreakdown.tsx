import React from "react";
import { ActivityType, LodgingType } from "@/data/types";
import Heading from "@/shared/Heading";
import Link from "next/link";
import ExternalLinkIcon from "@/components/Guimel/icons/ExternalLinkIcon";
import { RouteGuimel } from "@/routers/routes";

interface PriceBreakdownProps {
  activities: ActivityType[];
  selectedLodging: LodgingType | null;
  isLodging: boolean;
  guestCount: number;
  total: string;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  activities,
  selectedLodging,
  isLodging,
  guestCount,
  total,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold">Detalles del precio</h3>
      
      {activities.map((activity) => (
        <div key={activity.id} className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <div className="flex flex-col">
            <span>
              ${parseFloat(activity.price || "0.00").toFixed(2)} x {guestCount} personas
            </span>
            <small className="text-xs text-neutral-500">{activity.name}</small>
          </div>
          <span>
            ${(parseFloat(activity.price || "0.00") * guestCount).toFixed(2)}
          </span>
        </div>
      ))}

      {isLodging && selectedLodging && (
        <>
          <div className="flex flex-row items-center justify-start gap-2">
            <Heading level={6} className="font-bold" desc={selectedLodging.name}>Hospedaje</Heading> 
            <Link
              href={`${RouteGuimel.lodging}/${selectedLodging.link}` as any}
              target="_blank"
              className="text-xs"
            >
              <ExternalLinkIcon className="text-blue-700 h-4" />
            </Link>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              ${parseFloat(selectedLodging?.price || "0.00").toFixed(2)} x {guestCount} personas
            </span>
            <span>
              ${(parseFloat(selectedLodging?.price || "0.00") * guestCount).toFixed(2)}
            </span>
          </div>
        </>
      )}

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
