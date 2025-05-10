"use client"; 
import SectionSliderNewCategories from "@/components/Guimel/SectionSliderNewCategories";
import { LOCATIONS_QUERY } from "@/shared/QuerySelect/QuerySelect.queries";
import { useQuery } from "@apollo/client";

const Location = ({ params }: { params: { link: string } }) => {
  const { link } = params;


   const { data, loading } = useQuery(LOCATIONS_QUERY, {
      variables: {
      },
      fetchPolicy: "no-cache",
    });   

  return (
    <div className="container relative space-y-14 sm:space-y-20 mt-14 sm:mt-20 mb-14 sm:mb-20">
      <SectionSliderNewCategories categories={data?.locations} />
    </div>
  );
};

export default Location;
