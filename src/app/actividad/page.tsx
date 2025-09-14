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
       <div className="flex items-center space-x-4">
         <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
         <div>
           <Heading2
                heading="Nuestras Actividades"
                subHeading={
                  <span className="block text-blue-600 dark:text-blue-400 mt-2 font-medium">
                    {data?.activitiesCount} actividades disponibles
                  </span>
                }
              />
         </div>
       </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.activities!.map(
              (activity:any,index:number) => (
                <ActivityCard key={index} data={activity}
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                /> 
              )
            )}
          </div>
    </div>
  );
};

export default Activitie;
