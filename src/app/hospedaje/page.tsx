"use client"; 
import HospedajeCard from "@/components/Guimel/hospedaje/HospedajeCard";
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
       <Heading2
            heading="Nuestros Hospedajes"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                {data?.lodgingsCount} hospedajes
              </span>
            }
          />
       <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.lodgings!.map(
              (lodging:any,index:number) => (
                <HospedajeCard key={index} data={lodging}
                className="shadow-lg rounded-xl"
                /> 
              )
            )}
      </div> 
    </div>
  );
};

export default Lodging;
