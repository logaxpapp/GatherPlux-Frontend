import React, { useState } from "react";
import Image from "next/image";
import { EventProps } from "@/app/homepage/EventCard";
import AttendeeDetails from "@/components/modal/AttendeeDetails";
import { toast } from "react-toastify";

// Define the prop types for the component
interface EventDescriptionProps {
  event: EventProps;
}

export interface TicketProps {
  id: number;
  name: string;
  price: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ event }) => {
  const [selectedTicket, setSelectedTicket] = useState<TicketProps>({
    id: -1,
    name: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketSelection = (ticket: TicketProps) => {
    setSelectedTicket(ticket);
  };

  const toggleModal = () => {
    if (selectedTicket.id === -1) {
      toast.info("Please select a ticket to proceed");
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  const formattedDate = new Date(event.start_date).toLocaleDateString("en-GB", {
    weekday: "long", // Full day of the week
    day: "numeric", // Numeric day of the month
    month: "long", // Full month name
    year: "numeric", // Full year
  });

  return (
    <div
      className="bg-[#020e1e] py-10 px-10 relative "
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.8,
      }}
    >
      {/* Image Section */}
      <div className="mb-8 flex justify-center mt-10">
        <Image
          height={400}
          width={600}
          src={event.images[0] || "/banner.png"}
          alt="Event Banner"
          className="rounded-lg"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Left Content */}
        <div>
          {/* Event Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Event Description</h2>
            <p>{event.description}</p>
          </div>
        </div>

        {/* Ticket Section */}
        <div className="bg-[#0b1a30] p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">Date and Time</h3>
          <div className="flex items-center text-sm text-gray-400 mb-2">
            {/* use react icons instead */}
            {/* <Image
              src="/calendar-icon.png"
              alt="Calendar"
              className="mr-2"
              width={16}
              height={16}
            /> */}
            {formattedDate !== "Invalid Date" && formattedDate}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            {/* <Image
              src="/clock-icon.png"
              alt="Clock"
              className="mr-2"
              width={16}
              height={16}
            /> */}
            <p>
              {event.sessions && event.sessions.length > 1 ? (
                event.sessions.map((session) => (
                  <span key={session.id}>
                    {session.start_time} - {session.end_time}
                  </span>
                ))
              ) : (
                <span>
                  {event.sessions[0].start_time} - {event.sessions[0].end_time}
                </span>
              )}
            </p>
          </div>
          {/* <button
            type="button"
            className="text-[#9edd45] text-sm font-medium mt-4"
          >
            + Add to Calendar
          </button> */}
          <hr className="my-4 border-gray-600" />

          <h3 className="text-lg font-bold text-white mb-4">
            Ticket Information
          </h3>
          <div className="space-y-4">
            {event.tickets && event.tickets.length > 0 ? (
              event.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-2">
                    {/* use react icon instead */}
                    {/* <Image
                      src="/ticket-icon.png" // Replace with actual ticket icon
                      alt="Ticket"
                      width={16}
                      height={16}
                    /> */}
                    <span className="type-medium">{ticket.name}</span>
                    <span> - </span>
                    <span className="text-sm text-gray-400">
                      ₦{Number(ticket.price).toLocaleString()} each
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTicketSelection(ticket)}
                    className={`${selectedTicket.id === ticket.id ? "" : "bg-[#9edd45] p-2"}`}
                    disabled={selectedTicket.id === ticket.id}
                  >
                    {selectedTicket.id === ticket.id ? "Selected" : "Select"}
                  </button>
                  {/* <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <span className="text-white">0</span>
                    <button
                      type="button"
                      className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded"
                    >
                      -
                    </button>
                  </div> */}
                </div>
              ))
            ) : (
              <p>Free event</p>
            )}
          </div>
          <hr className="my-4 border-gray-600" />
          {/* <div className="flex justify-between items-center text-white">
            <span>Total</span>
            <span className="font-bold">₦0</span>
          </div> */}
          <button
            type="button"
            className="bg-[#9edd45] text-black w-full py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
            onClick={toggleModal}
          >
            <Image src="/ion_ticket.svg" alt="Ticket" width={16} height={16} />
            Book Event
          </button>
        </div>
      </div>

      {/* Render AttendeeDetails Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AttendeeDetails
            ticket={selectedTicket}
            eventID={event.id}
            sessionID={event.sessions[0].id}
            toggleModal={toggleModal}
            title={event.title}
            date={formattedDate}
          />
          <button
            type="button"
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
export default EventDescription;
