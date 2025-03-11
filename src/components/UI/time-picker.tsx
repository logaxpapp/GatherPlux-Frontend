import React, { useState } from "react";
import { Button } from "./button";
import { FaRegClock as Clock, FaCheck as Check } from "react-icons/fa6";
import { cn } from "../../utils/utility";

interface TimePickerProps {
  handleSetTime: (time: string) => void;
  selectedTime?: string;
  startTime?: string;
  type?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  handleSetTime,
  selectedTime,
  startTime,
  type,
}) => {
  const [hoveredTime, setHoveredTime] = useState<string | "">("");

  const formatTimeFor12Hour = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hoursNum = parseInt(hours);
    const period = hoursNum >= 12 ? "PM" : "AM";
    const hours12 = hoursNum % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const convertTo24Hour = (time12h: string) => {
    if (!time12h) return null;
    const [timePart, period] = time12h.trim().split(/\s+/);
    const [hours, minutes] = timePart.split(":");

    let hoursNum = parseInt(hours);
    if (period === "PM" && hoursNum < 12) hoursNum += 12;
    else if (period === "AM" && hoursNum === 12) hoursNum = 0;

    return `${hoursNum.toString().padStart(2, "0")}:${minutes}`;
  };

  const groupedTimeSlots = {
    AM: [...Array(12)].flatMap((_, i) => [
      `${String(i).padStart(2, "0")}:00`,
      `${String(i).padStart(2, "0")}:30`,
    ]),
    PM: [...Array(12)].flatMap((_, i) => [
      `${String(i + 12).padStart(2, "0")}:00`,
      `${String(i + 12).padStart(2, "0")}:30`,
    ]),
  };

  let startSlotIndex = 0;
  let startTimeIndex = 0;

  if (startTime && type === "end_time") {
    const time24h = convertTo24Hour(startTime);
    if (time24h) {
      const hour = parseInt(time24h.split(":")[0]);
      const period = hour >= 12 ? "PM" : "AM";
      const timeIndex = groupedTimeSlots[period].indexOf(time24h);
      if (timeIndex !== -1) {
        startSlotIndex = period === "AM" ? 0 : 1;
        startTimeIndex = timeIndex + 1;
      }
    }
  }

  const isEndTimeDisabled = type === "end_time" && !startTime;

  return (
    <div className="w-72 rounded-md bg-[#eeeded] overflow-hidden text-black">
      <div className="p-4 bg-[#9EDD45]">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-white" />
          <span className="text-lg font-semibold text-white">Select Time</span>
        </div>
      </div>

      <div className="h-80 overflow-y-auto">
        {isEndTimeDisabled && (
          <div className="px-3 py-2 text-sm font-semibold text-red-300">
            Please select a start time first.
          </div>
        )}
        <div className="p-2">
          {Object.entries(groupedTimeSlots).map(([period, times], index) => (
            <div key={period} className="mb-4">
              {type === "startTime" || index >= startSlotIndex ? (
                <>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-700">
                    {period}
                  </div>
                  <div className="space-y-1">
                    {times.map((time, timeIndex) => {
                      const isSelected = selectedTime === time;
                      const isHovered = hoveredTime === time;

                      const shouldShow =
                        type === "startTime" ||
                        index > startSlotIndex ||
                        (index === startSlotIndex &&
                          timeIndex >= startTimeIndex);

                      if (!shouldShow) return null;

                      return (
                        <Button
                          key={time}
                          variant="ghost"
                          disabled={isEndTimeDisabled}
                          className={cn(
                            "w-full justify-between text-left py-3 px-4 rounded-lg transition-all duration-200",
                            "hover:bg-white hover:text-[#9EDD45]",
                            isSelected &&
                              "bg-white font-bold text-[#9EDD45] hover:bg-blue-100",
                            isEndTimeDisabled &&
                              "opacity-50 cursor-not-allowed",
                            "group relative",
                          )}
                          onClick={() =>
                            !isEndTimeDisabled &&
                            handleSetTime(formatTimeFor12Hour(time))
                          }
                          onMouseEnter={() => setHoveredTime(time)}
                          onMouseLeave={() => setHoveredTime("")}
                        >
                          <span className="text-sm font-medium">
                            {formatTimeFor12Hour(time)}
                          </span>
                          <div
                            className={cn(
                              "absolute right-4 opacity-0 transition-opacity duration-200",
                              (isSelected || isHovered) && "opacity-100",
                            )}
                          >
                            <Check
                              className={cn(
                                "w-4 h-4",
                                isSelected ? "text-[#9EDD45]" : "text-gray-600",
                              )}
                            />
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
