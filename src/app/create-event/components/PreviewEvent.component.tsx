import React, { useState } from "react";
import {
  IoTimeOutline,
  IoTicketSharp,
  IoLocationOutline,
  IoChevronDownSharp,
  IoChevronUpSharp,
} from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { EventDetailsProps } from "../page";
import Image from "next/image";
import SignInModal from "@/components/modal/SignInModal";
import SignUpModal from "@/components/modal/signUpModal"; // Import SignUpModal

interface PreviewEventProps {
  selectedFile: File | null;
  eventDetails: EventDetailsProps;
  handleCreateEvent: () => void;
}

const PreviewEvent: React.FC<PreviewEventProps> = ({
  selectedFile,
  eventDetails,
  handleCreateEvent,
}) => {
  const user = {
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@email.com",
    phone: "08012345678",
  };

  const [showMore, setShowMore] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // State for SignUpModal

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true); // Open SignUpModal
  };

  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false); // Close both modals
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-10 py-10">
      {/* Event Card */}
      <div className="max-w-[1100px] mx-auto border border-[#9EDD45] rounded-xl p-6 bg-[#020e1e] shadow-md">
        {/* Event Image */}
        <div className="relative w-full rounded-lg overflow-hidden mb-6">
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Event Banner"
              width={1200}
              height={500}
              className="w-full h-[300px] object-cover"
            />
          ) : (
            <Image
              src="/mnt/data/Screenshot (1168).png"
              alt="Default Event"
              width={1200}
              height={500}
              className="w-full h-[300px] object-cover"
            />
          )}
          <div className="absolute top-0 right-0 bg-[#9EDD45] text-black px-4 py-2 rounded-bl-lg font-bold">
            LIVE EVENT
          </div>
        </div>

        {/* Event Details */}
        <div className="flex flex-wrap gap-6">




          {/* Left Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-[#fdfdfd]">{eventDetails.title || 'Sound Of Christmas 2024'}</h1>


             {/* Description */}
             <div>
              <h2 className="font-semibold text-lg mb-2">About the Event</h2>
              <p className="text-gray-400">
                {eventDetails.description ||
                  'Get ready to kick off the Christmas season with the Sound Of Christmas 2024. Join us for an exciting night of music, choir, and dance performances!'}
              </p>
            </div>
{/* Host Info */}
<div>
  <h1 className="font-extralight text-lg mb-2">Hosted by</h1>
  <p className="font-bold">
    {user.firstname} {user.lastname} - LogaXP Groups
  </p>
</div>

 {/* Sign In and Sign Up Buttons */}
<div className="mt-4 flex space-x-4">
  <button
    className="px-6 py-2 text-[#131610]  bg-[#8ec643]  rounded-md border border-[#8ec643]   font-semibold"
    onClick={handleSignInClick}
  >
    Sign In
  </button>
  <button
    className="px-4 py-2 text-white bg--[#8ec643] rounded-md border border-[#8ec643] hover:bg-[#8ec643] "
    onClick={handleSignUpClick}
  >
    Sign Up
  </button>
</div>
{/* Sign In Modal */}
{isSignInModalOpen && <SignInModal onClose={handleCloseModal} />}
{/* Sign Up Modal */}
{isSignUpModalOpen && <SignUpModal onClose={handleCloseModal} />}

    </div>

