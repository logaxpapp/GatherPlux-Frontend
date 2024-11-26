import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-white sparkle-background"
      style={{
        height: "874px", // Setting the height
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(3, 13, 30, 0.8) 78%,
            rgba(7, 72, 61, 0.7) 100%,
            rgba(3, 15, 31, 0.7) 100%,
            rgba(0, 0, 0, 0.9) 100%,
            rgba(0, 0, 0, 0) 10%
          ),
          url('/background.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
        <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-6 whitespace-nowrap">
          Discover Your Next Event Adventure,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #9ada43, #4c9e10, #b6d80e)',
            }}
          >
            with Instant Booking.
          </span>
        </h1>

        <p className="text-base sm:text-base mb-8 font-thin">
          Find events nearby, personalize your experience, and book in seconds!
        </p>

        {/* Updated Search Bar */}
        <div className="flex items-center bg-[#253f3f] rounded-full px-4 py-4 shadow-md w-full sm:w-auto space-x-4 max-w-2xl mx-auto text-white">
          {/* Search Input */}
          <div className="flex items-center space-x-2 flex-grow">
            <Image
              src="/Searchicon.png" // Search icon image
              alt="Search Icon"
              width={20}
              height={20}
            />
            <input
              type="text"
              placeholder="Search Events, Categories, Location..."
              className="flex-grow outline-none bg-transparent text-[#377070] placeholder-gray-300"
            />
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center space-x-2 border-l border-gray-500 pl-4">
            <Image
              src="/Locationicon.png" // Location icon image
              alt="Location Icon"
              width={20}
              height={20}
            />
            <select
              className="bg-transparent outline-none text-white cursor-pointer"
            >
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="new-york">New York</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
