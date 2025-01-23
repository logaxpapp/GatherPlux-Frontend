import React from "react";
import Image from "next/image";

// Define the prop types for the component
interface EventDescriptionProps {
  onOpenModal: () => void; // Function prop to toggle modal
}

const EventDescription: React.FC<EventDescriptionProps> = ({ onOpenModal }) => {
  return (
    <div
      className='bg-[#020e1e] py-10 px-10 relative '
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.8,
      }}
    >
      {/* Image Section */}
      <div className='mb-8 flex justify-center mt-10' >
        <Image
          height={400}
          width={1400}
          src='/sunday.png' // Replace with the actual image path
          alt='Event Banner'
          className='rounded-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 '>
        {/* Left Content */}
        <div>
          {/* Event Description */}
           

<div className='mb-8'>
<div className="flex items-center mb-4">
  <h2 className="text-2xl font-bold">Event Description</h2>
   
  <div className="flex md:pl-44 lg:pl-72">
    <Image 
      src="/star (2).png" 
      alt="Star Icon" 
      width={54} 
      height={54} 
      className="mr-2"
    />
    <Image 
      src="/share (2).png" 
      alt="Share Icon" 
      width={54} 
      height={54} 
      className="mr-2"
    />
  </div>
</div>

  <p className='text-base mb-4'>
    Get ready to kick off the Christmas season in Mumbai with{' '}
    <strong>SOUND OF CHRISTMAS</strong> - your favourite{' '}
    <strong>LIVE Christmas concert!</strong>
  </p>
  <p className='text-base mb-4 italic'>
    City Youth Movement invites you to the 4th edition of our annual
    Christmas festivities - by the youth and for the youth! Feat. your
    favourite worship leaders, carols, quizzes and some exciting
    surprises!
  </p>
  <p className='text-base'>
    Bring your family and friends and sing along your favourite
    Christmas carols on the 2nd of December, 6:30 PM onwards at the
    Bal Gandharva Rang Mandir, Bandra West. Book your tickets now!
  </p>
</div>


          {/* Reasons to Attend */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>
              3 Reasons to attend the event:
            </h3>
            <ul className='list-decimal list-inside space-y-2'>
              <li>The FIRST Christmas concert of Mumbai!</li>
              <li>A Special Christmas Choir!</li>
              <li>Special Dance performances and many more surprises!</li>
            </ul>
          </div>

          {/* Tags Section */}
          <div className='mb-10'>
            <h3 className='text-xl font-semibold mb-4'>Tags</h3>
            <div className='flex flex-wrap gap-3'>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                Holiday Concert
              </span>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                Live Performance
              </span>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                Seasonal Event
              </span>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                Family-Friendly
              </span>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                #Christmas_Spirit
              </span>
              <span className='border border-gray-700 text-white px-4 py-2 rounded-full text-sm'>
                #Christmas_Carols
              </span>
            </div>
          </div>
        </div>





{/* Ticket Section */}
<div className="p-6 rounded-lg border border-[#9edd45] bg-[#1c2b37] bg-opacity-80 lg:ml-36 ">
  <h3 className="text-xl font-bold text-white mb-4">Date and Time</h3>
  <div className="flex items-center text-sm text-white mb-2">
    <Image
      src="/uiw_date.svg" // Replace with actual icon
      alt="Calendar"
      className="mr-2"
      width={16}
      height={16}
    />
    Saturday, 2 December 2023
  </div>
  <div className="flex items-center text-sm text-white">
    <Image
      src="/icon-park-outline_time.svg" // Replace with actual icon
      alt="Clock"
      className="mr-2"
      width={16}
      height={16}
    />
    6:30 PM - 9:30 PM
  </div>
  <button className="text-[#9edd45] text-sm font-medium mt-4 pl-4">
    + Add to Calendar
  </button>
  <hr className="my-4 border-gray-600" />
  <h3 className="text-xl font-bold text-white mb-4">Ticket Information</h3>
  <p className="font-sm text-xs pb-3">How many tickets are you buying?</p>
  <div className="space-y-4">
    {[
      { type: "Standard Ticket", price: 200 },
      { type: "VIP Ticket", price: 3000 },
      { type: "Reserved", price: 4000 },
    ].map((ticket, index) => (
      <div
        key={index}
        className="flex items-center justify-between text-white"
      >
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/ion_ticket.svg" // Replace with actual ticket icon
              alt="Ticket"
              width={16}
              height={16}
            />
            <span className="font-medium">{ticket.type}</span>
          </div>
          <span className="text-md text-[#f1df2c] ml-6">
            ₦{ticket.price} each
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded border border-rose-50 w-8">
            +
          </button>
          <span className="text-white">0</span>
          <button className="text-[#9edd45] bg-gray-800 px-2 py-1 rounded border border-rose-50 w-8">
            -
          </button>
        </div>
        
      </div>
    ))}

    <p className="font-sm text-xs">Amounts of tickets (12)</p>
  </div>
  <hr className="my-4 border-gray-600" />
  <div className="flex justify-between items-center text-white text-2xl">
    <span>Total</span>
    <span className="font-bold">₦200</span>
    
  </div>
  <button
    className="bg-[#9edd45] text-black w-full py-2 rounded-lg mt-4 flex items-center justify-center gap-2"
    onClick={onOpenModal} // Trigger the modal via the prop
  >
    <Image
      src="/ticket.png" // Replace with actual icon
      alt="Buy Ticket"
      width={16}
      height={16}
    />
    Buy Tickets
  </button>
</div>










      </div>
    </div>
  );
}
export default EventDescription;