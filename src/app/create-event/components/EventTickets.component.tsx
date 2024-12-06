import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { IoTicketOutline } from 'react-icons/io5';

import freeSvg from "../../../../public/free.svg";
import Image from 'next/image';

interface EventTicketsProps {
  eventType: string;
  handleEventTypeOnTicket: (value: string) => void;
  tickets: { id: string; name: string; price: string; }[];
  updateTicket: (id: string, field: "name" | "price", value: string) => void;
  addTicketEntry: () => void;
}

const EventTickets: React.FC<EventTicketsProps> = ({ eventType, handleEventTypeOnTicket, tickets, updateTicket, addTicketEntry }) => {
  return (
    <div className="max-w-4xl px-20 space-y-8">
      {/* Event Type Selection */}
      <div>
        <h2 className="text-[32px] font-normal mb-6">
          What type of event are you running?
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Ticketed Event Option */}
          <div
            className={`p-6 border rounded-lg cursor-pointer flex flex-col items-center text-center
              ${eventType === 'ticketed' ? ' bg-[#9EDD45] text-black' : 'border-gray-200'}`}
            onClick={() => handleEventTypeOnTicket('ticketed')}
          >
            {/* <Ticket className="w-8 h-8 mb-3 text-gray-700" /> */}
            <IoTicketOutline className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-medium mb-2">Ticketed Event</h3>
            <p>My event requires tickets for entry</p>
          </div>

          {/* Free Event Option */}
          <div
            className={`p-6 border rounded-lg cursor-pointer flex flex-col items-center text-center
              ${eventType === 'free' ? 'bg-[#9EDD45] text-black' : 'border-gray-200'}`}
            onClick={() => handleEventTypeOnTicket('free')}
          >
            <Image src={freeSvg} alt="free" className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-medium mb-2">Free Event</h3>
            <p >I&apos;m running a free event</p>
          </div>
        </div>
      </div>

      {/* Ticket Section */}
      {eventType === 'ticketed' && (
        <div>
          <h2 className="text-[32px]font-normal mb-6">
            What tickets are you selling?
          </h2>

          <div className="space-y-4 relative">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex gap-4">
                {/* Ticket Name Input */}
                <div className="w-[400px]">
                  <label className="block text-sm font-medium mb-2">
                    Ticket Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ticket Name e.g. General Admission"
                    value={ticket.name}
                    onChange={(e) => updateTicket(ticket.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Ticket Price Input */}
                <div className="w-[200px]">
                  <label className="block text-sm font-medium mb-2">
                    Ticket Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      ₦
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={ticket.price}
                      onChange={(e) => updateTicket(ticket.id, 'price', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      title={''}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Ticket Button */}
            <button
              title={''}
              type="button"
              onClick={addTicketEntry}
              className="bg-none absolute right-0 top-0"
            >
              <CiCirclePlus className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTickets;