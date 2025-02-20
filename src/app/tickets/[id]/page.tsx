"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TicketPage from "./components/TicketPage";
import LocationComponent from "./components/LocationComponent";
import OtherEvents from "./components/OtherEvents";
import { EventProps } from "@/app/homepage/EventCard";
import { useGetOneEventQuery } from "@/services/slices/events.slice";

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

  const { data: eventApiData } = useGetOneEventQuery(id);

  useEffect(() => {
    if (eventApiData && eventApiData.body) {
      setEventData(eventApiData.body);
    }
  }, [eventApiData]);

  return (
    <div className="bg-[#020e1e] min-h-screen px-4 py-8 text-white">
      {/* Pass the toggleModal function to TicketPage */}
      <TicketPage event={eventData} />
      <LocationComponent
        location={eventData.address}
        eventHost={eventData.user.profile}
      />

      <OtherEvents id={id} />
    </div>
  );
};

export default Page;
