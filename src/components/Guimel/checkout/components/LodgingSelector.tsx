import React from "react";
import { LodgingType } from "@/data/types";
import OptionButton from "@/components/Guimel/OptionButton";

interface LodgingSelectorProps {
  lodgings: LodgingType[];
  isLodging: boolean;
  selectedLodging: LodgingType | null;
  onLodgingToggle: () => void;
  onLodgingSelect: (lodging: LodgingType | null) => void;
}

const LodgingSelector: React.FC<LodgingSelectorProps> = ({
  lodgings,
  isLodging,
  selectedLodging,
  onLodgingToggle,
  onLodgingSelect,
}) => {
  if (lodgings.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="mr-2.5 text-orange-500">
          ¿Te gustaría incluir hospedaje?
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isLodging}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isLodging 
              ? 'bg-green-400 dark:bg-green-400' 
              : 'bg-neutral-200 dark:bg-neutral-700'
          }`}
          onClick={onLodgingToggle}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              isLodging ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isLodging && (
        <div>
          <small className="text-sm text-neutral-500">
            Selecciona un hospedaje:
          </small>
          <div className={`grid gap-1 ${lodgings.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {lodgings.map((lodging) => (
              <OptionButton
                key={lodging.id}
                selected={selectedLodging === lodging}
                onClick={() => {
                  if (selectedLodging === null || selectedLodging !== lodging) {
                    onLodgingSelect(lodging);
                  } else {
                    onLodgingSelect(null);
                  }
                }}
                imgUrl={lodging.logo.url}
                title={lodging.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LodgingSelector;
