import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-white sparkle-background min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(3, 13, 30, 0.8) 78%,
            rgba(7, 72, 61, 0.7) 100%,
            rgba(3, 15, 31, 0.7) 100%,
            rgba(0, 0, 0, 0.9) 100%,
            rgba(0, 0, 0, 0) 10%
          ),
          url('https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/hqttomr2qy90ybsnknzn')`,
      }}
    >
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl">
        <h1 className="font-menseal text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 whitespace-normal">
          Discover Your Next Event Adventure,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #9ada43, #4c9e10, #b6d80e)",
            }}
          >
            with Instant Booking.
          </span>
        </h1>

        <p className="text-base sm:text-lg mb-8 font-thin">
          Find events nearby, personalize your experience, and book in seconds!
        </p>

        {/* Marketplace */}
        <div className="flex justify-center">
          <Link
            href="/explore"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Explore Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
