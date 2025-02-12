import React from "react";
import { CiCirclePlus, CiTrash } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import freeSvg from "../../../../public/free.svg";
import Image from "next/image";

interface EventTicketsProps {
  eventType: string;
  handleEventTypeOnTicket: (value: string) => void;
  tickets: { id: string; name: string; price: string; people: number }[];
  updateTicket: (
    id: string,
    field: "name" | "price" | "people",
    value: string,
  ) => void;
  addTicketEntry: () => void;
  handleNumberOfTickets: (value: number | "") => void;
  numberOfTickets: number | "";
  deleteTicketEntry: (id: string) => void;
}

const EventTickets: React.FC<EventTicketsProps> = ({
  eventType,
  handleEventTypeOnTicket,
  tickets,
  updateTicket,
  addTicketEntry,
  numberOfTickets,
  handleNumberOfTickets,
  deleteTicketEntry,
}) => {
  const handleTicketPriceInput = (
    ticketId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;

    // Improved regex: Allows input from the beginning, handles commas and decimals
    const regex = /^([0-9,]*\.?[0-9]{0,2})?$/;

    if (regex.test(newValue)) {
      // No need to check for empty string separately
      const numericValue = newValue.replace(/,/g, "");
      updateTicket(ticketId, "price", newValue === "" ? "" : numericValue);
    }
  };

  return (
    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto space-y-8">
      {/* Event Type Selection */}
      <div>
        <h2 className="text-[27px] font-normal mb-6">
          What type of event are you running?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Ticketed Event */}
          <div
            className={`p-6 border-2 rounded-lg cursor-pointer text-center
              ${
                eventType === "ticketed"
                  ? "border-[#9EDD45] bg-[#9EDD45]/10"
                  : "border-gray-700"
              }`}
            onClick={() => handleEventTypeOnTicket("ticketed")}
          >
            <IoTicketOutline className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-xl font-medium">Ticketed Event</h3>
            <p>My event requires tickets for entry</p>
          </div>
          {/* Free Event */}
          <div
            className={`p-6 border-2 rounded-lg cursor-pointer text-center
              ${
                eventType === "free"
                  ? "border-[#9EDD45] bg-[#9EDD45]/10"
                  : "border-gray-700"
              }`}
            onClick={() => handleEventTypeOnTicket("free")}
          >
            <Image src={freeSvg} alt="free" className="w-8 h-8 mb-3 mx-auto" />
            <h3 className="text-xl font-medium">Free Event</h3>
            <p>I&apos;m running a free event</p>
          </div>
        </div>
      </div>

      {/* Ticket Section */}
      {eventType === "ticketed" && (
        <div>
          <h2 className="text-[27px] font-normal mb-6">
            What tickets are you selling?
          </h2>
          <div className="space-y-4 relative">
            {tickets.map((ticket, index) => (
              <div key={ticket.id} className="flex flex-wrap gap-4">
                {/* Ticket Name */}
                <div className="w-full sm:w-[300px]">
                  <label className="block text-sm font-medium mb-1">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ticket Name e.g. VIP"
                    value={ticket.name}
                    onChange={(e) =>
                      updateTicket(ticket.id, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-500 rounded focus:outline-none bg-[#1B2634]"
                  />
                </div>

                {/* Ticket Price */}
                <div className="w-full sm:w-[150px]">
                  <label className="block text-sm font-medium mb-1">
                    Ticket Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2">
                      ₦
                    </span>
                    <input
                      title=""
                      type="text"
                      placeholder="0.00"
                      min="0"
                      value={ticket.price}
                      onChange={(e) => handleTicketPriceInput(ticket.id, e)}
                      className="w-full pl-6 pr-3 py-2 border border-gray-500 rounded focus:outline-none bg-[#1B2634] text-gray-400"
                    />
                  </div>
                </div>

                {/* How Many Person Ticket */}
                <div className="w-full sm:w-[150px]">
                  <label className="block text-sm font-medium mb-1 whitespace-nowrap">
                    How many person ticket?
                  </label>
                  <select
                    title={""}
                    value={ticket.people}
                    onChange={(e) =>
                      updateTicket(ticket.id, "people", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-500 rounded focus:outline-none bg-[#1B2634] text-gray-400"
                  >
                    {[1, 5, 10, 25, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delete Ticket */}
                {index >= 1 && (
                  <button
                    title={""}
                    type="button"
                    className="text-[#f00] text-[24px] hover:text-[#f00]"
                    onClick={() => deleteTicketEntry(ticket.id)}
                  >
                    <CiTrash />
                  </button>
                )}
              </div>
            ))}

            {/* Add Ticket */}
            <button
              title={""}
              type="button"
              onClick={addTicketEntry}
              className="absolute right-0 top-0 text-[#9EDD45] hover:text-green-700"
            >
              <CiCirclePlus className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      {/* Total Tickets */}
      <div>
        <h2 className="text-[27px] font-normal mb-6">
          How many tickets are you selling?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {[
            100, 500, 1000, 3000, 5000, 10000, 20000, 50000, 100000, 500000,
            1000000,
          ].map((num) => (
            <button
              type="button"
              key={num}
              className="px-4 py-2 border rounded hover:bg-[#9EDD45]/20 focus:bg-[#9EDD45] focus:text-black bg-[#1B2634] text-gray-400 border-gray-500"
              onClick={() => handleNumberOfTickets(num)}
            >
              {num.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Enter number of tickets"
          value={numberOfTickets}
          onChange={(e) =>
            handleNumberOfTickets(e.target.value ? +e.target.value : "")
          }
          className="w-full px-3 py-2 border border-gray-500 rounded focus:outline-none bg-[#1B2634]"
        />
      </div>
    </div>
  );
};

export default EventTickets;
