"use client";

import Image from "next/image";
import React from "react";

import { useGetUserEventsQuery } from "@/services/slices/events.slice";
import { EventProps } from "@/app/homepage/EventCard";
import { useRouter } from "next/navigation";

const Events: React.FC = () => {
  const router = useRouter();
  const { data: events } = useGetUserEventsQuery("");

  const handleEdit = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#020e1e] flex justify-center text-white">
      <div className="w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row">
        {/* Right Content Area */}
        <div className="w-full pl-6 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">My Events</h2>
          </div>

          {/* Event Cards */}
          <div className="space-y-4 flex-grow">
            {events && events.body && events.body.length > 0 ? (
              events.body.map((event: EventProps) => (
                <div key={event.id}>
                  {/* Card Content */}
                  <div className="flex items-center justify-between pb-4">
                    {/* Event Details with Blue Background */}
                    <div className="flex items-center space-x-4 bg-[#243447] p-4 max-w-[100%] rounded-md">
                      <Image
                        src={event.images[0]}
                        alt={event.title}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-sm">
                          {event.title}
                        </h3>
                        <p className="text-[#a5b0c1] text-xs">
                          {event.city} - {event.start_date}
                          <br />
                          {event.time}
                        </p>
                        <p className="text-[#93d437] text-xs mt-1">
                          {event.currency.split("-")[0]} - {event.price} •{" "}
                          <span className="text-orange-500">★</span>{" "}
                          <span className="text-white">
                            {event.likes} Interested
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      className="ml-4 bg-[#93d437] text-black font-bold px-6 py-2 rounded-full hover:bg-[#a4de4a]"
                      onClick={() => handleEdit(`/edit-event/${event.id}`)}
                    >
                      Edit Event
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>You have no events</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
