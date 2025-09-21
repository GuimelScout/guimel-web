import React from "react";
import { ActivityType } from "@/data/types";
import ActivityCardSmall from "@/components/Guimel/ActivityCardSmall";
import LocationSelector from "./LocationSelector";
import LodgingSelector from "./LodgingSelector";
import PriceBreakdown from "./PriceBreakdown";
import RelatedActivities from "./RelatedActivities";
import { CheckoutSidebarProps, PaymentBreakdowns } from "../types";

const CheckoutSidebar: React.FC<CheckoutSidebarProps & { breakdown: PaymentBreakdowns }> = ({
  data,
  checkoutState,
  onLocationSelect,
  onLodgingToggle,
  onLodgingSelect,
  onActivityToggle,
  getTotal,
  breakdown,
}) => {
  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h3 className="text-2xl font-semibold">Tu experiencia</h3>
        
        <LocationSelector
          locations={data?.activity?.location || []}
          selectedLocation={checkoutState.locationSelected}
          onLocationSelect={onLocationSelect}
        />

        {checkoutState.activitiesSelected.map((activity) => (
          <ActivityCardSmall
            key={activity.id}
            activity={activity}
            showAddBtn={false}
            selected={false}
            onClick={() => {}}
          />
        ))}

        <LodgingSelector
          lodgings={data?.activity?.lodging || []}
          isLodging={checkoutState.isLodging}
          selectedLodging={checkoutState.lodginSelected}
          onLodgingToggle={onLodgingToggle}
          onLodgingSelect={onLodgingSelect}
        />

        <PriceBreakdown
          activities={checkoutState.activitiesSelected}
          selectedLodging={checkoutState.lodginSelected}
          isLodging={checkoutState.isLodging}
          guestCount={checkoutState.guestAdultsInputValue}
          total={getTotal()}
          paymentType={checkoutState.paymentType}
          breakdown={breakdown}
        />
      </div>

      <RelatedActivities
        location={checkoutState.locationSelected}
        activities={data?.activitiesRelated || []}
        selectedActivities={checkoutState.activitiesSelected}
        loading={data?.loadingActivitiesRelated || false}
        onActivityToggle={onActivityToggle}
      />
    </div>
  );
};

export default CheckoutSidebar;
