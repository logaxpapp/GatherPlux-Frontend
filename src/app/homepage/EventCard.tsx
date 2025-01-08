'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useGetAllPublicEventsQuery } from "@/services/slices/events.slice";
import { useGetAllCategoriesQuery } from "@/services/slices/category.slice";
import { setEvents as setStateEvents } from "@/store/slices/event.slice";
import { setCategories as setStateCategories } from "@/store/slices/category.slice";

interface CategoriesProps {
  id: number;
  name: string;
  description: string;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }).replace(',', '');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Fallback to original string if formatting fails
  }
};

interface EventProps {
  id: number;
  images: string[];
  category_id: number;
  title: string;
  start_date: string;
  time: string;
  city: string;
  price: number;
  likes: number;
}

const EventCard = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { data: eventsData } = useGetAllPublicEventsQuery('');
  const { data: categoriesData } = useGetAllCategoriesQuery('');

  useEffect(() => {
    setIsClient(true);

    if (eventsData && eventsData.body) {
      setEvents(eventsData.body.events.records);
      dispatch(setStateEvents(eventsData.body.events.records));
    }

    if (categoriesData && categoriesData.body) {
      setCategories(categoriesData.body);
      dispatch(setStateCategories(categoriesData.body));
    }
  }, [eventsData, categoriesData, dispatch]);



  return (
    <div
      className="bg-[#020e1e] min-h-screen py-10 relative pb-56"
      style={{
        backgroundImage: "url('/Line.png')",  
        backgroundSize: "cover",  
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",  
      }}
    >
      {/* Section Heading */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-4xl font-bold">Discover Unforgettable Events Content</h1>
        <p className="text-white mt-4 max-w-2xl mx-auto">
          Browse a diverse selection of events hosted by top creators. Whether
          you&apos;re looking for concerts, workshops, or social gatherings, our
          marketplace brings unique experiences tailored for everyone.
        </p>
      </div>

      {/* Categories Section */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {
          categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                type="button"
                key={category.id}
                className={`px-8 py-2 rounded-full text-sm font-semibold ${index === 0
                  ? "bg-[#9edd45] text-black"
                  : "border border-gray-800 hover:bg-gray-700 text-white hover:text-white px-4 py-2 rounded"
                  }`}
              >
                {category.name}
              </button>
            ))
          ) : (
            <div>No categories available</div>
          )
        }

      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {
          events && events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
              >
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
                    {event.category_id}
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
                        src="/ticket.png"  
                        alt="Ticket Icon"
                        width={16}
                        height={190}
                        className="mr-2"
                      />
                      <p className="text-[#9edd45] font-bold">₹{event.price}</p>
                    </div>

                    {/* Interested Section */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Image
                        src="/Star 1.png"  
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
                  {isClient ? formatDate(event.start_date) : event.start_date}
                </div>
              </div>
            ))
          ) : (
            <div>No events available</div>
          )
        }
      </div>
    </div>
  );
};

export default EventCard;