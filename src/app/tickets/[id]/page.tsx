'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TicketPage from './components/TicketPage';
import LocationComponent from './components/LocationComponent';
import OtherEvents from './components/OtherEvents';
import AttendeeDetails from '@/components/modal/AttendeeDetails';
import { EventProps } from '@/app/homepage/EventCard';
import { useGetOneEventQuery } from '@/services/slices/events.slice';

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState<EventProps>({
    id: 0,
    images: [],
    category_id: 0,
    title: '',
    start_date: '',
    time: '',
    city: '',
    address: '',
    price: 0,
    likes: 0,
    description: '',
    tickets: [],
    sessions: [
      {
        id: 0,
        name: '',
        start_time: '',
        end_time: '',
      },
    ],
    user: {
      profile: {
        company: '',
        image_url: '',
      },
    },
  });

  const { data: eventApiData } = useGetOneEventQuery(id);

  useEffect(() => {
    if (eventApiData && eventApiData.body) {
      setEventData(eventApiData.body);
    }
  }, [eventApiData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='bg-[#020e1e] min-h-screen px-4 py-8 text-white'>
      {/* Pass the toggleModal function to TicketPage */}
      <TicketPage onOpenModal={toggleModal} event={eventData} />
      <LocationComponent
        location={eventData.address}
        eventHost={eventData.user.profile}
      />

      <OtherEvents id={id} />

      {/* Render AttendeeDetails Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <AttendeeDetails />
          <button
            type='button'
            onClick={toggleModal}
            className='absolute top-4 right-4 text-white text-3xl hover:text-red-500'
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
