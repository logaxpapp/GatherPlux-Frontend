import Image from 'next/image';
import React from 'react';

// interface Props {
//   image: string | null;
//   email: string;
//   firstname: string;
//   lastname: string;
//   phone: string;
//   address: string;
//   isLoading: boolean;
//   handleUpdateProfile: () => void;
//   handleAllOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   triggerFilePicker: () => void;
//   fileInputRef: React.RefObject<HTMLInputElement>;
//   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const Bookmarks: React.FC = () => {
  return (
    <div className='min-h-screen bg-[#020e1e] flex justify-center text-white'>
      <div className='w-full max-w-6xl bg-[#020e1e] rounded-lg shadow-md flex flex-col lg:flex-row'>
        {/* Right Content Area */}
        <div className='w-full pl-6 flex flex-col'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold text-white'>My Bookmarks</h2>
          </div>

          <div className='flex justify-between border-[rgb(44,62,80)] mb-4 pb-2'>
            <button type='button' className='text-[#93d437] font-bold'>
              Bookmarked
            </button>
          </div>

          {/* Event Cards */}
          <div className='space-y-4 flex-grow'>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                {/* Card Content */}
                <div className='flex items-center justify-between pb-4'>
                  {/* Event Details with Blue Background */}
                  <div className='flex items-center space-x-4 bg-[#243447] p-4 max-w-[100%] rounded-md'>
                    <Image
                      src='https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/yaw62wote2cdswpucoqq'
                      alt='Event Thumbnail'
                      width={200}
                      height={200}
                      className='rounded-lg'
                    />
                    <div className='flex-1'>
                      <h3 className='text-white font-bold text-sm'>
                        Event title that can go up to two lines
                      </h3>
                      <p className='text-[#a5b0c1] text-xs'>
                        Venue - NOV 22
                        <br />
                        08:00 AM - 06:00 PM
                      </p>
                      <p className='text-[#93d437] text-xs mt-1'>
                        ₹499 • <span className='text-orange-500'>★</span>{' '}
                        <span className='text-white'>10 Interested</span>
                      </p>
                    </div>
                  </div>

                  {/* Separate Button */}
                  <button className='ml-4 bg-[#93d437] text-black font-bold px-6 py-2 rounded-full hover:bg-[#a4de4a]'>
                    Remove from Bookmarks
                  </button>
                </div>

                {/* Thin Separator Line */}
                {index < 3 && <div className='border-b border-[#2c3e50]'></div>}
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className='mt-auto flex justify-between space-x-4'>
            <button
              type='button'
              className='bg-[#93d437] text-black font-bold px-6 py-3 rounded-md hover:bg-[#a4de4a]'
            >
              Manage All Bookmarks
            </button>
            <button
              type='button'
              className='bg-red-500 text-white font-bold px-6 py-3 rounded-md hover:bg-red-600'
            >
              Clear All Bookmarks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
