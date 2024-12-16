"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

import ProgressBar from "./components/ProgressBar.component";
import EventDetails from "./components/EventDetails.component";
import EventBanner from "./components/EventBanner.component";
import EventTickets from "./components/EventTickets.component";
import PreviewEvent from "./components/PreviewEvent.component";

import { combinedStateAndCategoryProps } from "./types/types";
import { useGetAllCategoriesQuery } from "@/services/slices/category.slice";
import { useGetAllStatesQuery } from "@/services/slices/state.slice";

interface SessionsProps {
  id: string;
  startDate: Date | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

interface TicketEntry {
  id: string;
  name: string;
  price: string;
}

export interface EventDetailsProps {
  title: string;
  category: combinedStateAndCategoryProps | undefined;
  type: string;
  state: combinedStateAndCategoryProps | undefined;
  description: string;
}

export default function CreateEvent() {

  const [formStep, setFormStep] = useState(1);

  const [categories, setCategories] = useState<combinedStateAndCategoryProps[]>([]);
  const [states, setStates] = useState<combinedStateAndCategoryProps[]>([]);

  const { data: categoriesData } = useGetAllCategoriesQuery('');
  const { data: allStates } = useGetAllStatesQuery('AG');

  useEffect(() => {
    // fetch categories
    if (categoriesData && categoriesData.body) {
      setCategories(categoriesData.body);
    }

    if (allStates && allStates.body) {
      setStates(allStates.body);
    }
    // fetch states
  }, [allStates, categoriesData]);

  const [eventDetails, setEventDetails] = useState<EventDetailsProps>({
    title: "",
    category: undefined,
    type: "One-Time",
    state: undefined,
    description: "",
  });

  const handleTitleAndDescription = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedData = JSON.parse(event.target.value);
    const { id } = parsedData;
    if (id) {
      setEventDetails({ ...eventDetails, category: id });
    }
  };

  const handleEventTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEventDetails({ ...eventDetails, type: value });
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedData = JSON.parse(event.target.value);
    const { id } = parsedData;
    if (id) {
      setEventDetails({ ...eventDetails, state: id });
    }
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

  const handleAddSession = () => {
    setSessions([...sessions, { id: uuid(), startDate: undefined, startTime: "", endTime: "" }]);
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

  const handleTimeChange = (time: string | undefined, id: string | undefined, type: string) => {
    const updatedSessions = sessions.map((session) => {
      if (session.id === id) {
        return { ...session, [type]: time };
      }
      return session;
    });

    setSessions(updatedSessions);
  };


  // file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedBanner, setUploadedBanner] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file type
      const validTypes = ['image/jpeg', 'image/gif', 'image/png'];
      if (!validTypes.includes(file.type)) {
        console.error('Invalid file type. Please upload JPG, GIF, or PNG files only.');
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 1170 || img.height < 504) {
          console.error('Image must be at least 1170 pixels wide by 504 pixels high.');
          return;
        }
      };
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('files', file);

      // Had to upload file with axios, was getting error in the fileUploads.slice.ts
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.body.length > 0) {
          setUploadedBanner(response.data.body[0].secure_url);
        } else {
          console.error('Error uploading file');
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  // tickets
  const [eventType, setEventType] = useState<string>('ticketed');
  const [tickets, setTickets] = useState<TicketEntry[]>([
    { id: uuid(), name: '', price: '0.00' }
  ]);

  const addTicketEntry = () => {
    setTickets([...tickets, { id: uuid(), name: '', price: '0.00' }]);
  };

  const updateTicket = (id: string, field: 'name' | 'price', value: string) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    }));
  };

  const handleEventTypeOnTicket = (value: string) => {
    setEventType(value);
  };


  const handleSaveAndContinue = () => {
    if (formStep === 1) {
      if (eventDetails.title === "" || eventDetails.category === undefined || eventDetails.type === "" || sessions.length === 0 || eventDetails.state === undefined || eventDetails.description === "") {
        console.log('fill all input fields');
        console.log(eventDetails, sessions);
        return;
      }

    } else if (formStep === 2) {
      if (!selectedFile) {
        console.log('select a file');
        return;
      }

    } else if (formStep === 3) {
      if (eventType === 'ticketed' && tickets.some(ticket => ticket.name === '' || ticket.price === '0.00')) {
        console.log('fill all ticket fields');
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
      city: eventDetails.state?.name,
      description: eventDetails.description,
      images: [uploadedBanner],
      ticketed: eventType === 'ticketed',
      tickets: eventType === 'ticketed' ? tickets.map(ticket => ({ name: ticket.name, price: ticket.price })) : [],
      sessions: sessions.map(session => ({
        date: session.startDate,
        start_time: session.startTime,
        end_time: session.endTime,
      })),
    };
    console.log(newEvent);
    // const response = await createEvent(newEvent);
    // if (response.data) {
    //   console.log(response.data);
    // }

    // if ('error' in response) {
    //   console.log(response.error);
    // }
  };


  return (
    <div className="py-32 px-10 bg-[#020e1e]">
      <div className="flex items-center space-x-10">
        <FaArrowLeftLong className="text-[38px] cursor-pointer" />
        <h2 className="text-[38px] font-bold">Create a New Event</h2>
      </div>
      <ProgressBar currentStep={formStep} />

      {formStep === 1 && (
        <div className="animate-fadeIn">
          <EventDetails handleTitleAndDescription={handleTitleAndDescription} categories={categories} states={states} handleCategoryChange={handleCategoryChange} handleEventTypeChange={handleEventTypeChange} sessions={sessions} handleStartDateChange={handleStartDateChange} handleTimeChange={handleTimeChange} handleAddSession={handleAddSession} handleLocationChange={handleLocationChange} />
        </div>
      )}

      {
        formStep === 2 && (
          <div className="animate-slideIn">
            <EventBanner fileInputRef={fileInputRef} handleFileChange={handleFileChange} selectedFile={selectedFile} />
          </div>
        )}

      {
        formStep === 3 && (
          <div className="animate-slideIn">
            <EventTickets eventType={eventType} handleEventTypeOnTicket={handleEventTypeOnTicket} tickets={tickets} updateTicket={updateTicket} addTicketEntry={addTicketEntry} />
          </div>
        )}

      {formStep === 4 && (
        <div className="animate-fadeIn">
          <PreviewEvent selectedFile={selectedFile} eventDetails={eventDetails} handleCreateEvent={handleCreateEvent} />
        </div>
      )}

      <div className="flex justify-between mt-20 mx-20">
        {formStep > 1 && formStep < 4 && (
          <button type="button" className="border-none mr-8" onClick={handleGoBack}>
            {formStep === 2 ? 'Go back to Edit Event' : 'Go back'}
          </button>
        )}

        {formStep !== 4 && (
          <button type="button" className="w-60 h-[42px] bg-[#9EDD45] text-black rounded-full" onClick={handleSaveAndContinue}>
            Save & Continue
          </button>
        )}
      </div>
    </div>
  );
}