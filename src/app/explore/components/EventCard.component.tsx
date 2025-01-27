import Image from 'next/image';
import { IoTicket, IoStar } from 'react-icons/io5';

export default function EventCard() {
  return (
    <div className="bg-[#1C2B37] p-4 rounded-md flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-[610px] mx-auto">
      {/* Image Section */}
      <div className="relative w-full md:w-[280px] lg:w-[300px] h-[180px]">
        <Image
          src="https://i.pinimg.com/736x/4b/92/43/4b924325613089a96886f1f64ce6d657.jpg"
          alt="Event Image"
          fill
          className="rounded-md object-cover"
        />
        <span className="bg-[#9EDD45] px-2 py-1 rounded-md text-black text-sm absolute bottom-2 left-2">
          Music & Concert
        </span>
      </div>

      {/* Text Section */}
      <div className="flex-1">
        <h3 className="font-semibold text-[20px] text-white leading-tight md:leading-snug">
          Event title that can go up to two lines
        </h3>
        <p className="text-[15px] text-gray-300 mt-2">Venue - NOV 22</p>
        <p className="text-[15px] text-gray-300">00:00 AM - 00:00 PM</p>

        {/* Info Section */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-start space-y-2 md:space-y-0 md:space-x-4 text-[15px] mt-4">
          {/* Ticket Info */}
          <div className="flex items-center space-x-1">
            <IoTicket className="text-[#5A5A5A]" />
            <p className="text-[#9EDD45]">₦ 499</p>
          </div>
          {/* Divider */}
          <div className="bg-white h-1 w-1 rounded-full hidden md:block" />
          {/* Interest Info */}
          <div className="flex items-center space-x-1">
            <IoStar className="text-[#FF8D07]" />
            <p className="text-white">10 interested</p>
          </div>
        </div>
      </div>
    </div>
  );
}
