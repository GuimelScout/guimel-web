import React from "react";
import { PaymentBreakdowns } from "../types";

interface PaymentTypeSelectorProps {
  paymentType: 'full_payment' | 'commission_only';
  onPaymentTypeChange: (type: 'full_payment' | 'commission_only') => void;
  breakdown: PaymentBreakdowns;
}

const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  paymentType,
  onPaymentTypeChange,
  breakdown
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tipo de pago</h3>
      
      <div className="space-y-3">
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            paymentType === 'full_payment' 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }`}
          onClick={() => onPaymentTypeChange('full_payment')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentType"
                value="full_payment"
                checked={paymentType === 'full_payment'}
                onChange={() => onPaymentTypeChange('full_payment')}
                className="w-4 h-4 text-primary-600"
              />
              <div>
                <h4 className="font-medium">Pago Completo</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Pagas todo ahora, solo llega a disfrutar.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                ${breakdown.full_payment.payNow.toFixed(2)} MXN
              </div>
              <div className="text-xs text-neutral-500">
                Pago en el lugar: $0.00 MXN
              </div>
            </div>
          </div>
        </div>
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            paymentType === 'commission_only' 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }`}
          onClick={() => onPaymentTypeChange('commission_only')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentType"
                value="commission_only"
                checked={paymentType === 'commission_only'}
                onChange={() => onPaymentTypeChange('commission_only')}
                className="w-4 h-4 text-primary-600"
              />
              <div>
                <h4 className="font-medium">Solo Tarifa de Confirmación</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Pagas solo la tarifa de confirmación ahora, el resto al llegar.
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                ${breakdown.commission_only.payNow.toFixed(2)} MXN
              </div>
              <div className="text-xs text-neutral-500">
                Pago en el lugar: ${breakdown.commission_only.payAtProperty.toFixed(2)} MXN
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 space-y-2">
        <h5 className="font-medium text-sm">Desglose de pagos:</h5>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Pago ahora:</span>
            <span className="font-medium">
              ${breakdown[paymentType].payNow.toFixed(2)} MXN
            </span>
          </div>
          <div className="flex justify-between">
            <span>Pago en el lugar:</span>
            <span className="font-medium">
              ${breakdown[paymentType].payAtProperty.toFixed(2)} MXN
            </span>
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-1 flex justify-between font-semibold">
            <span>Total:</span>
            <span>
              ${(breakdown[paymentType].payNow + breakdown[paymentType].payAtProperty).toFixed(2)} MXN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeSelector;
