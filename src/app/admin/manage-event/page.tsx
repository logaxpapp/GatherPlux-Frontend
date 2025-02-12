"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SuspensionModal from "@/components/modal/SuspensionModal";
import { FaSearch } from "react-icons/fa";
import {
  useGetAllPublicEventsQuery,
  useLazySearchEventsQuery,
} from "@/services/slices/events.slice";
import { EventProps } from "@/app/homepage/EventCard";
import { useDebounce } from "@/helpers/hooks/useDebounce";
import { toast } from "react-toastify";
import { useSuspendEventMutation } from "@/services/slices/admin.slice";

const ManageEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventsData, setEventsData] = useState<EventProps[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPage, setSearchPage] = useState(0);
  const [eventToSuspend, setEventToSuspend] = useState<EventProps | null>(null);

  const [canDebounce, setCanDebounce] = useState(false);
  const debouncedQuery: string = useDebounce(
    canDebounce ? searchQuery : "",
    300,
  );

  const { data: eventsAPIData } = useGetAllPublicEventsQuery(currentPage);
  const [searchEvents] = useLazySearchEventsQuery();
  const [suspendEvent] = useSuspendEventMutation();

  useEffect(() => {
    if (
      eventsAPIData &&
      eventsAPIData.code === 200 &&
      eventsAPIData.body &&
      eventsAPIData.body.records
    ) {
      setEventsData(eventsAPIData.body.events.records);
      setTotalPages(eventsAPIData.body.events.totalPages);
      setCurrentPage(eventsAPIData.body.events.currentPage);
    }
  }, [eventsAPIData]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      // Load all users if no search query
      if (eventsAPIData?.body?.events?.records) {
        setEventsData(eventsAPIData.body.events.records);
        setTotalPages(eventsAPIData.body.events.totalPages);
        setCurrentPage(eventsAPIData.body.events.currentPage);
      }
      return;
    }

    const searchUsersData = async () => {
      try {
        const response = await searchEvents({
          query: debouncedQuery,
          page: searchPage,
        }).unwrap();

        if (response?.code === 200) {
          setEventsData(response.body.events.records);
          setTotalPages(response.body.events.totalPages);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    searchUsersData();
  }, [debouncedQuery, searchPage, eventsAPIData, searchEvents]);

  const handlePageChange = (pageNumber: number) => {
    if (searchQuery.length >= 3) {
      // If searching, update searchPage
      if (pageNumber >= 0 && pageNumber < totalPages) {
        setSearchPage(pageNumber);
      }
    } else {
      // If not searching, update normal pagination
      if (pageNumber >= 0 && pageNumber < totalPages) {
        setCurrentPage(pageNumber);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.length >= 3) {
      setCanDebounce(true);
      setSearchPage(0); // Reset search pagination
    } else {
      // If search is cleared, reset and fetch all users
      setCanDebounce(false);
      setSearchPage(0);
      setCurrentPage(0);
      if (eventsAPIData?.body?.records) {
        setEventsData(eventsAPIData.body.records);
        setTotalPages(eventsAPIData.body.totalPages);
      }
    }
  };

  const handleSuspensionModal = (event: EventProps) => {
    setEventToSuspend(event);
    setIsModalOpen(true);
  };

  const handleSuspension = async (reason: string, description: string) => {
    if (!eventToSuspend) {
      toast.error("Event not found");
      return;
    }

    const response = await suspendEvent({
      id: eventToSuspend.id,
      status: `${!eventToSuspend.published}`,
      reason: `${reason} - ${description}`,
    }).unwrap();

    if (response?.code === 200 && response.message === "SUCCESSFUL") {
      toast.success("Event suspended successfully");
      setIsModalOpen(false);
      setEventToSuspend(null);
    } else {
      toast.error("Failed to suspend event");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventToSuspend(null);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold">Manage Events</h1>

      {/* Search Bar + Create Event Button */}

      <div className="mt-4 flex justify-between items-center">
        <div className="relative w-full max-w-lg">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search for events"
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
            {eventsData.map((event) => (
              <tr
                key={event.id}
                className="border-t border-[#3A3F4E] hover:bg-[#2A2F3E] transition"
              >
                <td className="py-4 px-4 text-sm flex items-center gap-2">
                  <input type="checkbox" className="accent-primary-500" />
                  {event.title}
                </td>
                <td className="py-3 px-4 text-sm">{event.start_date}</td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`text-white font-thin px-3 py-1 rounded-full ${event.published ? "bg-[#16803C]" : "bg-[#5E5E5E]"} `}
                  >
                    {event.published ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="py-3 pr-4 text-sm text-right">
                  <div className="flex justify-end gap-3">
                    {event.published ? (
                      <button
                        onClick={() => handleSuspensionModal(event)}
                        className="text-white hover:text-red-600 hover:bg-white p-2 bg-red-400"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSuspensionModal(event)}
                        className="text-green-500 hover:text-green-600"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4 py-5">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 border border-gray-500 rounded text-white"
          >
            ← Previous
          </button>
          <span>
            Page {currentPage} of {totalPages ? totalPages : 0}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 border border-gray-500 rounded text-white"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Suspension Modal */}
      {isModalOpen && (
        <SuspensionModal
          onClose={handleCloseModal}
          onSubmit={handleSuspension}
          eventName={eventToSuspend?.title}
        />
      )}
    </div>
  );
};

export default ManageEvents;
