import React from 'react';
// import { useSelector } from 'react-redux';
import { IoTimeOutline, IoTicketSharp, IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { EventDetailsProps } from '../page';
// import { RootState } from '';
import Image from 'next/image';

interface PreviewEventProps {
  selectedFile: File | null;
  eventDetails: EventDetailsProps;
  handleCreateEvent: () => void;
}

const PreviewEvent: React.FC<PreviewEventProps> = ({ selectedFile, eventDetails, handleCreateEvent }) => {

  // const user = useSelector((state: RootState) => state.user.userDetails);
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@email.com',
    phone: '08012345678',
  };

  return (
    <div className="px-20">
      <p className="mb-10">Nearly there! Check everything&apos;s correct.</p>
      <div className="w-8/12 mx-auto p-4 bg-white border rounded-lg shadow-md">
        {/* Event Image */}
        <div className="mb-4">
          <div className="w-full h-[570px] bg-gray-200 rounded-md flex items-center justify-center">
            {selectedFile ? (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Event Banner"
                width={570}
                height={500}
                className="rounded-md h-[570px]" />
            ) : (
              <span className="text-gray-500">No Image Selected</span>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-black">{eventDetails.title || 'Event Title'}</h2>
          <div className="mt-6 flex justify-between">
            <div className="flex flex-col space-y-2">
              <h3 className="font-bold text-lg text-gray-700">Date and Time</h3>
              <div className="flex flex-col space-y-2 text-black">
                <p className="flex items-center"><SlCalender className="pr-2 text-xl" /> Day, Date</p>
                <p className="flex items-center"><IoTimeOutline className="pr-2 text-xl" /> Time</p>
              </div>
              <div className="flex">
                <p className="pr-5"> </p>
                <a href="#" className="text-blue-500 text-sm">+ Add to Calendar</a>
              </div>
            </div>
            <div className='text-black'>
              <h3 className="font-bold text-lg">Ticket Information</h3>
              <p className="flex items-center"><IoTicketSharp className="mr-2" /> {eventDetails.type === 'ticketed' ? 'Ticketed' : 'Free'}</p>
            </div>
          </div>
        </div>

        {/* Event Location */}
        <div className="my-6">
          <h3 className="font-bold text-gray-700 text-lg">Location</h3>
          <p className="text-gray-600 my-4 flex items-center"><IoLocationOutline className="mr-2" />{eventDetails.state?.name || 'Address'}</p>
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Map Placeholder</span>
          </div>
        </div>

        {/* Host Info */}
        <div className="my-6 text-black">
          <h3 className="font-bold pb-4 text-lg">Hosted by</h3>
          <div className="flex space-x-1">
            <div className="w-16 h-18 bg-gray-300 rounded-md mr-3"></div>
            <div>
              <h3 className="font-semibold">{user.firstname}</h3>
              <div className="flex space-x-2 mt-2">
                <button type="button" className="border border-[#2B293D] rounded-md px-2 py-1 text-sm">Contact</button>
                <button type="button" className="text-white bg-black px-2 py-1 rounded-md text-sm">+ Follow</button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="my-6">
          <h3 className="font-bold text-gray-700 text-lg">Event Description</h3>
          <p className="text-gray-600 text-sm mt-2">
            {eventDetails.description ||
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.'}
          </p>
        </div>

      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button type="button" className="px-6 py-2 bg-yellow-400 text-white rounded-md">Save for Later</button>
        <button type="button" className="px-6 py-2 bg-[#9EDD45] text-white rounded-md" onClick={handleCreateEvent}>Publish Event</button>
      </div>
    </div>
  );
};

export default PreviewEvent;