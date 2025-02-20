import React, { useState } from "react";
import Image from "next/image";
import { EventProps } from "@/app/homepage/EventCard";
import AttendeeDetails from "@/components/modal/AttendeeDetails";
import { toast } from "react-toastify";

interface EventDescriptionProps {
  event: EventProps;
}

export interface TicketProps {
  id: number;
  name: string;
  price: string;
  no_per_seat_type: string;
  seat_type: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSessions, setSelectedSessions] = useState<
    Record<number, number | null>
  >({});
  const [ticketQuantities, setTicketQuantities] = useState<
    Record<number, number>
  >({});
  const [ticketNames, setTicketNames] = useState<Record<number, string>>({});

  const handleSessionChange = (ticketId: number, sessionId: number | null) => {
    setSelectedSessions({ ...selectedSessions, [ticketId]: sessionId });
  };

  const handleQuantityChange = (ticketId: number, quantityChange: number) => {
    const currentQuantity = ticketQuantities[ticketId] || 0;
    const newQuantity = Math.max(0, currentQuantity + quantityChange); // Prevent negative quantities
    setTicketQuantities({ ...ticketQuantities, [ticketId]: newQuantity });
  };

  const handleTicketNameChange = (ticketId: number, newName: string) => {
    setTicketNames({ ...ticketNames, [ticketId]: newName });
  };

  const toggleModal = () => {
    if (
      Object.keys(selectedSessions).length === 0 ||
      Object.keys(ticketQuantities).length === 0 ||
      (event.each_ticket_identity && Object.keys(ticketNames).length === 0)
    ) {
      toast.info(
        "Please select sessions, quantities, and names for all tickets.",
        {
          position: "top-right",
        },
      );
      return;
    }

    if (Object.values(ticketQuantities).every((quantity) => quantity === 0)) {
      toast.info("Please select at least one ticket.", {
        position: "top-right",
      });
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
        backgroundImage:
          "url('https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/qq7es0mu6cc7tkzlv1kl')",
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
          src={
            event.images[0] ||
            "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/cygjqqrodbmwznwqlqtv"
          }
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
            {formattedDate !== "Invalid Date" && formattedDate}
          </div>
          <div className="flex items-center text-sm text-gray-400">
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
          <hr className="my-4 border-gray-600" />

          <h3 className="text-lg font-bold text-white mb-4">
            Ticket Information
          </h3>
          <div className="space-y-4">
            {event.tickets && event.tickets.length > 0 ? (
              event.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border border-white p-2 text-white"
                >
                  {event.each_ticket_identity && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Ticket Name"
                        className="w-full p-1 sm:p-2 lg:p-3 bg-transparent focus:ring-0 focus:outline-none text-white text-sm sm:text-base"
                        id={`ticket-name-${ticket.id}`}
                        value={ticketNames[ticket.id]}
                        onChange={(e) =>
                          handleTicketNameChange(ticket.id, e.target.value)
                        }
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="type-medium">{ticket.name}</span>
                    <span> - </span>
                    <span className="text-sm text-gray-400">
                      {event.currency !== null && event.currency.split("-")[0]}
                      {Number(ticket.price).toLocaleString()}
                    </span>
                    <span>
                      for a
                      <span className="text-sm text-gray-400 px-2">
                        {" "}
                        {ticket.seat_type}{" "}
                      </span>
                      for
                      <span className="text-sm text-gray-400 px-2">
                        {" "}
                        {ticket.no_per_seat_type}{" "}
                      </span>{" "}
                      Person(s)
                    </span>

                    {event.sessions && event.sessions.length >= 1 && (
                      <div>
                        <select
                          id={`session-${ticket.id}`}
                          value={selectedSessions[ticket.id] || ""}
                          onChange={(e) =>
                            handleSessionChange(
                              ticket.id,
                              Number(e.target.value) || null,
                            )
                          }
                          className="bg-[#9edd45] text-black px-2 py-1 rounded"
                        >
                          <option value="">Select session</option>
                          {event.sessions.map((session) => (
                            <option key={session.id} value={session.id}>
                              {session.name !== null && session.name}{" "}
                              {session.start_time} - {session.end_time}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(ticket.id, -1)}
                    >
                      -
                    </button>
                    <span>{ticketQuantities[ticket.id] || 0}</span>{" "}
                    {/* Display quantity or 0 if not set */}
                    <button
                      type="button"
                      className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded"
                      onClick={() => handleQuantityChange(ticket.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Free event</p>
            )}
          </div>
          <hr className="my-4 border-gray-600" />

          <button
            type="button"
            className="bg-[#9edd45] text-black w-full py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
            onClick={toggleModal}
          >
            <Image
              src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hcq7v4hy6hlztcq7wkcj"
              alt="Ticket"
              width={16}
              height={16}
            />
            Book Event
          </button>
        </div>
      </div>

      {/* Render AttendeeDetails Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AttendeeDetails
            eventID={event.id}
            sessionIDs={selectedSessions}
            quantities={ticketQuantities}
            ticketNames={ticketNames}
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
