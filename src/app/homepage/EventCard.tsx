"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useGetAllPublicEventsQuery } from "@/services/slices/events.slice";
import { setEvents as setStateEvents } from "@/store/slices/event.slice";

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      .replace(",", "");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Fallback to original string if formatting fails
  }
};

interface TicketsProps {
  id: number;
  name: string;
  price: string;
  no_per_seat_type: string;
  seat_type: string;
}

export interface EventProps {
  id: number;
  images: string[];
  category_id: number;
  title: string;
  start_date: string;
  time: string;
  city: string;
  address: string;
  price: number;
  likes: number;
  description: string;
  tickets: TicketsProps[];
  published: boolean;
  reason: string;
  currency: string;
  each_ticket_identity: boolean;
  sessions: {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
  }[];
  user: {
    profile: {
      company: string;
      image_url: string;
    };
  };
  category: {
    name: string;
  };
}

const EventCard = () => {
  const dispatch = useDispatch();

  const [events, setEvents] = useState<EventProps[]>([]);

  const { data: eventsData } = useGetAllPublicEventsQuery("");

  useEffect(() => {
    if (eventsData && eventsData.body) {
      setEvents(eventsData.body.events.result);
      dispatch(setStateEvents(eventsData.body.events.result));
    }
  }, [eventsData, dispatch]);

  return (
    <div
      className="bg-[#020e1e] min-h-screen py-10 relative pb-56"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/qq7es0mu6cc7tkzlv1kl')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Section Heading */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">
          Discover Unforgettable Events Content
        </h1>
        <p className="text-white mt-4 max-w-2xl mx-auto">
          Browse a diverse selection of events hosted by top creators. Whether
          you&apos;re looking for concerts, workshops, or social gatherings, our
          marketplace brings unique experiences tailored for everyone.
        </p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {events && events.length > 0 ? (
          events.map((event) => (
            <Link href={`/tickets/${event.id}`} key={event.id}>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
                {/* Image Section */}
                <div className="relative aspect-w-16 aspect-h-12">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <span className="bg-[#9edd45] text-black text-xs font-semibold px-2 py-1 rounded">
                    {event.category.name}
                  </span>
                  <h3 className="text-white font-[600] text-[19.8px] text-lg mt-2 ">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{event.city}</p>
                  <p className="text-gray-400 text-sm">{event.time}</p>
                  <div className="flex items-center justify-between mt-4">
                    {/* Price Section */}
                    <div className="flex items-center">
                      <Image
                        src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/vnrpwfvxrmwt4xajyxoe"
                        alt="Ticket Icon"
                        width={16}
                        height={190}
                        className="mr-2"
                      />
                      {Number(event.price) > 0 ? (
                        <p className="text-[#9edd45] font-bold">
                          {event.currency !== null &&
                            event.currency.split("-")[0]}{" "}
                          {Number(event.price).toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-[#9edd45] font-bold">Free</p>
                      )}
                    </div>

                    {/* Interested Section */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Image
                        src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/dtp6yqykibszstqny9ry"
                        alt="Star Icon"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <p>{event.likes} interested</p>
                    </div>
                  </div>
                </div>
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white text-black font-bold text-sm rounded-full w-12 h-12 flex items-center justify-center">
                  {formatDate(event.start_date)}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No events available</div>
        )}
      </div>

      {events && events.length >= 0 && (
        <div className="flex justify-center mt-10 float-right mr-10">
          <Link
            href="/explore"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore More Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventCard;
