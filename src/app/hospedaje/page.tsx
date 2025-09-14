"use client"; 
import LodgingCard from "@/components/Guimel/LodgingCard";
import { LODGINGS_QUERY } from "@/components/Guimel/hospedaje/QueryHospedaje.queries";
import {  LodginsDataType } from "@/data/types";
import Heading2 from "@/shared/Heading2";
import { useQuery } from "@apollo/client";

const Lodging = ({ params }: { params: { link: string } }) => {
  const { link } = params;

   const { data, loading } = useQuery<LodginsDataType>(LODGINGS_QUERY, {
      variables: {
      },
      fetchPolicy: "no-cache",
    });   

  return (
    <div className="container relative space-y-24 mt-24 mb-24 lg:space-y-28">
       <div className="flex items-center space-x-4">
         <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
         <div>
           <Heading2
                heading="Nuestros Hospedajes"
                subHeading={
                  <span className="block text-orange-600 dark:text-orange-400 mt-2 font-medium">
                    {data?.lodgingsCount} hospedajes disponibles
                  </span>
                }
              />
         </div>
       </div>
       <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.lodgings!.map(
              (lodging:any,index:number) => (
                <LodgingCard key={index} data={lodging}
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                /> 
              )
            )}
      </div> 
    </div>
  );
};

export default Lodging;
