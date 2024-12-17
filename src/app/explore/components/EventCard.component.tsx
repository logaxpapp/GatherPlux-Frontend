import Image from 'next/image';
import { IoTicket, IoStar } from 'react-icons/io5';

export default function EventCard() {
  return (
    <div className='bg-[#1C2B37] p-4 rounded-md flex items-center space-x-4 w-[610px] h-[228px]'>
      <div className='relative'>
        <Image
          height={180}
          width={300}
          src='https://i.pinimg.com/736x/4b/92/43/4b924325613089a96886f1f64ce6d657.jpg'
          alt='Event Image'
          className='rounded-md'
        />
        <span className='bg-[#9EDD45] px-2 rounded-md text-black absolute bottom-0 left-0'>
          Music & Concert
        </span>
      </div>
      <div>
        <h3 className='font-semibold text-[20px]'>
          Event title that can go up to two lines
        </h3>
        <p className='text-[15px]'>Venue - NOV 22</p>
        <p className='text-[15px]'>00:00 AM - 00:00 PM</p>
        <div className='flex items-center space-x-2 text-[15px]'>
          <div className='flex items-center space-x-1'>
            <IoTicket className='text-[#5A5A5A]' />
            <p className='text-[#9EDD45]'>₦ 499</p>
          </div>
          <div className='bg-white h-1 w-1 rounded-full' />
          <div className='flex items-center space-x-1'>
            <IoStar className='text-[#FF8D07]' />
            <p>10 interested</p>
          </div>
        </div>
      </div>
    </div>
  );
}
