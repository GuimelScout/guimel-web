"use client"; 
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import Heading2 from "@/shared/Heading2";
import { LOCATION_QUERY } from "@/shared/QuerySelect/QuerySelect.queries";
import Skeleton from "@/shared/Skeleton";
import { useQuery } from "@apollo/client";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GalleryImageType, LocationDataType } from "@/data/types";
import ActivityCard from "@/components/Guimel/ActivityCard";
import LodgingCard from "@/components/Guimel/LodgingCard";
import ImageWithPlaceholder from "@/components/Guimel/ImageWithPlaceholder";
import PlaceholderGallery from "@/components/Guimel/PlaceholderGallery";

const Location = ({ params }: { params: { link: string } }) => {
  const { link } = params;

  const { data, loading } = useQuery<LocationDataType>(LOCATION_QUERY, {
    variables: { where: { link: link} },
  });  
  
    const router = useRouter();
    const thisPathname = usePathname();
    const searchParams = useSearchParams();
    const modal = searchParams?.get("modal");
  
    const handleCloseModalImageGallery = () => {
      let params = new URLSearchParams(document.location.search);
      params.delete("modal");
      router.push(`${thisPathname}/?${params.toString()}` as Route);
    };

    const getImageGalleryListing = (): GalleryImageType[] => {
      return (data?.location.gallery ?? []).map((item: any, index: number) => ({
        id: index.toString(),
        description: item.description || "",
        image: {
          url: item.image?.url || "", 
        },
      }));
    };
    
    const gallery = getImageGalleryListing();
    const galleryModal = getImageGalleryListing();
    
    const newImageUrl = data?.location.image?.url || "";
    galleryModal.push({
      id: gallery.length.toString(),
      description: data?.location.description || "",
      image: { url: newImageUrl },
    });
    

    const handleOpenModalImageGallery = () => {
      router.push(`${thisPathname}/?modal=GALLERY-${link}` as Route);
    };

  return (
    <div className="container relative space-y-24 mt-24 mb-24 lg:space-y-28 lg:mb-28">
      { (loading) ? 
      <Skeleton /> : 
      <div>
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            {data?.location.name}
          </h1>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {data?.location.description}
          </span>
        </div>
        <div className="rounded-md sm:rounded-xl">
          {(!data?.location.image || !data?.location.image.url) && gallery.length === 0 ? (
            <PlaceholderGallery
              type="location"
              className="w-full"
              showText={true}
              customText="Ubicación sin imágenes"
            />
          ) : (
            <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
              <div
                className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                onClick={handleOpenModalImageGallery}
              >
                <ImageWithPlaceholder
                  image={data?.location.image}
                  alt={data?.location.name || "Ubicación"}
                  className="object-cover rounded-md sm:rounded-xl"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  placeholderText="Ubicación sin imagen"
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
              {gallery.filter((_, i) => i >= 0 && i < 4).map((item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                    <ImageWithPlaceholder
                      image={item.image}
                      alt={item.description}
                      className="object-cover rounded-md sm:rounded-xl"
                      fill
                      sizes="400px"
                      placeholderText=""
                      placeholderIcon={true}
                    />
                  </div>
                  <div
                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleOpenModalImageGallery}
                  />
                </div>
              ))}
              {
                (gallery.length > 4 ) ? 
              <button
                className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                onClick={handleOpenModalImageGallery}
              >
                <Squares2X2Icon className="w-5 h-5" />
                <span className="ml-2 text-neutral-800 text-sm font-medium">
                  Ver todas las imagenes
                </span>
              </button>
                : <></>
              }
            </div>
          )}
        </div>

        <ListingImageGallery
          isShowModal={modal === `GALLERY-${link}`}
          onClose={handleCloseModalImageGallery}
          images={galleryModal}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-8">
          {/* Actividades Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              <div>
                <Heading2
                  heading="Actividades"
                  subHeading={
                    <span className="block text-blue-600 dark:text-blue-400 mt-1 text-sm font-medium">
                      {data?.location.activityCount} actividades disponibles
                    </span>
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data?.location.activity!.map(
                (activity,index) => (
                  <ActivityCard key={index} data={activity}
                  size="small"
                  className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  /> 
                  
                )
              )}
            </div>
          </div>

          {/* Hospedaje Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              <div>
                <Heading2
                  heading="Hospedaje"
                  subHeading={
                    <span className="block text-orange-600 dark:text-orange-400 mt-1 text-sm font-medium">
                      {data?.location.lodgingCount} hospedajes disponibles
                    </span>
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data?.location.lodging!.map(
                (lodgging,index) => (
                  <LodgingCard key={index} data={lodgging}
                  size="small"
                  className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  /> 
                )
              )}
            </div>
          </div>
        </div>
      </div>
       }
      
    </div>
  );
};

export default Location;
