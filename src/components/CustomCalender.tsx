import React, { useState } from "react";
import { format } from "date-fns";
import { FaRegCalendarAlt as CalendarIcon } from "react-icons/fa";

import { cn } from "../utils/utility";
import { Button } from "./UI/button";
import { Calendar } from "./UI/calender";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";

type CalendarProps = {
  width?: string;
  id?: string;
  handleStartDateChange?: (date: Date | undefined, id: string) => void;
  givenDate?: Date;
};

const CustomCalendar = ({
  width,
  handleStartDateChange,
  id = "",
  givenDate,
}: CalendarProps) => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
    if (handleStartDateChange) {
      handleStartDateChange(selectedDate, id);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${width ?? "w-[280px]"} justify-start text-left font-normal`,
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {!date && !givenDate && <span>Pick a date</span>}
          {date && !givenDate && format(date, "PPP")}
          {givenDate && format(givenDate, "PPP")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomCalendar;
