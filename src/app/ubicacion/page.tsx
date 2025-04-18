"use client"; 
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
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
    <div className="container relative space-y-24 mt-24 mb-24 lg:space-y-28 lg:mb-28">
      <SectionSliderNewCategories  categories={data?.locations} />
    </div>
  );
};

export default Location;
