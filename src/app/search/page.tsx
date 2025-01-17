'use strict';
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EventProps, formatDate } from '../homepage/EventCard';
import { useGetSearchedEventsQuery } from '@/services/slices/events.slice';

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [events, setEvents] = useState<EventProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { data: eventsSearchData } = useGetSearchedEventsQuery(query);

  useEffect(() => {
    setIsClient(true);

    if (eventsSearchData && eventsSearchData.body) {
      setEvents(eventsSearchData.body.events.records);
    }
  }, [eventsSearchData]);

  return (
    <div
      className='bg-[#020e1e] min-h-screen py-10 relative pb-56 mt-20'
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Section Heading */}
      <div className='text-center mb-8 px-4'>
        <h1 className='text-white text-4xl font-bold'>
          Search result for &quot;{query}&quot;
        </h1>
      </div>

      {/* Events Grid */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Link href={`/tickets/${event.id}`} key={event.id}>
              <div className='bg-gray-800 rounded-lg shadow-lg overflow-hidden relative'>
                {/* Image Section */}
                <div className='relative aspect-w-16 aspect-h-12'>
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-lg'
                  />
                </div>

                {/* Content Section */}
                <div className='p-4'>
                  <span className='bg-[#9edd45] text-black text-xs font-semibold px-2 py-1 rounded'>
                    {event.category_id}
                  </span>
                  <h3 className='text-white font-[600] text-[19.8px] text-lg mt-2 '>
                    {event.title}
                  </h3>
                  <p className='text-gray-400 text-sm mt-1'>{event.city}</p>
                  <p className='text-gray-400 text-sm'>{event.time}</p>
                  <div className='flex items-center justify-between mt-4'>
                    {/* Price Section */}
                    <div className='flex items-center'>
                      <Image
                        src='/ticket.png'
                        alt='Ticket Icon'
                        width={16}
                        height={190}
                        className='mr-2'
                      />
                      <p className='text-[#9edd45] font-bold'>₹{event.price}</p>
                    </div>

                    {/* Interested Section */}
                    <div className='flex items-center text-gray-400 text-sm'>
                      <Image
                        src='/Star 1.png'
                        alt='Star Icon'
                        width={16}
                        height={16}
                        className='mr-2'
                      />
                      <p>{event.likes} interested</p>
                    </div>
                  </div>
                </div>
                {/* Date Badge */}
                <div className='absolute top-4 left-4 bg-white text-black font-bold text-sm rounded-full w-12 h-12 flex items-center justify-center'>
                  {isClient ? formatDate(event.start_date) : event.start_date}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
