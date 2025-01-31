import React, { useState } from "react";
import { Button } from "./button";
import { FaRegClock as Clock, FaCheck as Check } from "react-icons/fa6";
import { cn } from "../../utils/utility";

interface TimePickerProps {
  handleSetTime: (time: string) => void;
  selectedTime?: string;
  startTime?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  handleSetTime,
  selectedTime,
  startTime,
}) => {
  const [startSlotIndex, setStartSlotIndex] = useState(0);
  const [startTimeIndex, setStartTimeIndex] = useState(0);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Generate times with 30-minute intervals (24-hour format)
  // const generateTimeSlots = () => {
  //   const times = [];
  //   for (let hours = 0; hours < 24; hours++) {
  //     for (let minutes = 0; minutes < 60; minutes += 30) {
  //       const hoursStr = hours.toString().padStart(2, "0");
  //       const minutesStr = minutes.toString().padStart(2, "0");
  //       times.push(`${hoursStr}:${minutesStr}`);
  //     }
  //   }
  //   return times;
  // };

  // Format time for display (12-hour format)
  const formatTimeFor12Hour = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hoursNum = parseInt(hours);
    const period = hoursNum >= 12 ? "PM" : "AM";
    const hours12 = hoursNum % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  // const timeSlots = generateTimeSlots();

  // Group times by AM/PM
  // const groupedTimeSlots = timeSlots.reduce((acc, time) => {
  //   const period = parseInt(time.split(":")[0]) >= 12 ? "PM" : "AM";
  //   if (!acc[period]) acc[period] = [];
  //   acc[period].push(time);
  //   return acc;
  // }, {} as { [key: string]: string[] });

  const groupedTimeSlots = {
    AM: [
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
    ],
    PM: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
    ],
  };

  if (startTime) {
    const splittedTime = startTime.split(" ");
    // console.log()
    const startTimeToCompare =
      splittedTime[0].length == 4 ? `0${splittedTime[0]}` : splittedTime[0];
    // if(splittedTime[0].length == 4){
    //   splittedTime[0]=`0${splittedTime[0]}`
    // }
    Object.entries(groupedTimeSlots).forEach(([period, times], key) => {
      if (period == splittedTime[1]) {
        if (startSlotIndex != key) {
          setStartSlotIndex(key);
        }
        console.log("the index matches man");
        times.forEach((time, index) => {
          console.log(time == startTimeToCompare, `${time} ${splittedTime[0]}`);
          if (
            time === startTimeToCompare &&
            startSlotIndex == key &&
            startTimeIndex != index
          ) {
            setStartTimeIndex(index);
          }
        });
      }
    });
    console.log("hey we got a start time here man", startTime);
  }
  const handleSelectedTime = (time: string) => {
    const formattedTime = formatTimeFor12Hour(time);
    handleSetTime(formattedTime);
  };

  return (
    <div className="w-72 rounded-md bg-[#eeeded] overflow-hidden text-black">
      {/* Header */}
      <div className="p-4 bg-[#9EDD45]">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-white" />
          <span className="text-lg font-semibold text-white">Select Time</span>
        </div>
      </div>

      {/* Time slots */}
      <div className="h-80 overflow-y-auto">
        <div className="p-2">
          {Object.entries(groupedTimeSlots).map(([period, times], index) => (
            <div key={period} className="mb-4">
              {index >= startSlotIndex && (
                <>
                  <div className="px-3 py-2 text-sm font-semibold text-gray-700">
                    {period}
                  </div>
                  <div className="space-y-1">
                    {times.map((time, timeIndex) => {
                      const isSelected = selectedTime === time;
                      const isHovered = hoveredTime === time;
                      return (
                        <>
                          {timeIndex >= startTimeIndex && (
                            <Button
                              key={time}
                              variant="ghost"
                              className={cn(
                                "w-full justify-between text-left py-3 px-4 rounded-lg transition-all duration-200",
                                "hover:bg-white hover:text-[#9EDD45]",
                                isSelected &&
                                  "bg-white font-bold text-[#9EDD45] hover:bg-blue-100",
                                "group relative",
                              )}
                              onClick={handleSelectedTime.bind(null, time)}
                              onMouseEnter={() => setHoveredTime(time)}
                              onMouseLeave={() => setHoveredTime(null)}
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
                                    isSelected
                                      ? "text-[#9EDD45]"
                                      : "text-gray-600",
                                  )}
                                />
                              </div>
                            </Button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
