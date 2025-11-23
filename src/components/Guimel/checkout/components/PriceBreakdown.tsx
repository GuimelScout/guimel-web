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
  lodging: LodgingType | undefined;
  selectedLodging: LodgingType | null;
  isLodging: boolean;
  guestCount: number;
  total: string;
  paymentType: 'full_payment' | 'commission_only';
  breakdown: PaymentBreakdowns;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  activities,
  lodging,
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
      
      {( activities.length > 0) && (
        <div className="space-y-2">
          <Heading level={6} className="font-bold" desc={''}> { (activities.length > 1) ? "Actividades:" : "Actividad:"} </Heading> 
          {activities.map((activity) => {
            const pricePerGuest = parseFloat(activity.price || "0.00");
            const basePrice = pricePerGuest * guestCount;
            const commission = getCommissionData(activity);
            
            // Calculate commission per guest (base commission)
            const commissionPerGuest = calculateCommission(pricePerGuest, commission);
            
            // Calculate: (price + commission) * guests
            const subtotal = (pricePerGuest + commissionPerGuest) * guestCount;
            
            // Calculate Stripe fee on the subtotal
            const stripeFee = calculateStripeFee(subtotal);
            
            // Tarifa de confirmación: (commission * guests) + stripeFee
            const confirmationFee = (commissionPerGuest * guestCount) + stripeFee;
            
            return (
              <div key={activity.id}>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-start gap-2">  
                      <span className="block font-normal text-base sm:text-lg dark:text-neutral-100">{activity.name}</span>
                      <Link
                        href={`${RouteGuimel.activity}/${activity.link}` as any}
                        target="_blank"
                        className="text-xs"
                      >
                        <ExternalLinkIcon className="text-blue-700 h-4" />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <small className="text-xs text-neutral-500">
                        ${pricePerGuest.toFixed(2)} x {guestCount} personas
                      </small>
                      <span>${basePrice.toFixed(2)}</span>
                    </div>
                  </div>
                
                <div className="ml-4 space-y-1 text-sm">
                  <div className="flex justify-between text-neutral-500">
                    <span>Tarifa de confirmación: </span>
                    <span>${confirmationFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {(isLodging || lodging) && (selectedLodging || lodging) && (
        <div>
          <div className="space-y-2">
            <Heading level={6} className="font-bold" desc={''}>Hospedaje:</Heading>
            <div className="flex flex-row items-center justify-start gap-2">  
              <span className="block font-normal text-base sm:text-lg dark:text-neutral-100">{selectedLodging?.name || lodging?.name}</span>
              <Link
                href={`${RouteGuimel.lodging}/${selectedLodging?.link || lodging?.link}` as any}
                target="_blank"
                className="text-xs"
                >
                <ExternalLinkIcon className="text-blue-700 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500">
                ${parseFloat(selectedLodging?.price || lodging?.price || "0.00").toFixed(2)} x {guestCount} personas
              </span>
            </div>
            <span>${(parseFloat(selectedLodging?.price || lodging?.price || "0.00") * guestCount).toFixed(2)}</span>
          </div>
          
          {(() => {
            const pricePerGuest = parseFloat(selectedLodging?.price || lodging?.price || "0.00");
            const basePrice = pricePerGuest * guestCount;
            const commission = getCommissionData(selectedLodging || lodging);
            
            // Calculate commission per guest (base commission)
            const commissionPerGuest = calculateCommission(pricePerGuest, commission);
            
            // Calculate: (price + commission) * guests
            const subtotal = (pricePerGuest + commissionPerGuest) * guestCount;
            
            // Calculate Stripe fee on the subtotal
            const stripeFee = calculateStripeFee(subtotal);
            
            // Tarifa de confirmación: (commission * guests) + stripeFee
            const confirmationFee = (commissionPerGuest * guestCount) + stripeFee;
            
            return (
              <div className="ml-4 space-y-1 text-sm">
                <div className="flex justify-between text-neutral-500">
                  <span>Tarifa de confirmación: </span>
                  <span>${confirmationFee.toFixed(2)}</span>
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
