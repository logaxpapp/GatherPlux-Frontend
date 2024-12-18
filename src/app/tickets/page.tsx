"use client"; // Client Component

import React, { useState } from "react";
import TicketPage from "./components/TicketPage";
import LocationComponent from "./components/LocationComponent";
import EventDescription from "./components/EventDescription";
import OtherEvents from "./components/OtherEvents";
import AttendeeDetails from "@/components/modal/AttendeeDetails";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-[#020e1e] min-h-screen px-4 py-8 text-white">
      {/* Pass the toggleModal function to TicketPage */}
      <TicketPage onOpenModal={toggleModal} />
      <LocationComponent />
      <EventDescription />
      <OtherEvents />

      {/* Render AttendeeDetails Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AttendeeDetails />
          <button
            onClick={toggleModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
