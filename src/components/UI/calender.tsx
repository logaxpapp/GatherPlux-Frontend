import * as React from "react";
import { isAfter, startOfToday } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      disabled={[
        { before: startOfToday() }
      ]}
      mode="single"
      showOutsideDays={showOutsideDays}
      className="p-4 bg-[#eeeded] text-[#000] rounded-md"
      {...props}
      modifiers={{
        currentDayAndFuture: (day) => isAfter(day, startOfToday())
      }}
      modifiersClassNames={{
        currentDayAndFuture: 'text-gray-700 font-bold'
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };