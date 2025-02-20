"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ExploreEvents: React.FC = () => {
  const router = useRouter();

  // Function to handle the click event on the Explore Events button
  const handleExploreEvents = () => {
    router.push("/explore");
  };

  return (
    <div className="w-full bg-[#0B1120] text-white py-10 px-6">
      {/* Top Section */}
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Text and Button (Top Left) */}
        <div className="flex flex-col gap-8 max-w-md">
          <p className="text-lg font-thin">
            From concerts to conferences, find the perfect event and reserve
            your spot instantly.
          </p>
          <button
            type="button"
            className="bg-[#89E101] text-black px-4 py-2 w-48 rounded-lg hover:bg-green-600 transition flex flex-row-reverse items-center justify-center gap-2 whitespace-nowrap"
            onClick={handleExploreEvents}
          >
            <span>&rarr;</span>
            Explore Events
          </button>
        </div>
        {/* Vertical Images (Top Right) */}
        <div className="grid grid-cols-4 gap-4">
          {[
            "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/fqs2kxaj6c5xar966gmx",
            "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/b5eu22ajdehwwh4mjyjg",
            "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/zz2fbs6arqgiujrups17",
            "https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/bpwg1vh4iw4art7fdpif",
          ].map((src, index) => (
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
            src="https://res.cloudinary.com/dondkf6je/image/upload/f_auto,q_auto/v1/GatherPlux%20-%20Dev%20Images/cygjqqrodbmwznwqlqtv"
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
