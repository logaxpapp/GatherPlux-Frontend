import React from "react";
import Image from "next/image";

const EventCard = () => {
  const categories = ["Art", "Collectibles", "Metaverse", "Virtual Worlds", "Sports", "Music"];
  const events = [
    {
      image: "/Rectangle 2.png", // Image path from the public folder
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
    {
      image: "/Rectangle 2.png",
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
    {
      image: "/Rectangle 2.png",
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
    {
      image: "/Rectangle 2.png",
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
    {
      image: "/Rectangle 2.png",
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
    {
      image: "/Rectangle 2.png",
      category: "Technology & Innovation",
      title: "Event title that can go up to two lines",
      date: "Nov 22",
      time: "00:00 AM",
      venue: "Venue Name",
      price: 499,
      interested: 10,
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      {/* Section Heading */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-4xl font-bold">Discover Unforgettable Events Content</h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Browse a diverse selection of events hosted by top creators. Whether
          you&apos;re looking for concerts, workshops, or social gatherings, our
          marketplace brings unique experiences tailored for everyone.
        </p>
      </div>

      {/* Categories Section */}
      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              category === "Art"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
          >
            {/* Image Section */}
            <div className="relative">
              <Image
                src={event.image}
                alt={event.title}
                layout="responsive"
                width={400} // Adjust width and height as needed
                height={160}
                className="rounded-t-lg"
              />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
                ✔️
              </span>
            </div>
            {/* Content Section */}
            <div className="p-4">
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {event.category}
              </span>
              <h3 className="text-white font-bold text-lg mt-2 truncate">
                {event.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{event.venue}</p>
              <p className="text-gray-400 text-sm">{event.time}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-green-400 font-bold">₹{event.price}</p>
                <p className="text-gray-400 text-sm">{event.interested} interested</p>
              </div>
            </div>
            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-white text-black font-bold text-sm rounded-full w-12 h-12 flex items-center justify-center">
              {event.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;