import React, { useEffect, useState } from 'react';
import {IoTimeOutline,IoTicketSharp,IoLocationOutline,IoChevronDownSharp,IoChevronUpSharp,
} from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import Image from 'next/image';
import { EventDetailsProps, SessionsProps, TicketEntry } from '../page';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import SignInModal from '@/components/modal/SignInModal';
import SignUpModal from '@/components/modal/signUpModal'; // Import SignUpModal
import { useLazyGetUserProfileQuery } from '@/services/slices/user.slice';
import { setUserDetails } from '@/store/slices/user.slice';
import Map from '@/components/Map';

interface PreviewEventProps {uploadedBanner: string | null; eventDetails: EventDetailsProps; sessions: SessionsProps[]; tickets: TicketEntry[];numberOfTickets: number | ''; eventType: string;
  isMultipleSession: boolean;
}

const PreviewEvent: React.FC<PreviewEventProps> = ({
  uploadedBanner, eventDetails, sessions, tickets, numberOfTickets, eventType, isMultipleSession,
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [getUserProfileQuery] = useLazyGetUserProfileQuery();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getUserProfileQuery('').unwrap();

      if (
        response &&
        response.code === 200 &&
        response.message === 'SUCCESSFUL'
      ) {
        dispatch(setUserDetails(response.body));
      }
    };

    if (
      user &&
      user.accessToken !== '' &&
      user.userDetails.firstname === '' &&
      user.userDetails.lastname === ''
    ) {
      fetchUserProfile();
    }
  }, [dispatch, eventDetails, getUserProfileQuery, user]);

  const [showMore, setShowMore] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
   
  // Handlers for modals
  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  

  return (
    <div className='min-h-screen bg-[#020e1e] text-white  sm:px-10 py-10'>
      {/* Event Card */}
      <div className='max-w-[1100px] mx-auto border border-[#9EDD45] rounded-xl p-6 bg-[#020e1e] shadow-md'>
        {/* Event Image */}
        <div className='relative w-full rounded-lg overflow-hidden mb-6'>
          {uploadedBanner ? (
            <Image
              src={uploadedBanner}
              alt='Event Banner'
              width={1200}
              height={500}
              className='w-full h-[300px] object-cover'
            />
          ) : (
            <Image
              src='/mnt/data/Screenshot (1168).png'
              alt='Default Event'
              width={1200}
              height={500}
              className='w-full h-[300px] object-cover'
            />
          )}
          <div className='absolute top-0 right-0 bg-[#9EDD45] text-black px-4 py-2 rounded-bl-lg font-bold'>
            LIVE EVENT
          </div>
        </div>

        {/* Event Details */}
        <div className='flex flex-wrap gap-6'>
          {/* Left Section */}
          <div className='w-full lg:w-1/2 space-y-6'>
            <h1 className='text-3xl font-bold text-[#fdfdfd]'>
              {eventDetails.title || 'Event Title'}
            </h1>

            {/* Description */}
            <div>
              <h2 className='font-semibold text-lg mb-2'>About the Event</h2>
              <p className='text-gray-400'>
                {eventDetails.description ||
                  'Event Description goes here. This is a brief description of the event. It should be short and concise.'}
              </p>
            </div>
            {/* Host Info */}
            <div>
              <h1 className='font-extralight text-lg mb-2'>Hosted by</h1>
              <p className='font-bold'>
                {user.userDetails.firstname} {user.userDetails.lastname}
              </p>
            </div>

            {/* Sign In and Sign Up Buttons */}
            {user &&
              user.userDetails.firstname === '' &&
              user.userDetails.lastname === '' && (
                <>
                  <div className='mt-4 flex space-x-4'>
                    <button
                      type='button'
                      className='px-6 py-2 text-[#131610]  bg-[#8ec643]  rounded-md border border-[#8ec643]   font-semibold'
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </button>
                    <button
                      type='button'
                      className='px-4 py-2 text-white bg--[#8ec643] rounded-md border border-[#8ec643] hover:bg-[#8ec643] '
                      onClick={handleSignUpClick}
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}

            {/* Sign In Modal */}
            {isSignInModalOpen && <SignInModal onClose={handleCloseModal} />}
            {/* Sign Up Modal */}
            {isSignUpModalOpen && <SignUpModal onClose={handleCloseModal} />}
          </div>

          {/* Right Section */}
          <div className='w-full lg:w-1/2 max-w-[300px] ml-auto bg-[#1b2634] border-[#9EDD45] rounded-lg p-6 '>
            {/* Date and Time */}
            <div className='mb-4'>
              <h2 className='font-bold text-xl mb-1'>Date and Time</h2>

              {/* Single Session */}
              {!showMore && (
                <div>
                  <p className='flex items-center mt-1'>
                    <SlCalender className='text-[#9EDD45] mr-2' />{' '}
                    {sessions[0].startDate
                      ? sessions[0].startDate.toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : ''}
                  </p>
                  <p className='flex items-center mt-1'>
                    <IoTimeOutline className='text-[#9EDD45] mr-2' />{' '}
                    {sessions[0].startTime} - {sessions[0].endTime}
                  </p>
                </div>
              )}

              {/* Additional Sessions */}
              {sessions &&
                sessions.length > 1 &&
                showMore &&
                sessions.map((session) => (
                  <div key={session.id}>
                    <hr className='border-t border-gray-500 my-4' />
                    <div>
                      <p className='flex items-center font-semibold'>
                        <IoTicketSharp className='text-white mr-2' />{' '}
                        {session.name}
                      </p>
                      <p className='flex items-center mt-1'>
                        <SlCalender className='text-[#9EDD45] mr-2' />{' '}
                        {session.startDate
                          ? session.startDate.toLocaleDateString('en-GB', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : ''}
                      </p>
                      <p className='flex items-center mt-1'>
                        <IoTimeOutline className='text-[#9EDD45] mr-2' />{' '}
                        {session.startTime} - {session.endTime}
                      </p>
                    </div>
                  </div>
                ))}

              {/* View More / View Less */}
              {isMultipleSession && (
                <p
                  className='text-[#9EDD45] underline mt-4 flex items-center justify-end cursor-pointer'
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? (
                    <>
                      view less <IoChevronUpSharp className='ml-1' />
                    </>
                  ) : (
                    <>
                      view more <IoChevronDownSharp className='ml-1' />
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Divider Line */}
            <hr className='border-t border-gray-500 my-4' />

            {/* Ticket Information */}
            <div>
              <h2 className='font-bold text-xl mb-2'>Ticket Information</h2>
              <p className='text-gray-400 text-sm mb-2'>
                Numbers of Tickets{' '}
                <span className='text-[#9EDD45] font-semibold'>
                  {numberOfTickets.toLocaleString() || 0}
                </span>
              </p>
              <div className='space-y-2'>
                {eventType === 'ticketed' &&
                  tickets.map((ticket, index) => (
                    <p
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <span className='flex items-center'>
                        <IoTicketSharp className='text-white mr-2' />{' '}
                        {ticket.name}
                      </span>
                      <span className='text-yellow-400 font-semibold'>
                        ₦ {ticket.price} each
                      </span>
                    </p>
                  ))}
                {eventType === 'free' && (
                  <p className='flex items-center'>
                    <span className='flex items-center'>
                      <IoTicketSharp className='text-white mr-2' />
                    </span>
                    <span className='text-[#9EDD45] font-semibold'>Free</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className='mt-4'>
          <h2 className='font-semibold text-lg mb-2'>Location</h2>
          <p className='flex items-center mb-4'>
            <IoLocationOutline className='mr-2' />
            {eventDetails.address}
          </p>
          {/* Map Image */}
          <div className='relative rounded-lg overflow-hidden'>
            <Map address={eventDetails.address} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewEvent;