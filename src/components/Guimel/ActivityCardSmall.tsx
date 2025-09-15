import Link from "next/link";
import { RouteGuimel } from "@/routers/routes";
import { ActivityType } from "@/data/types";
import ExternalLinkIcon from "./icons/ExternalLinkIcon";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

interface ActivityCardSmallProps {
  activity: ActivityType;
  showAddBtn: boolean;
  selected: boolean;
  onClick: () => void;
}

const ActivityCardSmall: React.FC<ActivityCardSmallProps> = ({
  activity,
  showAddBtn,
  selected,
  onClick,
}) => (
  <div
    key={activity.id}
    className={`flex flex-row sm:flex-row sm:items-center p-2 rounded-xl transition
      ${selected ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50"}
    `}
  >
    {/* Imagen */}
    <div className="flex-shrink-0 w-full sm:w-20">
      <div className="aspect-w-2 aspect-h-1 sm:aspect-h-2 rounded-2xl overflow-hidden">
        <ImageWithPlaceholder
          image={activity?.image}
          alt={activity?.name || "Actividad"}
          className="object-cover w-full h-full"
          fill
          sizes="200px"
          useCardPlaceholder={false}
          placeholderIcon={false}
        />
      </div>
    </div>

    {/* Info */}
    <div className="flex-1 py-2 sm:px-3 space-y-1">
      <div>
        <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {activity?.address.substring(0, 30)}
        </span>
        <div className="flex flex-row space-x-2 items-center">
          <span className="text-base font-medium mt-1 block">
            {activity?.name}
          </span>
          <Link
            href={`${RouteGuimel.activity}/${activity.link}` as any}
            target="_blank"
          >
            <ExternalLinkIcon className="text-blue-700 h-4" />
          </Link>
        </div>
      </div>

      <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-green-600">
          ${parseFloat(activity?.price || "0.00").toFixed(2)}/persona
        </span>

        {showAddBtn && (
          <button
            onClick={onClick}
            className={`ml-2 flex items-center justify-center w-6 h-6 rounded-full text-white text-sm font-bold transition
              ${selected ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {selected ? "-" : "+"}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ActivityCardSmall;