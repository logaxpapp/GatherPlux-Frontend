import React from "react";
import Image from "next/image";
import { AiOutlinePlayCircle } from "react-icons/ai";

const HowItWorks = () => {
  return (
    <section
      className="bg-[#020e1e] py-16 px-4 relative"
      style={{
        backgroundImage: "url('/Line.png')", // Path to your gradient image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main Heading */}
      <h2 className="text-white text-3xl lg:text-4xl font-bold text-center mb-12">
        Event Discovery and Creation in Three Steps
      </h2>

      {/* Main Content */}
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-12 relative">
        {/* Left Section: Video */}
      <div className="relative">
  <Image
    src="/image.png" // Path to the image in the public folder
    alt="Event Discovery"
    width={650}
    height={650}
    className="rounded-lg object-cover"
    priority
  />
  
 
</div>


        {/* Right Section: Steps */}
        <div className="flex flex-col justify-center lg:pl-16">
          {/* Subheading and Underline (Tablet and Mobile) */}
          <div className="block lg:hidden mb-8">
            <h3 className="text-2xl font-bold text-white text-center md:text-left">
              How It Works
            </h3>
            <div className="mt-2 w-20 h-1 bg-[#93d53e] mx-auto md:mx-0"></div>
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

        {/* Divider Line with Rotated Text (Desktop) */}
        <div className="hidden lg:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center">
          {/* Rotated "How it works" */}
          <div
            className="rotate-180 text-3xl font-bold mr-2 text-transparent bg-clip-text"
            style={{
              writingMode: "vertical-rl",
              backgroundImage:
                "linear-gradient(to bottom, #93d53e, #4f9e0e, #aed30e)",
            }}
          >
            HOW IT WORKS
          </div>

          {/* Vertical Line */}
          <div className="w-0.5 h-[90%] bg-[#ffff]"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
