"use client"; 
import { ACTIVITIES_QUERY } from "@/components/Guimel/activity/QueryActivity.queries";
import ActivityCard from "@/components/Guimel/ActivityCard";
import { ActivitiesDataType } from "@/data/types";
import Heading2 from "@/shared/Heading2";
import { useQuery } from "@apollo/client";

const Activitie = ({ params }: { params: { link: string } }) => {
  const { link } = params;


   const { data, loading } = useQuery<ActivitiesDataType>(ACTIVITIES_QUERY, {
      variables: {
      },
      fetchPolicy: "no-cache",
    });   

  return (
    <div className="container relative space-y-24 mt-24 mb-24 lg:space-y-28">
       <Heading2
            heading="Nuestras Actividades"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                {data?.activitiesCount} actividades
              </span>
            }
          />
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.activities!.map(
              (activity:any,index:number) => (
                <ActivityCard key={index} data={activity}
                className="shadow-lg rounded-xl"
                /> 
              )
            )}
          </div>
    </div>
  );
};

export default Activitie;
