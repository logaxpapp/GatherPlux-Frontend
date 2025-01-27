import Image from "next/image";
import Filter from "./components/Filter.component";
import EventCard from "./components/EventCard.component";

export default function Explore() {
  return (
    <div
      className="bg-[#0b1120]"
      style={{
        background: `
      linear-gradient(
        to bottom,
        rgba(3, 13, 30, 0.8) 75%,
        rgba(7, 72, 61, 0.7) 100%,
        rgba(3, 15, 31, 0.7) 100%,
        rgba(0, 0, 0, 0.9) 100%,
        rgba(0, 0, 0, 0) 10%
      ),
      repeating-linear-gradient(
        0deg,
        transparent 0,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 50px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0,
        rgba(255, 255, 255, 0.1) 1px,
        transparent 50px
      )
    `,
        backgroundSize: "100% 100%, 10px 10px, 10px 10px",
        backgroundPosition: "center",
      }}
    >
      {/* Hero section */}
      <div
        className="relative flex flex-col items-center justify-center text-white h-[500px] sm:h-[600px] lg:h-[707px]"
        style={{
          backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(3, 13, 30, 0.8) 75%,
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
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-8">
          <h1 className="text-[32px] sm:text-[48px] lg:text-[64px] font-normal leading-none mb-8">
            Explore a world of events and <br />
            find what excites you
          </h1>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center bg-[#253f3f] rounded-full px-4 py-4 shadow-md w-full sm:w-auto space-x-4 max-w-2xl mx-auto text-white">
            <div className="flex items-center space-x-2 flex-grow">
              <Image
                src="/Searchicon.png"
                alt="Search Icon"
                width={20}
                height={20}
              />
              <input
                type="text"
                placeholder="Search Events, Categories, Location..."
                className="flex-grow outline-none bg-transparent text-white placeholder-gray-300"
              />
            </div>

            {/* Location Dropdown */}
            <div className="flex items-center space-x-2 border-l border-gray-500 pl-4">
              <Image
                src="/Locationicon.png"
                alt="Location Icon"
                width={20}
                height={20}
              />
              <select
                className="bg-transparent outline-none text-white cursor-pointer"
                aria-label="Select location"
              >
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="new-york">New York</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mx-auto pt-[50px] sm:pt-[70px] lg:pt-[100px] px-4 sm:px-8 lg:px-[94px] pb-[60px] w-full space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Filter Section */}
        <Filter />

        {/* Events Section */}
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-2 mb-6 sm:mb-8 lg:mb-10 justify-end">
            <p className="text-[16px] sm:text-[18px] lg:text-[20px]">Sort by:</p>
            <select
              className="w-[200px] sm:w-[240px] lg:w-[270px] h-[40px] sm:h-[48px] lg:h-[54px] text-[16px] sm:text-[18px] lg:text-[22px] bg-white text-black border border-gray-300 rounded px-4 py-2 pr-8 appearance-none bg-no-repeat bg-right focus:outline-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23666' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`,
                backgroundSize: "1.5rem",
                backgroundPosition: "right 0.5rem center",
              }}
              aria-label="Sort events"
            >
              <option value="relevance">Relevance</option>
              <option value="location">Location</option>
              <option value="price">Price</option>
            </select>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((event) => (
              <EventCard key={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
