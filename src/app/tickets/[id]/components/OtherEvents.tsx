import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EventProps, formatDate } from "@/app/homepage/EventCard";
import Link from "next/link";
import { useGetAllPublicEventsQuery } from "@/services/slices/events.slice";
import { useDispatch } from "react-redux";
import { setEvents as setStateEvents } from "@/store/slices/event.slice";

interface OtherEventsProps {
  id: string | undefined;
}

const OtherEvents = ({ id = "" }: OtherEventsProps) => {
  const dispatch = useDispatch();

  const [events, setEvents] = useState<EventProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { data: eventsData } = useGetAllPublicEventsQuery("");

  useEffect(() => {
    setIsClient(true);

    if (eventsData && eventsData.body) {
      setEvents(eventsData.body.events.records);
      dispatch(setStateEvents(eventsData.body.events.records));
    }
  }, [eventsData, dispatch]);

  return (
    <div
      className="bg-[#020e1e]   py-10 relative   "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/qq7es0mu6cc7tkzlv1kl')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto mb-8 px-4">
        <h1 className="text-white text-xl font-bold  ">
          Other Events You May Like
        </h1>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {events && events.length > 0 ? (
          events
            .slice(0, 10)
            .filter((e) => e.id !== +id)
            .map((event) => (
              <Link href={`/tickets/${event.id}`} key={event.id}>
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
                  {/* Image Section */}
                  <div className="relative aspect-w-16 aspect-h-12">
                    <Image
                      src={
                        event.images[0] ||
                        "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/cygjqqrodbmwznwqlqtv"
                      }
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                    <span className="absolute top-2 right-4">
                      <Image
                        src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/l0r6smygkyf1wrtasbuj"
                        alt="Verified"
                        width={24} // Adjust the size of the image
                        height={24}
                      />
                    </span>
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
                        <p className="text-[#9edd45] font-bold">
                          ₹{event.price}
                        </p>
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
                    {isClient ? formatDate(event.start_date) : event.start_date}
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <div>No events available</div>
        )}
      </div>
    </div>
  );
};

export default OtherEvents;
