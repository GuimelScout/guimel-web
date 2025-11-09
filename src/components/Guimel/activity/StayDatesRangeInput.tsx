"use client";

import React, { Fragment, useState, FC, Dispatch, SetStateAction } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker, { registerLocale } from "react-datepicker";
import ClearDataButton from "@/app/template/(client-components)/(HeroSearchForm)/ClearDataButton";
import { es } from "date-fns/locale";
registerLocale("es", es);

export interface StayDatesRangeInputProps {
  className?: string;
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  dayType?: string | null;
  specificDate?: Date | null;
  customStartDate?: Date | null;
  customEndDate?: Date | null;
  availableDays?: Array<{ day: string }> | null;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  startDate,
  setStartDate,
  dayType,
  specificDate,
  customStartDate,
  customEndDate,
  availableDays
}) => {

  const onChangeDate = (dates: [Date | null]) => {
    const [start] = dates;
    setStartDate(start);
  }; 

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
        <span className="block xl:text-lg font-semibold">
          {startDate
            ? startDate
                .toLocaleDateString("es-MX", { month: "short", day: "2-digit" })
                .replace(".", "")
                .replace(/^(\d+)-(\w)/, (_, day, month) => `${day}-${month.toUpperCase()}`)
            : "Añadir fecha"}
        </span>

          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Llegada"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => onChangeDate([null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => onChangeDate([date])}
                  startDate={startDate}
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  locale='es'
                  minDate={new Date()}
                  calendarStartDay={0}
                  filterDate={(date) => filterDate(date, dayType ?? null, specificDate ?? null, customStartDate ?? null, customEndDate ?? null, availableDays ?? null)}
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

const filterDate = (
  date: Date, 
  dayType: string | null, 
  specificDate: Date | null, 
  customStartDate: Date | null, 
  customEndDate: Date | null, 
  availableDays: Array<{ day: string }> | null
) => {
  if (!dayType) {
    return true;
  }
  switch (dayType) {
    case 'weekdays':
      return date.getDay() >= 1 && date.getDay() <= 5;
    case 'weekends':
      return date.getDay() === 0 || date.getDay() === 6;
    case 'one_day':
      return availableDays && availableDays.length > 0 
          ? availableDays.some(day => {
              const dateString = date.toISOString().split('T')[0];
              return day.day === dateString;
            })
          : true;
    case 'date_range':
      return customStartDate && customEndDate 
        ? date >= customStartDate && date <= customEndDate 
        : true;
    case 'some_days':
      return availableDays && availableDays.length > 0 
          ? availableDays.some(day => {
              const dateString = date.toISOString().split('T')[0];
              return day.day === dateString;
            })
          : true;
    default:
      return true;
  }
};

export default StayDatesRangeInput;
