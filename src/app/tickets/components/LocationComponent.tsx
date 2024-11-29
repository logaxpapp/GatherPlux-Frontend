import Image from 'next/image';

export default function LocationComponent() {
  return (
    <div
      className="bg-[#020e1e] py-10 px-10 relative"
      style={{
        backgroundImage: "url('/Line.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Location Section */}
        <div className="max-w-4xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <p className="text-base font-light flex items-center">
            <Image
              src="/Locationicon.png"
              alt="Location Icon"
              width={20}
              height={20}
              className="mr-2 mb-4"
            />
            Bal Gandharva Rang Mandir, Near Junction Of 24th & 32nd Road & Patwardhan Park,
            Off Linking Road, Bandra West, Mumbai, India
          </p>
          <div className="mt-6">
            {/* Map Image or Embed */}
            <Image
              src="/Map (1).png" // Replace with an actual map image or iframe
              alt="Location Map"
              width={700}
              height={300}
              className="rounded-lg max-w-full"
            />
          </div>
        </div>

        {/* Hosted By Section */}
        <div className="max-w-4xl mt-8">
          <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
          <div className="flex items-center">
            <Image
              src="/Host Profile Image.png" // Replace with host profile/logo image
              alt="City Youth Movement Logo"
              width={50}
              height={50}
            />
            <div className="ml-4">
              <h4 className="text-lg font-bold">City Youth Movement</h4>
              <div className="flex gap-4 mt-2">
                <button className="border border-[#9edd45] text-[#9edd45] px-4  rounded-lg font-medium">
                  Contact
                </button>
                <button className="bg-[#9edd45] text-black px-5 rounded-lg font-medium">
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
