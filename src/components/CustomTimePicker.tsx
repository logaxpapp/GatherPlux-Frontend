import { useState } from "react";
import { LuClock12 as TimeIcon } from "react-icons/lu";

import { cn } from "../utils/utility";
import { Button } from "./UI/button";
import TimePicker from "./UI/time-picker";

import { Popover, PopoverContent, PopoverTrigger } from "./UI/popover";

type TimeProps = {
  width?: string;
  handleTimeChange?: (
    time: string | undefined,
    id: string | undefined,
    type: string,
  ) => void;
  id?: string;
  type: string;
  startTime?: string;
  givenEndTime?: string;
  givenStartTime?: string;
};

const CustomTimePicker = ({
  width,
  handleTimeChange,
  id,
  type,
  startTime,
  givenEndTime,
  givenStartTime,
}: TimeProps) => {
  const [time, setTime] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);

  const handleSetTime = (selectedTime: string | undefined) => {
    setTime(selectedTime);
    setOpen(false);
    if (handleTimeChange) {
      handleTimeChange(selectedTime, id, type);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${width ?? "w-[200px]"} justify-start text-left font-normal`,
            !time && "text-muted-foreground",
          )}
        >
          <TimeIcon className="mr-2 h-4 w-4" />
          {time && time}
          {!time && !givenStartTime && !givenEndTime && (
            <span>Pick a time</span>
          )}
          {!time && givenStartTime && type === "startTime" && givenStartTime}
          {!time && givenEndTime && type === "endTime" && givenEndTime}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <TimePicker
          startTime={startTime}
          handleSetTime={handleSetTime}
          selectedTime={time}
          type={type}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomTimePicker;
