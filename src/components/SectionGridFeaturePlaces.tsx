import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { ActivitiesDataType, ActivityType, StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import { useQuery } from "@apollo/client";
import { ACTIVITIES_QUERY } from "./Guimel/activity/QueryActivity.queries";
import ActivityCard from "./Guimel/ActivityCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Guimel Spots",
  subHeading = "Actividades populares en la Comunidad",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {

  const { data, loading } = useQuery<ActivitiesDataType>(ACTIVITIES_QUERY, {
      variables: {
      },
      fetchPolicy: "no-cache",
    });

  const renderCard = (stay: ActivityType) => {
    return <ActivityCard key={stay.id} data={stay} className="shadow-lg rounded-xl" />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {data?.activities.map((activity) => renderCard(activity))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
