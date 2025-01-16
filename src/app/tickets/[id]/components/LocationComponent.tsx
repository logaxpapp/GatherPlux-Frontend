import Map from '@/components/Map';
import Image from 'next/image';

interface LocationProps {
  location: string;
  eventHost: {
    company: string;
    image_url: string;
  };
}

export default function LocationComponent({
  location,
  eventHost,
}: LocationProps) {
  return (
    <div
      className='bg-[#020e1e] py-10 px-10 relative'
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='mx-auto max-w-7xl'>
        {/* Location Section */}
        <div className='max-w-4xl mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Location</h2>
          <p className='text-base font-light flex items-center'>
            <Image
              src='/Locationicon.png'
              alt='Location Icon'
              width={20}
              height={20}
              className='mr-2 mb-4'
            />
            {location}
          </p>
          <div className='mt-6'>
            {/* Map Image or Embed */}
            <Map address={location} />
          </div>
        </div>

        {/* Hosted By Section */}
        <div className='max-w-4xl mt-8'>
          <h3 className='text-xl font-semibold mb-4'>Hosted by</h3>
          <div className='flex items-center'>
            <Image
              src={eventHost.image_url || '/banner.png'}
              alt='Host Logo'
              width={50}
              height={50}
            />
            <div className='ml-4'>
              <h4 className='text-lg font-bold'>{eventHost.company}</h4>
              <div className='flex gap-4 mt-2'>
                <button
                  type='button'
                  className='border border-[#9edd45] text-[#9edd45] px-4  rounded-lg font-medium'
                >
                  Contact
                </button>
                <button
                  type='button'
                  className='bg-[#9edd45] text-black px-5 rounded-lg font-medium'
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
