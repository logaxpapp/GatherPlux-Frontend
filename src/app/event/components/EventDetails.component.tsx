import { useGetAllCategoriesQuery } from "@/services/slices/category.slice";
import {
  useGetAllCountriesQuery,
  useLazyGetAllStatesQuery,
} from "@/services/slices/state.slice";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { SessionsProps } from "../types/types";
import { CiCirclePlus, CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import CustomCalendar from "@/components/CustomCalender";
import CustomTimePicker from "@/components/CustomTimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEventFields,
  updateEditedEvent,
} from "@/store/slices/event.slice";
import { RootState } from "@/store/store";

interface IEventDetailsProps {
  handleNextStep: () => void;
  path: string;
}

const EventDetails = ({ handleNextStep, path }: IEventDetailsProps) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [eventType, setEventType] = useState("single");
  const [isMultipleSession, setIsMultipleSession] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [categories, setCategories] = useState([]);
  const [sessions, setSessions] = useState<SessionsProps[]>([
    {
      id: uuid(),
      date: undefined,
      start_time: "",
      end_time: "",
    },
  ]);
  const [editingId, setEditingId] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const eventToEditDetails = useSelector(
    (state: RootState) => state.event.eventToEdit,
  );

  const editedEvent = useSelector(
    (state: RootState) => state.event.editedEvent,
  );

  const { data: categoriesData } = useGetAllCategoriesQuery("");
  const { data: allCountries } = useGetAllCountriesQuery("");
  const [getAllStates] = useLazyGetAllStatesQuery();

  useEffect(() => {
    if (categoriesData && categoriesData.body) {
      setCategories(categoriesData.body);
    }

    if (allCountries && allCountries.body) {
      setCountries(allCountries.body);
    }
  }, [allCountries, categoriesData]);

  useEffect(() => {
    const fetchStates = async (code2: string) => {
      const response = await getAllStates(code2);
      if (response.data) {
        setStates(response.data.body);
      }
    };

    // Create Event
    const savedEventDetails = localStorage.getItem("eventDetails");
    if (path === "create" && savedEventDetails) {
      const parsedData = JSON.parse(savedEventDetails);
      setTitle(parsedData.title || "");
      setSelectedCategory(parsedData.category_id || "");
      setEventType(parsedData.event_type || "single");
      setIsMultipleSession(parsedData.sessions.length > 1 || false);
      setSelectedCountry(parsedData.country || "");
      setSelectedState(parsedData.state_id || "");
      setDescription(parsedData.description || "");
      setCity(parsedData.city || "");
      setAddress(parsedData.address || "");
      setSessions(parsedData.sessions || []);

      fetchStates(parsedData.country);
    }

    // Edit Event
    if (path === "edit" && eventToEditDetails) {
      setTitle(eventToEditDetails.title || "");
      setSelectedCategory(eventToEditDetails.category_id || "");
      setEventType(eventToEditDetails.event_type || "single");
      setIsMultipleSession(eventToEditDetails.sessions.length > 1 || false);
      setSelectedCountry(eventToEditDetails.country || "AU");
      setSelectedState(eventToEditDetails.state_id || "");
      setDescription(eventToEditDetails.description || "");
      setCity(eventToEditDetails.city || "");
      setAddress(eventToEditDetails.address || "");
      setSessions(eventToEditDetails.sessions || []);

      fetchStates(eventToEditDetails.country || "AU");
    }
  }, [getAllStates, path, eventToEditDetails]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEventType(value);
  };

  const handleSessionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setIsMultipleSession(value === "multiple");
  };

  const handleAddSession = () => {
    setSessions([
      ...sessions,
      { id: uuid(), date: undefined, start_time: "", end_time: "" },
    ]);
  };

  const handleSessionEditName = (id: string, name: string) => {
    setSessions(
      sessions.map((session) => {
        if (session.id === id) {
          return { ...session, name };
        }
        return session;
      }),
    );
  };

  const handleSaveSessionName = () => {
    if (!sessionName) return;

    handleSessionEditName(editingId, sessionName);
    setEditingId("");
    setSessionName("");
  };

  const handleDeleteSession = (id: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    setSessions(updatedSessions);
  };

  const handleSessionNameEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSessionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionName(e.target.value);
  };

  const handleStartDateChange = (date: Date | undefined, id: string) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === id) {
        return { ...session, date };
      }
      return session;
    });

    setSessions(updatedSessions);
  };

  const handleTimeChange = (
    time: string | undefined,
    id: string | undefined,
    type: string,
  ) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === id) {
        return { ...session, [type]: time };
      }
      return session;
    });

    setSessions(updatedSessions);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code2 = event.target.value;

    const fetchStates = async () => {
      const response = await getAllStates(code2);
      if (response.data) {
        setStates(response.data.body);
      }
    };

    if (code2) {
      fetchStates();
      setSelectedCountry(code2);
    }
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSaveAndContinue = () => {
    if (
      !title ||
      !description ||
      !city ||
      !address ||
      !selectedCategory ||
      !selectedCountry ||
      !selectedState
    ) {
      toast.info("Please fill in all required fields", {
        position: "top-right",
      });
      return;
    }

    const eventDetails = {
      id: eventToEditDetails.id || "",
      title,
      category_id: selectedCategory,
      event_type: eventType,
      country: selectedCountry,
      state_id: selectedState,
      description,
      city,
      address,
      sessions,
    };

    if (path === "create") {
      localStorage.setItem("eventDetails", JSON.stringify(eventDetails));
      dispatch(addNewEventFields(eventDetails));
    }

    if (path === "edit") {
      if (editedEvent.length < 1) dispatch(updateEditedEvent(eventDetails));
    }
    handleNextStep();
  };

  return (
    <div className="flex flex-col px-4 md:px-8 lg:px-20 w-full space-y-4 bg-[#020e1e]">
      <div className="grid  pb-2  ">
        <div className="col-span-2"></div>
        <h3 className="font-[400] text-[20px] col-span-8 ">Event Details</h3>
      </div>
      {/* Event Title */}
      <div className="mb-4">
        <label className="block text-[15px] font-medium">
          Event Title <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter the name of your event"
          name="title"
          value={title}
          onChange={handleTitleChange}
          className="h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] mt-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]"
        />
      </div>

      {/* Event Category */}
      <div className="mb-4">
        <label className="block text-[15px] font-medium" htmlFor="category">
          Event Category <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="category"
          className="h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] appearance-none mt-2 w-full max-w-[500px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "1em",
          }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Please select one
          </option>
          {categories?.map((eachCategory: { id: string; name: string }) => (
            <option
              value={eachCategory.id}
              key={eachCategory.id}
              className="text-[#fff]"
            >
              {eachCategory.name}
            </option>
          ))}
        </select>
      </div>

      {/* Event Type */}

      <div className="mb-4">
        <label className="block text-[15px] font-medium">
          Event Type <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="flex items-center space-x-4 mt-2 text-sm sm:text-lg">
          <label className="flex items-center text-[#fff]">
            <input
              type="radio"
              name="eventType"
              value="single"
              className="mr-2 h-4 w-4 text-[#9edd45] border-[#2d3744] focus:ring-[#9edd45]"
              onChange={handleEventTypeChange}
              defaultChecked={eventType === "single"}
            />
            Single Event
          </label>
          <label className="flex items-center text-[#fff]">
            <input
              type="radio"
              name="eventType"
              value="recurring"
              className="mr-2 h-4 w-4 text-[#9edd45] border-[#2d3744] focus:ring-[#9edd45]"
              onChange={handleEventTypeChange}
              defaultChecked={eventType === "recurring"}
            />
            Recurring Event
          </label>
        </div>
      </div>

      <div className="pb-6 pt-12">
        {/* Border Line */}
        <div className="border-b border-gray-700 mb-6"></div>

        {/* Session Title */}
        <h3 className="font-semibold text-[24px] mb-6">Session(s)</h3>

        {/* Session Type */}
        <div className="mb-8">
          <label className="block text-sm text-gray-400 mb-2">
            Session Type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x- mt-2 text-sm sm:text-lg">
            {/* Single Session */}
            <label className="flex items-center text-[18px] text-white text-sm   sm:text-lg pr-2 whitespace-nowrap">
              <input
                type="radio"
                name="sessionType"
                value="single"
                className="mr-2 h-4 w-4 text-[#9edd45] border-gray-600 focus:ring-[#9edd45]"
                onChange={handleSessionTypeChange}
                defaultChecked={!isMultipleSession}
              />
              Single Session
            </label>
            {/* Multiple Session */}
            <div className="w-[200px]">
              <label className="flex items-center text-[18px] text-white text-sm sm:text-lg whitespace-nowrap">
                <input
                  type="radio"
                  name="sessionType"
                  value="multiple"
                  className="mr-2 h-4 w-4 text-[#9edd45] border-gray-600 focus:ring-[#9edd45]"
                  onChange={handleSessionTypeChange}
                  defaultChecked={isMultipleSession}
                />
                Multiple Session
              </label>
            </div>
          </div>

          {/* Session Input Fields */}
          <div className="space-y-6 mt-6">
            {sessions.map((session: SessionsProps, index) => (
              <div
                key={session.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
              >
                {/* Session Name (only for multiple sessions) */}
                {isMultipleSession && (
                  <div className="col-span-1 md:col-span-12 mb-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {editingId !== session.id && (
                        <>
                          <h2 className="text-lg text-white font-semibold">
                            {session.name || `Session ${index + 1}`}
                          </h2>
                          <button
                            type="button"
                            className="text-[#9edd45] border border-[#9edd45] px-2 py-1 rounded text-sm hover:bg-[#76b434] hover:text-white transition"
                            onClick={() => handleSessionNameEdit(session.id)}
                          >
                            ✏️ edit name
                          </button>
                        </>
                      )}
                      {editingId === session.id && (
                        <>
                          <input
                            type="text"
                            placeholder="Enter session name"
                            className="h-[44px] px-4 py-2 rounded-md text-[#fff] bg-[#1b2634] border border-[#2d3744] mt-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-[#2d3744]"
                            onChange={handleSessionNameChange}
                          />
                          <button
                            type="button"
                            className="text-[#9edd45] border border-[#9edd45] px-2 py-1 rounded text-sm hover:bg-[#76b434] hover:text-white transition"
                            onClick={handleSaveSessionName}
                          >
                            save name
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Start Date */}
                <div className="col-span-1 md:col-span-4">
                  <label className="block text-sm text-gray-400 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CustomCalendar
                      handleStartDateChange={handleStartDateChange}
                      id={session.id}
                      givenDate={session.date}
                    />
                  </div>
                </div>

                {/* Start Time */}
                <div className="col-span-1 md:col-span-3">
                  <label className="block text-sm text-gray-400 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CustomTimePicker
                      handleTimeChange={handleTimeChange}
                      id={session.id}
                      type="start_time"
                      givenStartTime={session.start_time}
                    />
                  </div>
                </div>

                {/* End Time */}
                <div className="col-span-1 md:col-span-3">
                  <label className="block text-sm text-gray-400 mb-2">
                    End Time
                  </label>
                  <div className="relative">
                    <CustomTimePicker
                      handleTimeChange={handleTimeChange}
                      id={session.id}
                      type="end_time"
                      startTime={session.start_time}
                      givenEndTime={session.end_time}
                    />
                  </div>
                </div>

                {/* Add/Delete Session Button */}
                <div className="col-span-1 md:col-span-2 flex justify-end">
                  {index < 1 && isMultipleSession ? (
                    <button
                      title={""}
                      type="button"
                      className="text-[#9edd45] text-[24px] hover:text-[#76b434] transition"
                      onClick={handleAddSession}
                    >
                      <CiCirclePlus />
                    </button>
                  ) : index >= 1 ? (
                    <button
                      title={""}
                      type="button"
                      className="text-[#f00] text-[24px] hover:text-[#f00] transition"
                      onClick={() => handleDeleteSession(session.id)}
                    >
                      <CiTrash />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOCATION */}
        <div className="pb-6 pt-12">
          {/* Border Line */}
          <div className="border-b border-gray-700 mb-6"></div>

          {/* Location Heading */}
          <h3 className="font-semibold text-[24px] mb-4">Location</h3>

          {/* Event Country */}
          <div className="grid grid-cols-12 gap-4 items-center my-8">
            {/* Select Box with Inline Label */}
            <div className="col-span-8 relative">
              <label
                htmlFor="location"
                className="absolute -top-3 left-4 bg-gray-900 text-[10px] sm:text-[14px]  text-gray-400 px-1"
              >
                The Country where your event will take place?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                className="w-full bg-gray-800 text-white px-4 py-3 pr-10 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9edd45] appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1em",
                }}
                onChange={handleCountryChange}
                value={selectedCountry}
              >
                <option value="" disabled>
                  Please select one
                </option>
                {countries?.map(
                  (eachCountry: { name: string; code2: string }) => (
                    <option value={eachCountry.code2} key={eachCountry.code2}>
                      {eachCountry.name}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          {/* Event State */}
          {states.length > 0 && (
            <div className="grid grid-cols-12 gap-4 items-center my-8">
              {/* Select Box with Inline Label */}
              <div className="col-span-8 relative">
                <label
                  htmlFor="location"
                  className="absolute -top-3 left-4 bg-gray-900  text-gray-400 px-1     text-[10px] sm:text-[14px]"
                >
                  The State where your event will take place?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="location"
                  className="w-full bg-gray-800 text-white px-4 py-3 pr-10 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#9edd45] appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M10 12l-5-5h10l-5 5z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                  }}
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="" disabled>
                    Please select one
                  </option>
                  {states?.map((eachState: { id: number; name: string }) => (
                    <option value={eachState.id} key={eachState.id}>
                      {eachState.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Event City */}
          <div className="grid grid-cols-12 gap-4 items-center my-8">
            <div className="col-span-10 relative">
              {" "}
              <label
                htmlFor="address"
                className="absolute -top-3 left-4 bg-gray-900  text-gray-400 px-1  text-[10px] sm:text-[14px]"
              >
                The City where your event will take place{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleCityChange}
                placeholder="City of the event's location"
                className="w-full bg-gray-800   px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#9edd45]"
              ></input>
            </div>
          </div>

          {/* Event Address */}
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-10 relative">
              {" "}
              <label
                htmlFor="address"
                className="absolute -top-3 left-4 bg-gray-900  text-gray-400 px-1 text-[10px] sm:text-[14px]"
              >
                Event Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleAddressChange}
                placeholder="Address of the event's location"
                className="w-full bg-gray-800  px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#9edd45]"
              ></input>
            </div>
          </div>

          {/* Thin Separator Line */}
          <div className="border-t border-gray-700 mb-6"></div>

          {/* Additional Information */}
          <h3 className="font-semibold sm:text-[24px] mb-4 whitespace-nowrap">
            Additional Information
          </h3>
          {/* Event Description */}
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Textarea with Inline Label */}
            <div className="col-span-10 relative">
              {" "}
              {/* Increased col-span from 8 to 10 */}
              <label
                htmlFor="description"
                className="absolute -top-3 left-4 bg-gray-900 text-[14px] text-gray-400 px-1"
              >
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                rows={8}
                placeholder="Describe what's special about your event & other important details."
                className="w-full bg-gray-800 text-white px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-[#9edd45]"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <button
          type="button"
          className="w-full sm:w-60 h-[36px] bg-[#9EDD45] text-black rounded-full whitespace-nowrap px-2"
          onClick={handleSaveAndContinue}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
