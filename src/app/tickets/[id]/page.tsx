"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TicketPage from "./components/TicketPage";
import LocationComponent from "./components/LocationComponent";
import OtherEvents from "./components/OtherEvents";
import { EventProps } from "@/app/homepage/EventCard";
import {
  useGetOneEventQuery,
  useBookmarkEventMutation,
} from "@/services/slices/events.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [eventData, setEventData] = useState<EventProps>({
    id: 0,
    images: [],
    category_id: 0,
    title: "",
    start_date: "",
    time: "",
    city: "",
    address: "",
    price: 0,
    likes: 0,
    description: "",
    tickets: [
      {
        id: 0,
        name: "",
        price: "",
        no_per_seat_type: "",
        seat_type: "",
      },
    ],
    published: false,
    each_ticket_identity: false,
    reason: "",
    currency: "",
    sessions: [
      {
        id: 0,
        name: "",
        start_time: "",
        end_time: "",
      },
    ],
    user: {
      profile: {
        company: "",
        image_url: "",
      },
    },
    category: {
      name: "",
    },
  });

  const user = useSelector((state: RootState) => state.user);

  const { data: eventApiData } = useGetOneEventQuery(id);
  const [bookmarkEvent] = useBookmarkEventMutation();

  useEffect(() => {
    if (eventApiData && eventApiData.body) {
      setEventData(eventApiData.body);
    }
  }, [eventApiData]);

  const handleBookmark = async () => {
    if (id && Number(id)) {
      if (user.userDetails.id !== 0 && user.userDetails.email !== "") {
        const response = await bookmarkEvent({ event_id: Number(id) }).unwrap();
        if (response.message === "SUCCESSFUL" && response.body) {
          toast.success("Event bookmarked successfully");
        } else {
          toast.error("Failed to bookmark event");
        }
      }
    }
  };

  return (
    <div className="bg-[#020e1e] min-h-screen px-4 py-8 text-white">
      <TicketPage event={eventData} />
      {user.userDetails.id !== 0 && user.userDetails.email !== "" ? (
        <button
          className="bg-[#9edd45] text-black w-full py-2 rounded-lg"
          onClick={handleBookmark}
        >
          Bookmark This Event
        </button>
      ) : null}

      <LocationComponent
        location={eventData.address}
        eventHost={eventData.user.profile}
      />

      <OtherEvents id={id} />
    </div>
  );
};

export default Page;
