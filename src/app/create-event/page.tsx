"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";

import ProgressBar from "./components/ProgressBar.component";
import EventDetails from "./components/EventDetails.component";
import EventBanner from "./components/EventBanner.component";
import EventTickets from "./components/EventTickets.component";
import PreviewEvent from "./components/PreviewEvent.component";

import { CombinedStateAndCategoryProps } from "./types/types";
import { useGetAllCategoriesQuery } from "@/services/slices/category.slice";
import {
  useGetAllCountriesQuery,
  useLazyGetAllStatesQuery,
} from "@/services/slices/state.slice";
import { useCreateEventMutation } from "@/services/slices/events.slice";

export interface SessionsProps {
  id: string;
  name?: string;
  startDate: Date | undefined;
  startTime: string;
  endTime: string;
}

export interface TicketEntry {
  id: string;
  name: string;
  price: string;
  people: number;
}

export interface EventDetailsProps {
  title: string;
  category: CombinedStateAndCategoryProps | undefined;
  type: string;
  state: CombinedStateAndCategoryProps | undefined;
  address: string;
  description: string;
}

export default function CreateEvent() {
  const router = useRouter();

  const [formStep, setFormStep] = useState(1);

  const [categories, setCategories] = useState<CombinedStateAndCategoryProps[]>(
    [],
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState<CombinedStateAndCategoryProps[]>([]);
  const [city, setCity] = useState("");

  const { data: categoriesData } = useGetAllCategoriesQuery("");
  const { data: allCountries } = useGetAllCountriesQuery("");
  const [createEvent] = useCreateEventMutation();
  const [getAllStates] = useLazyGetAllStatesQuery();

  useEffect(() => {
    // fetch categories
    if (categoriesData && categoriesData.body) {
      setCategories(categoriesData.body);
    }

    if (allCountries && allCountries.body) {
      setCountries(allCountries.body);
    }
    // fetch states
  }, [allCountries, categoriesData]);

  const [eventDetails, setEventDetails] = useState<EventDetailsProps>({
    title: "",
    category: undefined,
    type: "one-time",
    address: "",
    state: undefined,
    description: "",
  });

  const handleTitleAndDescriptionAndAddress = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const parsedData = JSON.parse(event.target.value);
    const { id } = parsedData;
    if (id) {
      setEventDetails({ ...eventDetails, category: id });
    }
  };

  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setEventDetails({ ...eventDetails, type: value });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedData = JSON.parse(event.target.value);
    const { code2 } = parsedData;

    const fetchStates = async () => {
      const response = await getAllStates(code2);
      if (response.data) {
        setStates(response.data.body);
      }
    };

    if (code2) {
      fetchStates();
    }
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedData = JSON.parse(event.target.value);
    const { id } = parsedData;
    if (id) {
      setEventDetails({ ...eventDetails, state: id });
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCity(value);
  };

  // sessions
  const [sessions, setSessions] = useState<SessionsProps[]>([
    {
      id: uuid(),
      startDate: undefined,
      startTime: "",
      endTime: "",
    },
  ]);
  const [isMultipleSession, setIsMultipleSession] = useState(false);

  const handleSessionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setIsMultipleSession(value === "multiple");
  };

  const handleAddSession = () => {
    setSessions([
      ...sessions,
      { id: uuid(), startDate: undefined, startTime: "", endTime: "" },
    ]);
  };

  const handleDeleteSession = (id: string) => {
    const updatedSessions = sessions.filter((session) => session.id !== id);
    setSessions(updatedSessions);
  };

  const handleStartDateChange = (date: Date | undefined, id: string) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === id) {
        return { ...session, startDate: date };
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

  // file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedBanner, setUploadedBanner] = useState<string | null>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file type
      const validTypes = ["image/jpeg", "image/gif", "image/png"];
      if (!validTypes.includes(file.type)) {
        console.error(
          "Invalid file type. Please upload JPG, GIF, or PNG files only.",
        );
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 1170 || img.height < 504) {
          console.error(
            "Image must be at least 1170 pixels wide by 504 pixels high.",
          );
          return;
        }
      };
      setSelectedFile(file);
      const formData = new FormData();
      formData.append("files", file);

      // Had to upload file with axios, was getting error in the fileUploads.slice.ts
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (response.data.body.length > 0) {
          setUploadedBanner(response.data.body[0].secure_url);
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // tickets
  const [eventType, setEventType] = useState<string>("ticketed");
  const [tickets, setTickets] = useState<TicketEntry[]>([
    { id: uuid(), name: "", price: "0.00", people: 1 },
  ]);
  const [numberOfTickets, setNumberOfTickets] = useState<number | "">("");

  const addTicketEntry = () => {
    setTickets([
      ...tickets,
      { id: uuid(), name: "", price: "0.00", people: 1 },
    ]);
  };

  const deleteTicketEntry = (id: string) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
  };

  const updateTicket = (
    id: string,
    field: "name" | "price" | "people",
    value: string,
  ) => {
    setTickets(
      tickets.map((ticket) => {
        if (ticket.id === id) {
          return { ...ticket, [field]: value };
        }
        return ticket;
      }),
    );
  };

  const handleEventTypeOnTicket = (value: string) => {
    setEventType(value);
  };

  const handleNumberOfTickets = (value: number | "") => {
    setNumberOfTickets(value);
  };

  const handleSaveAndContinue = () => {
    if (formStep === 1) {
      if (
        eventDetails.title === "" ||
        eventDetails.category === undefined ||
        eventDetails.type === "" ||
        sessions.length === 0 ||
        eventDetails.state === undefined ||
        eventDetails.description === ""
      ) {
        console.log("fill all input fields");
        return;
      }
    } else if (formStep === 2) {
      if (!selectedFile) {
        console.log("select a file");
        return;
      }
    } else if (formStep === 3) {
      if (
        eventType === "ticketed" &&
        tickets.some((ticket) => ticket.name === "" || ticket.price === "0.00")
      ) {
        console.log("fill all ticket fields");
        return;
      }
    }
    setFormStep((prev) => prev + 1);
  };

  const handleGoBack = () => {
    setFormStep((prev) => prev - 1);
  };

  const handleCreateEvent = async () => {
    const newEvent = {
      title: eventDetails.title,
      category_id: eventDetails.category,
      state_id: eventDetails.state,
      address: eventDetails.address,
      city: city,
      description: eventDetails.description,
      images: [uploadedBanner],
      ticketed: eventType === "ticketed",
      tickets:
        eventType === "ticketed"
          ? tickets.map((ticket) => ({
              name: ticket.name,
              price: ticket.price,
            }))
          : [],
      sessions: sessions.map((session) => ({
        date: session.startDate,
        start_time: session.startTime,
        end_time: session.endTime,
      })),
    };
    const response = await createEvent(newEvent);
    if (response.data) {
      router.push("/");
    }

    if ("error" in response) {
      console.log(response.error);
    }
  };

  return (
    <div className="py-32 px-10 bg-[#020e1e]">
      <div className="flex items-center space-x-10">
        <FaArrowLeftLong className="text-[38px] cursor-pointer" />
        <h2 className=" text-[18px] sm:text-[38px] font-bold">
          Create a New Event
        </h2>
      </div>
      <ProgressBar currentStep={formStep} />

      {formStep === 1 && (
        <div className="animate-fadeIn">
          <EventDetails
            handleTitleAndDescriptionAndAddress={
              handleTitleAndDescriptionAndAddress
            }
            categories={categories}
            countries={countries}
            states={states}
            handleCategoryChange={handleCategoryChange}
            handleEventTypeChange={handleEventTypeChange}
            sessions={sessions}
            isMultipleSession={isMultipleSession}
            handleSessionTypeChange={handleSessionTypeChange}
            handleStartDateChange={handleStartDateChange}
            handleTimeChange={handleTimeChange}
            handleSessionEditName={handleSessionEditName}
            handleAddSession={handleAddSession}
            handleDeleteSession={handleDeleteSession}
            handleCountryChange={handleCountryChange}
            handleStateChange={handleStateChange}
            handleCityChange={handleCityChange}
            eventDetails={eventDetails}
          />
        </div>
      )}

      {formStep === 2 && (
        <div className="animate-slideIn">
          <EventBanner
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
          />
        </div>
      )}

      {formStep === 3 && (
        <div className="animate-slideIn">
          <EventTickets
            eventType={eventType}
            handleEventTypeOnTicket={handleEventTypeOnTicket}
            tickets={tickets}
            updateTicket={updateTicket}
            addTicketEntry={addTicketEntry}
            handleNumberOfTickets={handleNumberOfTickets}
            numberOfTickets={numberOfTickets}
            deleteTicketEntry={deleteTicketEntry}
          />
        </div>
      )}

      {formStep === 4 && (
        <div className="animate-fadeIn">
          <PreviewEvent
            uploadedBanner={uploadedBanner}
            eventDetails={eventDetails}
            sessions={sessions}
            tickets={tickets}
            numberOfTickets={numberOfTickets}
            eventType={eventType}
            isMultipleSession={isMultipleSession}
          />
        </div>
      )}

      <div className="flex flex-wrap justify-between mt-20 mx-10 space-y-4 sm:space-y-0">
        {/* Go Back Button */}
        {formStep > 1 && formStep < 4 && (
          <div className="whitespace-nowrap w-full sm:w-auto sm:ml-10">
            <button
              type="button"
              className="border-none sm:mr-8 w-full sm:w-auto text-center"
              onClick={handleGoBack}
            >
              {formStep === 2 ? "Go back to Edit Event" : "Go back"}
            </button>
          </div>
        )}

        {/* Save & Continue Button */}
        {formStep !== 4 && (
          <div className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-60 h-[36px] bg-[#9EDD45] text-black rounded-full whitespace-nowrap px-2"
              onClick={handleSaveAndContinue}
            >
              Save & Continue
            </button>
          </div>
        )}

        {/* Final Step Buttons */}
        {formStep === 4 && (
          <div className="flex justify-between w-full sm:w-auto space-x-4">
            <button
              type="button"
              className="bg-gray-600 px-4 py-2 rounded-md text-white w-full sm:w-auto"
            >
              Save for Later
            </button>
            <button
              type="button"
              onClick={handleCreateEvent}
              className="bg-[#9EDD45] text-black px-4 py-2 rounded-md font-bold w-full sm:w-auto"
            >
              Publish Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
