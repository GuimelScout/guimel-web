import React from "react";
import { ActivityType, LodgingType } from "@/data/types";
import Heading from "@/shared/Heading";
import Link from "next/link";
import ExternalLinkIcon from "@/components/Guimel/icons/ExternalLinkIcon";
import { RouteGuimel } from "@/routers/routes";
import { PaymentBreakdowns, CommissionData } from "../types";
import { calculateCommission, calculateStripeFee } from "../utils/calculateTotal";

interface PriceBreakdownProps {
  activities: ActivityType[];
  selectedLodging: LodgingType | null;
  isLodging: boolean;
  guestCount: number;
  total: string;
  paymentType: 'full_payment' | 'commission_only';
  breakdown: PaymentBreakdowns;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  activities,
  selectedLodging,
  isLodging,
  guestCount,
  total,
  paymentType,
  breakdown,
}) => {
  const getCommissionData = (item: any): CommissionData => ({
    type: item.commission_type || 'percentage',
    value: item.commission_value || 10
  });

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold">Detalles del precio</h3>
      
      {activities.map((activity) => {
        const basePrice = parseFloat(activity.price || "0.00") * guestCount;
        const commission = getCommissionData(activity);
        const commissionAmount = calculateCommission(basePrice, commission); 
        
        const safeCommissionAmount = Number(commissionAmount) || 0;
        const safeCommissionValue = Number(commission.value) || 0;
        
        return (
          <div key={activity.id} className="space-y-2">
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <div className="flex flex-col">
                <span className="font-medium">{activity.name}</span>
                <small className="text-xs text-neutral-500">
                  ${parseFloat(activity.price || "0.00").toFixed(2)} x {guestCount} personas
                </small>
              </div>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            
            <div className="ml-4 space-y-1 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Tarifa de confirmación: </span>
                <span>${safeCommissionAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {isLodging && selectedLodging && (
        <div className="space-y-2">
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
            <div className="flex flex-col">
              <span>
                ${parseFloat(selectedLodging?.price || "0.00").toFixed(2)} x {guestCount} personas
              </span>
            </div>
            <span>${(parseFloat(selectedLodging?.price || "0.00") * guestCount).toFixed(2)}</span>
          </div>
          
          {(() => {
            const basePrice = parseFloat(selectedLodging?.price || "0.00") * guestCount;
            const commission = getCommissionData(selectedLodging);
            const commissionAmount = calculateCommission(basePrice, commission); 
            
            const safeCommissionAmount = Number(commissionAmount) || 0;
            const safeCommissionValue = Number(commission.value) || 0;
            
            return (
              <div className="ml-4 space-y-1 text-sm">
                <div className="flex justify-between text-neutral-500">
                  <span>Tarifa de confirmación: </span>
                  <span>${safeCommissionAmount.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      
      <div className="space-y-2">
        <div className="flex justify-between font-semibold text-lg">
          <span>Pago ahora:</span>
          <span className="text-green-600 dark:text-green-400">
            ${(Number(breakdown[paymentType].payNow) || 0).toFixed(2)} MXN
          </span>
        </div>
        
        {paymentType === 'commission_only' && (Number(breakdown.commission_only.payAtProperty) || 0) > 0 && (
          <div className="flex justify-between font-semibold text-lg">
            <span>Pago en el lugar:</span>
            <span className="text-blue-600 dark:text-blue-400">
              ${(Number(breakdown.commission_only.payAtProperty) || 0).toFixed(2)} MXN
            </span>
          </div>
        )}
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>
            ${((Number(breakdown[paymentType].payNow) || 0) + (Number(breakdown[paymentType].payAtProperty) || 0)).toFixed(2)} MXN
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
