import Image from 'next/image';
import EventCard from './components/EventCard.component';

export default function Upcoming() {
  return (
    <div
      className='bg-[#0b1120]'
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
        backgroundSize: '100% 100%, 10px 10px, 10px 10px', // Grid size
        backgroundPosition: 'center',
      }}
    >
      {/* Hero section */}
      <div
        className='relative flex flex-col items-center justify-center text-white h-[707px]'
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content */}
        <div className='relative z-10 text-center px-4 sm:px-8'>
          <h1 className='text-[64px] font-normal leading-none mb-8'>
            Upcoming Events to <br />
            watch for
          </h1>
          <p className='pb-8'>
            Stay in the loop with the most anticipated events. Be the first to
            know when dates are announced!
          </p>
          {/* Updated Search Bar */}
          <div className='flex items-center bg-[#253f3f] rounded-full px-4 py-4 shadow-md w-full sm:w-auto space-x-4 max-w-2xl mx-auto text-white'>
            {/* Search Input */}
            <div className='flex items-center space-x-2 flex-grow'>
              <Image
                src='/Searchicon.png'
                alt='Search Icon'
                width={20}
                height={20}
              />
              <input
                type='text'
                placeholder='Search Events, Categories, Location...'
                className='flex-grow outline-none bg-transparent text-white placeholder-gray-300'
              />
            </div>

            {/* Location Dropdown */}
            <div className='flex items-center space-x-2 border-l border-gray-500 pl-4'>
              <Image
                src='/Locationicon.png' // Location icon image
                alt='Location Icon'
                width={20}
                height={20}
              />
              <select
                className='bg-transparent outline-none text-white cursor-pointer'
                aria-label='Select location'
              >
                <option value='lagos'>Lagos</option>
                <option value='abuja'>Abuja</option>
                <option value='new-york'>New York</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <EventCard />
    </div>
  );
}