{/* Right Section */}
<div className="w-full lg:w-1/2 max-w-[300px] ml-auto bg-[#1b2634] border-[#9EDD45] rounded-lg p-6 border-2">
      {/* Date and Time */}
      <div className="mb-4">
        <h2 className="font-bold text-xl mb-1">Date and Time</h2>
        <p className="text-gray-400 text-sm mb-2">this is a multiple session event</p>

        {/* Session 1 */}
        <div>
          <p className="flex items-center font-semibold">
            <IoTicketSharp className="text-white mr-2" /> Session1 (name of event)
          </p>
          <p className="flex items-center mt-1">
            <SlCalender className=" mr-2" /> Saturday, 2 December 2023
          </p>
          <p className="flex items-center mt-1">
            <IoTimeOutline className=" mr-2" /> 6:30 PM - 9:30 PM
          </p>
        </div>

        {/* Additional Sessions */}
        {showMore && (
          <>
            {/* Session 2 */}
            <hr className="border-t border-gray-500 my-4" />
            <div>
              <p className="flex items-center font-semibold">
                <IoTicketSharp className="text-white mr-2" /> Session2 (name of event)
              </p>
              <p className="flex items-center mt-1">
                <SlCalender className="text-[#9EDD45] mr-2" /> Saturday, 2 December 2023
              </p>
              <p className="flex items-center mt-1">
                <IoTimeOutline className="text-[#9EDD45] mr-2" /> 6:30 PM - 9:30 PM
              </p>
            </div>

            {/* Session 3 */}
            <hr className="border-t border-gray-500 my-4" />
            <div>
              <p className="flex items-center font-semibold">
                <IoTicketSharp className="text-white mr-2" /> Session3 (name of event)
              </p>
              <p className="flex items-center mt-1">
                <SlCalender className="text-[#9EDD45] mr-2" /> Saturday, 2 December 2023
              </p>
              <p className="flex items-center mt-1">
                <IoTimeOutline className="text-[#9EDD45] mr-2" /> 6:30 PM - 9:30 PM
              </p>
            </div>
          </>
        )}

        {/* View More / View Less */}
        <p
          className="text-[#9EDD45] underline mt-4 flex items-center justify-end cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? (
            <>
              view less <IoChevronUpSharp className="ml-1" />
            </>
          ) : (
            <>
              view more <IoChevronDownSharp className="ml-1" />
            </>
          )}
        </p>
      </div>

      {/* Divider Line */}
      <hr className="border-t border-gray-500 my-4" />

      {/* Ticket Information */}
      <div>
        <h2 className="font-bold text-xl mb-2">Ticket Information</h2>
        <p className="text-gray-400 text-sm mb-2">
          Numbers of Tickets <span className="text-[#9EDD45] font-semibold">200,000</span>
        </p>
        <div className="space-y-2">
          <p className="flex items-center justify-between">
            <span className="flex items-center">
              <IoTicketSharp className="text-white mr-2" /> Standard Ticket
            </span>
            <span className="text-yellow-400 font-semibold">₦ 200 each</span>
          </p>

          <p className="flex items-center justify-between">
            <span className="flex items-center">
              <IoTicketSharp className="text-white mr-2" /> VIP Ticket
            </span>
            <span className="text-yellow-400 font-semibold">₦ 3,000 each</span>
          </p>

          <p className="flex items-center justify-between">
            <span className="flex items-center">
              <IoTicketSharp className="text-white mr-2" /> Reserved
            </span>
            <span className="text-yellow-400 font-semibold">₦ 4,000,000 each</span>
          </p>
        </div>
      </div>
    </div>


        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button className="bg-gray-600 px-4 py-2 rounded-md text-white">Save for Later</button>
          <button
            onClick={handleCreateEvent}
            className="bg-[#9EDD45] text-black px-4 py-2 rounded-md font-bold"
          >
            Publish Event
          </button>
        </div>




        {/* Location */}
<div className="mt-4">
  <h2 className="font-semibold text-lg mb-2">Location</h2>
  <p className="flex items-center mb-4">
    <IoLocationOutline className="mr-2" />
    {eventDetails.state?.name || '02 Arena, London West'}
  </p>
  {/* Map Image */}
  <div className="relative rounded-lg overflow-hidden">
    <Image
      src="/Map (1).png"
      alt="Event Location Map"
      width={400}
      height={200}
      className="w-full h-auto object-cover"
    />
  </div>
</div>
      </div>
    </div>
  );
};

export default PreviewEvent;
