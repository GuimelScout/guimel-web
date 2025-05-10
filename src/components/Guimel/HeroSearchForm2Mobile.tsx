"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import ButtonSubmit from "../../app/template/(client-components)/(HeroSearchForm2Mobile)/ButtonSubmit";
import { useTimeoutFn } from "react-use";
import StaySearchForm from "../../app/template/(client-components)/(HeroSearchForm2Mobile)/(stay-search-form)/StaySearchForm";
import CarsSearchForm from "../../app/template/(client-components)/(HeroSearchForm2Mobile)/(car-search-form)/CarsSearchForm";
import FlightSearchForm from "../../app/template/(client-components)/(HeroSearchForm2Mobile)/(flight-search-form)/FlightSearchForm";
import Logo from "@/shared/Logo";

const HeroSearchForm2Mobile = () => {
  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return (
      <div className="flex flex-row items-center justify-center">
        <Logo imgLight={{src:"/logo-light.svg",height:280, width:280}} img={{src:"/logo-dark.svg",height:280, width:280}} />
      </div>
    );
  };

  return (
    <div className="HeroSearchForm2Mobile">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  {showDialog && (
                    <Tab.Group manual>
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>

                      <Tab.List className="pt-12 flex w-full justify-center font-semibold text-sm sm:text-base text-neutral-500 dark:text-neutral-400 space-x-6 sm:space-x-8">
                        {["Stay", "Experiences", "Cars", "Flights"].map(
                          (item, index) => (
                            <Tab key={index} as={Fragment}>
                              {({ selected }) => (
                                <div className="relative focus:outline-none focus-visible:ring-0 outline-none select-none">
                                  <div
                                    className={`${
                                      selected
                                        ? "text-black dark:text-white"
                                        : ""
                                    }  `}
                                  >
                                    {item}
                                  </div>
                                  {selected && (
                                    <span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
                                  )}
                                </div>
                              )}
                            </Tab>
                          )
                        )}
                      </Tab.List>
                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <Tab.Panels className="flex-1 overflow-y-auto hiddenScrollbar py-4">
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <StaySearchForm />
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <StaySearchForm />
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <CarsSearchForm />
                            </div>
                          </Tab.Panel>
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <FlightSearchForm />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialog(false);
                            resetIsShowingDialog();
                          }}
                        >
                          Clear all
                        </button>
                        <ButtonSubmit
                          onClick={() => {
                            closeModal();
                          }}
                        />
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeroSearchForm2Mobile;
