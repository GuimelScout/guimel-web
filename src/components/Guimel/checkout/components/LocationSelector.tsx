import React from "react";
import { LocationType } from "@/data/types";
import OptionButton from "@/components/Guimel/OptionButton";

interface LocationSelectorProps {
  locations: LocationType[];
  selectedLocation: LocationType | null;
  onLocationSelect: (location: LocationType) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
}) => {
  return (
    <div className="space-y-4">
      <span className="text-md text-neutral-500">
        Selecciona la ubicación de tu preferencia:
      </span>
      <div className="grid grid-cols-2 gap-1">
        {locations.map((location) => (
          <OptionButton
            key={location.id}
            selected={selectedLocation === location}
            onClick={() => onLocationSelect(location)}
            imgUrl={location.image.url}
            title={location.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationSelector;
