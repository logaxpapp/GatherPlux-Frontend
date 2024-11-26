"use client";

import Image from "next/image";

const ExploreEvents: React.FC = () => {
  return (
    <div className="w-full bg-[#0B1120] text-white py-10 px-6">
{/* Top Section */}
<div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
  {/* Text and Button (Top Left) */}
  <div className="flex flex-col gap-8 max-w-md">
    <p className="text-lg font-thin">
      From concerts to conferences, find the perfect event and reserve your spot instantly.
    </p>
    <button className="bg-[#89E101] text-black px-4 py-2 w-48 rounded-lg hover:bg-green-600 transition flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap">
      <span>&rarr;</span>
      Explore Events
    </button>
  </div>
  {/* Vertical Images (Top Right) */}
  <div className="grid grid-cols-4 gap-4">
    {["/6.png", "/7.png", "/8.png", "/9.png"].map((src, index) => (
      <div key={index} className="w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={`Event ${index + 1}`}
          width={200}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>

{/* Bottom Gallery Section */}
<div className="w-full mt-10">
  <div className="w-full h-auto overflow-hidden">
    <Image
      src="/group.png"
      alt="Event Gallery Group Image"
      width={1200}
      height={800}
      className="w-full h-full object-cover"
    />
  </div>
</div>      
    </div>
  );
};

export default ExploreEvents;
