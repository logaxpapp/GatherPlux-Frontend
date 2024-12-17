import Image from 'next/image';

export default function EventDescription() {
  return (
    <div
      className='bg-[#020e1e] py-10 px-10 relative'
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.8,
      }}
    >
      {/* Image Section */}
      <div className='mb-8 flex justify-center'>
        <Image
          height={400}
          width={600}
          src='/sunday.png' // Replace with the actual image path
          alt='Event Banner'
          className='rounded-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Left Content */}
        <div>
          {/* Event Description */}
          <div className='mb-8'>
            <h2 className='text-2xl font-bold mb-4'>Event Description</h2>
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
        <div className='bg-[#0b1a30] p-6 rounded-lg'>
          <h3 className='text-lg font-bold text-white mb-4'>Date and Time</h3>
          <div className='flex items-center text-sm text-gray-400 mb-2'>
            <Image
              src='/calendar-icon.png' // Replace with actual icon
              alt='Calendar'
              className='mr-2'
              width={16}
              height={16}
            />
            Saturday, 2 December 2023
          </div>
          <div className='flex items-center text-sm text-gray-400'>
            <Image
              src='/clock-icon.png' // Replace with actual icon
              alt='Clock'
              className='mr-2'
              width={16}
              height={16}
            />
            6:30 PM - 9:30 PM
          </div>
          <button className='text-[#9edd45] text-sm font-medium mt-4'>
            + Add to Calendar
          </button>
          <hr className='my-4 border-gray-600' />
          <h3 className='text-lg font-bold text-white mb-4'>
            Ticket Information
          </h3>
          <div className='space-y-4'>
            {[
              { type: 'Standard Ticket', price: 200 },
              { type: 'VIP Ticket', price: 3000 },
              { type: 'Reserved', price: 4000 },
            ].map((ticket, index) => (
              <div
                key={index}
                className='flex items-center justify-between text-white'
              >
                <div className='flex items-center gap-2'>
                  <Image
                    src='/ticket-icon.png' // Replace with actual ticket icon
                    alt='Ticket'
                    width={16}
                    height={16}
                  />
                  <span className='font-medium'>{ticket.type}</span>
                  <span className='text-sm text-gray-400'>
                    ₦{ticket.price} each
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <button className='text-[#9edd45] bg-gray-800 px-2 py-1 rounded'>
                    +
                  </button>
                  <span className='text-white'>0</span>
                  <button className='text-[#9edd45] bg-gray-800 px-2 py-1 rounded'>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <hr className='my-4 border-gray-600' />
          <div className='flex justify-between items-center text-white'>
            <span>Total</span>
            <span className='font-bold'>₦0</span>
          </div>
          <button className='bg-[#9edd45] text-black w-full py-2 rounded-lg mt-4 flex items-center justify-center gap-2'>
            <Image
              src='/buy-ticket-icon.png' // Replace with actual icon
              alt='Buy Ticket'
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
