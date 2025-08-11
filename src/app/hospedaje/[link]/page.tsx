"use client"; 
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import Skeleton from "@/shared/Skeleton";
import { FetchResult, useMutation, useQuery } from "@apollo/client";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GalleryImageType, LodgingDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import Badge from "@/shared/Badge";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import Avatar from "@/shared/Avatar";
import { useEffect, useState } from "react";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import CommentListing from "@/components/Guimel/CommentListing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_REVIEW, GET_REVIEWS } from "@/components/Guimel/review/QueryReview.queries";
import { LODGING_QUERY } from "@/components/Guimel/hospedaje/QueryHospedaje.queries";

const Location = ({ params }: { params: { link: string } }) => {
  const { link } = params;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);

  const { data, loading,refetch } = useQuery<LodgingDataType>(LODGING_QUERY, {
    variables: { where: { link: link} },
  });

  const { data:activitiesReview, loading:loadingReviews,refetch:refetchReviews } = useQuery(GET_REVIEWS, {
    variables: { where: { lodging: { link: {equals: link}}},
    orderBy: [{ createdAt: "desc"}] },
  });

  const schema = z.object({
    lodging_id: z.string(),
    rating: z.number().optional(),
    review: z.string().min(3, "Escribe tu reseña."),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lodging_id: data?.lodging.id!,
      rating: 5,
      review: "",
    },
  });

  useEffect(() => {
    if (data?.lodging?.id) {
      reset((prevValues) => ({
        ...prevValues, 
        lodging_id: data.lodging.id
      }));
    }
  }, [data?.lodging?.id, reset]);

  const [createReview, { loading: loadingReview }] = useMutation(
    CREATE_REVIEW
  );

  const [rating, setRating] = useState(5);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    reset((prevValues) => ({
      ...prevValues, 
      rating: newRating, 
    }));
  };


   const onSubmit = async (data:any) => {
    let response: FetchResult<any>;

    const newReview = {
      lodging: {connect: { id: data.lodging_id }},
      rating: data.rating,
      review: data.review,
    };

    response = await createReview({
      variables: { 
        data:newReview
      },
    }); 


    try {
      if (response.data) {
        reset();
        refetchReviews();
        refetch();
      
      } else {
        throw new Error("Hubo un error al crear el indicador. Intente de nuevo.");
      }
    } catch (error) {
    } 
    
  };
  
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
    return (data?.lodging.gallery ?? []).map((item: any, index: number) => ({
      id: index.toString(),
      description: item.description || "",
      image: {
        url: item.image?.url || "", 
      },
    }));
  };
    
  const gallery = getImageGalleryListing();
  const galleryModal = getImageGalleryListing();
  
  const newImageUrl = data?.lodging.logo?.url || "";
  galleryModal.push({
    id: gallery.length.toString(),
    description: data?.lodging.description || "",
    image: { url: newImageUrl },
  });
    
  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=GALLERY-${link}` as Route);
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div className="flex justify-between items-center">
          <Badge color="green"  name="Favorito" />
          <LikeSaveBtns />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {data?.lodging.name}
        </h2>

        <div className="flex items-center space-x-4">
          <StartRating reviewCount={data?.lodging.reviewCount} point={data?.lodging.reviewStar} />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">  {data?.lodging.address}</span>
          </span>
        </div>

        <div className="flex items-center">
        <Avatar hasChecked={data?.lodging.hostBy?.verified} sizeClass="h-10 w-10" radius="rounded-full" imgUrl={data?.lodging.hostBy?.image?.url ?? undefined}  />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Organizado por {" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            {data?.lodging.hostBy?.name} {data?.lodging.hostBy?.lastName}
            </span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          {/* <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-clock text-2xl"></i>
            <span className="">3.5 hours</span>
          </div> */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">Hasta 10 personas</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-language text-2xl"></i>
            <span className="">Español</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    const totalGuests =
  guestChildrenInputValue + guestAdultsInputValue;
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            ${parseFloat(data?.lodging.price || "0.00").toFixed(2)}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /persona
            </span>
          </span>
          <StartRating reviewCount={data?.lodging.reviewCount} point={data?.lodging.reviewStar} />
        </div>

        <h2 className="text-2xl font-semibold">Información del anfitrión</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked={data?.lodging.hostBy?.verified}
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
            imgUrl={data?.lodging.hostBy?.image?.url}
            
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {data?.lodging.hostBy?.name} {data?.lodging.hostBy?.lastName} {data?.lodging.hostBy?.secondLastName}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating reviewCount={data?.lodging.hostBy?.reviewsCount} point={data?.lodging.hostBy?.reviewStar} />
              <span className="mx-2">·</span>
              <span> {data?.lodging.hostBy?.activityCount} actividades </span>
              <span className="mx-2">|</span>
              <span> {data?.lodging.hostBy?.lodgingCount} hospedajes</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          {data?.lodging.hostBy?.description}
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              Se unió en {data?.lodging.hostBy?.createdAt 
                ? new Date(data.lodging.hostBy.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long" }) 
                : "Fecha desconocida"}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Tasa de respuesta: 100 %</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Respuesta rápida: en pocas horas</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        

        {/* <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput className="flex-1 z-[11]" startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput className="flex-1" guestAdultsInputValue={guestAdultsInputValue} setGuestAdultsInputValue={setGuestAdultsInputValue} guestChildrenInputValue={guestChildrenInputValue} setGuestChildrenInputValue={setGuestChildrenInputValue} />
        </form> */}

       {/*  <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>${parseFloat(data?.lodging.price || "0.00").toFixed(2)} x {totalGuests} personas</span>
            <span>${parseFloat(data?.lodging.price || "0.00") * totalGuests}</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${parseFloat(data?.lodging.price || "0.00") * totalGuests}</span>
          </div>
        </div> */}

        {/* SUBMIT */}
        {/* <ButtonPrimary href={`/checkout?activity=${link}&guestss=${totalGuests}&startDate=${dateFormat(startDate)}&endDate=${dateFormat(endDate)}`}>Reservar</ButtonPrimary> */}
      </div>
    );
  };


  const renderSection3 = () => {
      return (
        <div className="listingSection__wrap">
          <div>
            <h2 className="text-2xl font-semibold">Incluye </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Todo está incluido en el precio.
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* 6 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
            {data?.lodging.includes
              .map((item,index) => (
                <div key={index} className="relative flex items-center space-x-3 group">
                  <i className="las la-check-circle text-2xl"></i>
                  <span>{item.name}</span>

                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-1 text-xs text-white bg-gray-900 rounded opacity-0 transition-opacity group-hover:opacity-100">
                    {item.description}
                  </span>
                </div>
              ))} 
          </div>
        </div>
      );
    };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Información del anfitrión</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked={data?.lodging.hostBy?.verified}
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
            imgUrl={data?.lodging.hostBy?.image?.url}
            
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {data?.lodging.hostBy?.name} {data?.lodging.hostBy?.lastName} {data?.lodging.hostBy?.secondLastName}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating reviewCount={data?.lodging.hostBy?.reviewsCount} point={data?.lodging.hostBy?.reviewStar} />
              <span className="mx-2">·</span>
              <span> {data?.lodging.hostBy?.activityCount} actividades </span>
              <span className="mx-2">|</span>
              <span> {data?.lodging.hostBy?.lodgingCount} hospedajes</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          {data?.lodging.hostBy?.description}
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              Se unió en {data?.lodging.hostBy?.createdAt 
                ? new Date(data.lodging.hostBy.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "long" }) 
                : "Fecha desconocida"}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Tasa de respuesta: 100 %</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Respuesta rápida: en pocas horas</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div> */}
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reseñas ({data?.lodging.reviewCount})</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
          <div className="space-y-5">
            <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" onChange={handleRatingChange} />
            <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  fontClass=""
                  {...register("review")}
                  sizeClass="h-16 px-4 py-3"
                  rounded="rounded-3xl"
                  placeholder="Comparte una reseña ..."
                  />

                <ButtonCircle
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size=" w-12 h-12 "
                  type="submit"
                  >
                  <ArrowRightIcon className="w-5 h-5" />
                </ButtonCircle> 
                {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}
              </form>
            </div>
          </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {
            activitiesReview?.reviews.length > 0? 
            activitiesReview?.reviews.map((review:any, index:any) => (
                <CommentListing key={index} data={review} className="py-8" />
              )) 
              : <>No hay comentarios</> 
          }
          {/* <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div> */}
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    const apiKey = "process.env.NEXT_PUBLIC_GOOGLE_API_KEY";
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Ubicación</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {data?.lodging.address}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              //src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${data?.lodging.address}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(data?.lodging.address || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Any experience can be canceled and fully refunded within 24 hours of
            purchase, or at least 7 days before the experience starts.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Guest requirements</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Up to 10 guests ages 4 and up can attend. Parents may also bring
            children under 2 years of age.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">What to bring</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Formal Wear To Visit Bai Dinh Pagoda Be ready before 7.30 Am.
              </li>
              <li>We will pick up from 07.30 to 08.00 AM</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="container relative space-y-12 mt-24 mb-24 lg:space-y-28 lg:mb-28">
      { (loading) ? 
      <Skeleton /> : 
      <div>
        <header className="rounded-md sm:rounded-xl">
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div
              className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={handleOpenModalImageGallery}
            >
              <Image
                fill
                className="object-cover rounded-md sm:rounded-xl"
                src={data?.lodging.logo.url!}
                alt={data?.lodging?.name || link}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
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
                  <Image
                    fill
                    className="object-cover rounded-md sm:rounded-xl "
                    src={item.image.url || ""}
                    alt={item.description}
                    sizes="400px"
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
        </header>
        <ListingImageGallery
          isShowModal={modal === `GALLERY-${link}`}
          onClose={handleCloseModalImageGallery}
          images={galleryModal}
        />

        {/* MAIn */}
      <main className="relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          {renderSection3()}
          {renderSection7()}

          {renderSection6()}
         {/*  
          <SectionDateRange />
          {renderSection8()} */}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
       
      </div>
       }
      
    </div>
  );
};

export default Location;

