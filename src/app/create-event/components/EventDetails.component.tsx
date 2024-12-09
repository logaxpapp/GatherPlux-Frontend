import CustomCalendar from "@/components/CustomCalender";
import CustomTimePicker from "@/components/CustomTimePicker";
import { CiCirclePlus } from "react-icons/ci";
import { combinedStateAndCategoryProps } from "../types/types";

interface EventDetailsProps {
  handleTitleAndDescription: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  categories: combinedStateAndCategoryProps[];
  states: combinedStateAndCategoryProps[];
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleEventTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sessions: {
    id: string;
  }[];
  handleStartDateChange: (date: Date | undefined, id: string) => void;
  handleTimeChange: (time: string | undefined, id: string | undefined, type: string) => void;
  handleAddSession: () => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ handleTitleAndDescription, categories = [], states = [], handleCategoryChange, handleEventTypeChange, sessions, handleStartDateChange, handleTimeChange, handleAddSession, handleLocationChange }) => {
  return (
    <>
      {/* Event Details */}
      <div className="flex flex-col px-20 w-full space-y-4">
        <div className="grid grid-cols-12 pb-2">
          <div className="col-span-2"></div>
          <h3 className="font-[400] text-[40px] col-span-8 ml-4">Event Details</h3>
        </div>

        {/* Event Title  */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <p className="text-[24px] font-medium col-span-2 text-right">
            Event Title <span className=" text-red-500 ml-1">*</span>
          </p>

          <input type="text" placeholder="Enter the event name" name="title" className="col-span-6 ml-4 h-[58px] p-4 rounded-md text-[#000]" onChange={handleTitleAndDescription} />
        </div>

        {/* Event Category  */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <label className="text-[24px] font-medium col-span-2 text-right" htmlFor="category">
            Event Category <span className=" text-red-500 ml-1">*</span>
          </label>

          <select id="category" className="col-span-6 ml-4 h-[58px] p-4 rounded-md text-[#000] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "1em",
            }}
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" selected disabled>Please select one</option>
            {categories?.map((eachCategory) => (
              <option
                value={JSON.stringify(eachCategory)}
                key={eachCategory.id}
              >
                {eachCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-12 py-4">
          <div className="col-span-2"></div>
          <h3 className="font-[400] text-[40px] col-span-8 ml-4">Date & Time</h3>
        </div>

        {/* Event Type */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <p className="text-[24px] font-medium col-span-2 text-right">
            Event Type <span className=" text-red-500 ml-1">*</span>
          </p>
          <div className="col-span-8 ml-4 flex space-x-4">
            <div className="flex items-center space-x-2 text-[24px]">
              <input type="radio" id="single" name="type" value="One-Time" onChange={handleEventTypeChange} />
              <label htmlFor="single">Single Event</label>
            </div>
            <div className="flex items-center space-x-2 text-[24px]">
              <input type="radio" id="recurring" name="type" value="Recurring" onChange={handleEventTypeChange} />
              <label htmlFor="recurring">Recurring Event</label>
            </div>
          </div>
        </div>

        {/* Event session */}
        <div className="grid grid-cols-12 gap-2 items-center relative">
          <p className="text-[24px] font-medium col-span-2 text-right">
            Session(s) <span className=" text-red-500 ml-1">*</span>
          </p>
          <div className="col-span-8 ml-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex justify-between items-center space-x-4 py-4">
                <div>
                  <p className="text-xs pb-2">Start Date <span className=" text-red-500 ml-1">*</span></p>
                  <CustomCalendar handleStartDateChange={handleStartDateChange} id={session.id} />
                </div>
                <div>
                  <p className="text-xs pb-2">Start Time<span className=" text-red-500 ml-1">*</span></p>
                  <CustomTimePicker handleTimeChange={handleTimeChange} id={session.id} type="startTime" />
                </div>
                <div>
                  <p className="text-xs pb-2">End Time </p>
                  <CustomTimePicker handleTimeChange={handleTimeChange} id={session.id} type="endTime" />
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="absolute right-0 top-[10px] text-lg" onClick={handleAddSession}>
            {''}
            <CiCirclePlus />
          </button>
        </div>


        <div className="grid grid-cols-12 pt-4 pb-2">
          <div className="col-span-2"></div>
          <h3 className="font-[400] text-[40px] col-span-8 ml-4">Location</h3>
        </div>

        {/* Event Location */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <label className="text-[24px] font-medium col-span-2 text-right" htmlFor="location">
            Where will your
            <span className=" text-red-500 ml-2">*</span>
            <br />
            event take place?
          </label>
          <select id="location" className="col-span-6 ml-4 h-[58px] p-4 rounded-md text-[#000] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: "1em",
            }}
            onChange={handleLocationChange}
            defaultValue=""
          >
            <option value="" disabled>Please select one</option>
            {states?.map((eachState) => (
              <option
                value={JSON.stringify(eachState)}
                key={eachState.id}
              >
                {eachState.name}
              </option>
            ))}
          </select>
        </div>

        {/* Additional information */}
        <div className="grid grid-cols-12 pt-4 pb-2">
          <div className="col-span-2"></div>
          <h3 className="font-[400] text-[40px] col-span-8 ml-4">Additional Information</h3>
        </div>

        {/* Event Description  */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <label htmlFor="description" className="text-[24px] font-medium col-span-2 text-right h-full">
            Event Description <span className=" text-red-500 ml-1">*</span>
          </label>

          <textarea id="description" name="description" rows={4} placeholder="Describe what's special about your event & other important details." className="col-span-10 ml-4 p-4 rounded-md text-[#000]" onChange={handleTitleAndDescription} />
        </div>

      </div>
    </>
  );
};

export default EventDetails;