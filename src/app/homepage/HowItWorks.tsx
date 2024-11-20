import React from "react";
import Image from "next/image"; // Import Next.js Image component
import { AiOutlinePlayCircle } from "react-icons/ai";

const HowItWorks = () => {
  return (
    <section className="bg-[#0C1E36] py-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Left Section: Video */}
        <div className="relative">
          <Image
            src="/image.png" // Path to the image in the public folder
            alt="Event Discovery"
            width={800} // Replace with appropriate dimensions
            height={600}
            className="rounded-lg"
            priority // Ensures this image loads quickly as it's above the fold
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <AiOutlinePlayCircle
              className="text-white text-6xl cursor-pointer opacity-90 hover:opacity-100 transition duration-200"
              title="Play Video"
            />
          </div>
        </div>

        {/* Right Section: Steps */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
            Event Discovery and Creation in Three Steps
          </h2>
          <div className="relative mb-12">
            <div className="absolute -left-12 top-0 transform rotate-90 text-[#A3E635] font-bold text-xl">
              How it works
            </div>
          </div>
          <div className="space-y-8">
            {/* Step 1 */}
            <div>
              <h3 className="text-white text-2xl font-semibold">
                Browse or List an Event
              </h3>
              <p className="text-gray-400 mt-2">
                Find the perfect event that matches your interests with ease.
                Use our filters to browse by category, location, or popularity.
                Want to host? Creating an event is just as quick. Simply add the
                event details, and you’re ready to share it with the world.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="text-white text-2xl font-semibold">
                Book Your Spot or Sell Tickets
              </h3>
              <p className="text-gray-400 mt-2">
                Once you find an event, booking is a breeze. Secure your spot
                with fast, secure payment options, and receive instant
                confirmation. For hosts, selling tickets is easy—you can track
                sales, manage guest lists, and stay connected with attendees.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="text-white text-2xl font-semibold">
                Show Up and Enjoy
              </h3>
              <p className="text-gray-400 mt-2">
                On the day of the event, we make sure everything is set. You’ll
                receive timely reminders and seamless check-in options, while
                hosts enjoy real-time tracking tools to make sure everything
                runs smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
