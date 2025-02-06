"use client"

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import SuspensionModal from "@/components/modal/SuspensionModal"; 
import { FaSearch } from "react-icons/fa";


const ManageEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    {
      name: "Wedding Gala",
      date: "Feb 10, 2025 - 6 PM",
      status: "Published",
      statusColor: "bg-[#16803C]",
    },
    {
      name: "Tech Conference",
      date: "Apr 12, 2025 - 8 PM",
      status: "Suspended",
      statusColor: "bg-[#A07D22]",
    },
    {
      name: "Art Exhibition",
      date: "May 20, 2025 - 4 PM",
      status: "Unpublished",
      statusColor: "bg-[#5E5E5E]",
    },
  ];

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold">Manage Events</h1>

      {/* Search Bar + Create Event Button */}
     

<div className="mt-4 flex justify-between items-center">
  <div className="relative w-full max-w-lg">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search for users"
      className="w-full bg-[#1d2635] text-gray-300 px-10 py-2 rounded-md outline-none border border-[#3A3F4E]"
    />
  </div>
  <button className="bg-primary-500 text-black px-4 py-2 rounded-full font-medium ml-4">
    + Create Event
  </button>
</div>


      {/* Events Table */}
      <div className="mt-6 rounded-lg p-4 border border-[#3A3F4E]">
        {/* Table Header */}
        <div className="flex justify-between items-center pb-2 border-b border-[#3A3F4E]">
          <h2 className="text-lg font-semibold">Event List</h2>
          <Image src="/Actions.svg" alt="Actions" width={24} height={24} />
        </div>

        {/* Table */}
        <table className="w-full mt-4 text-left">
          <thead className="bg-[#1d2635]">
            <tr className="text-white font-normal">
              <th className="py-4 px-4 text-[15px]">Event Name</th>
              <th className="py-4 px-4 text-[15px]">Date & Time</th>
              <th className="py-4 px-4 text-[15px]">Status</th>
              <th className="py-4 pr-4 text-[15px] text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-t border-[#3A3F4E] hover:bg-[#2A2F3E] transition">
                <td className="py-4 px-4 text-sm flex items-center gap-2">
                  <input type="checkbox" className="accent-primary-500" />
                  {event.name}
                </td>
                <td className="py-3 px-4 text-sm">{event.date}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`text-white font-thin px-3 py-1 rounded-full ${event.statusColor}`}>
                    {event.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm text-right">
                  <div className="flex justify-end gap-3">
                    <FaEdit className="text-primary-500 cursor-pointer" />
                    <FaTrash
                      className="text-primary-500 cursor-pointer"
                      onClick={() => setIsModalOpen(true)} // Open modal on click
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button className="bg-[#3A3F4E] px-3 py-2 rounded-md text-gray-300">← Previous</button>
          <div className="flex items-center gap-2">
            <span className="bg-primary-500/60 text-white px-3 py-1 rounded-md">1</span>
            <span className="text-gray-400">2</span>
            <span className="text-gray-400">3</span>
            <span className="text-gray-400">...</span>
            <span className="text-gray-400">10</span>
          </div>
          <button className="bg-[#3A3F4E] px-3 py-2 rounded-md text-gray-300">Next →</button>
        </div>
      </div>

      {/* Suspension Modal */}
      {isModalOpen && (
        <SuspensionModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(reason, description) => {
            console.log("Suspension Reason:", reason, "Description:", description);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ManageEvents;
