import React from "react";
import { ActivityType, LocationType } from "@/data/types";
import ActivityCardSmall from "@/components/Guimel/ActivityCardSmall";
import Loading from "@/components/Guimel/Loading";

interface RelatedActivitiesProps {
  location: LocationType | null;
  activities: ActivityType[];
  selectedActivities: ActivityType[];
  loading: boolean;
  onActivityToggle: (activity: ActivityType) => void;
}

const RelatedActivities: React.FC<RelatedActivitiesProps> = ({
  location,
  activities,
  selectedActivities,
  loading,
  onActivityToggle,
}) => {
  if (!location) return null;

  return (
    <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
      <h3 className="text-l font-semibold text-center">
        Agrega más actividades a tu experiencia en
      </h3>
      
      <h4 className="text-2xl font-semibold text-center text-blue-700">
        {location.name}
      </h4>
      
      {loading ? (
        <Loading />
      ) : activities.length > 0 ? (
        <div className="grid grid-cols-1 gap-1">
          {activities.map((activity) => (
            <ActivityCardSmall
              key={activity.id}
              activity={activity}
              showAddBtn={true}
              selected={selectedActivities.includes(activity)}
              onClick={() => onActivityToggle(activity)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center text-sm">
          No hay más actividades disponibles en esta ubicación.
        </p>
      )}
    </div>
  );
};

export default RelatedActivities;
