"use client";

 
import Image from "next/image";

const staticCategories = [
  { id: 1, name: "Music" },
  { id: 2, name: "Workshops" },
  { id: 3, name: "Conferences" },
];

const staticEvents = [
  {
    id: 1,
    images: ["/11.jpg"],
    category_id: 1,
    title: "Live Music Concert",
    start_date: "Mar 15",
    time: "7:00 PM",
    city: "New York",
    address: "Madison Square Garden",
    price: 50,
    likes: 120,
    description: "Immerse yourself in an electrifying night of live music, where top artists take the stage to deliver unforgettable performances. Feel the energy of the crowd, sing along to your favorite hits, and create memories that will last a lifetime. Join us at the iconic Madison Square Garden for an evening of rhythm, melody, and pure entertainment.",
    category: { name: "Music" },
  },
  {
    id: 2,
    images: ["/12.jpg"],
    category_id: 2,
    title: "Coding Bootcamp",
    start_date: "Apr 10",
    time: "10:00 AM",
    city: "San Francisco",
    address: "Tech Hub",
    price: 100,
    likes: 200,
    description: "Take your coding skills to the next level with our immersive bootcamp designed for aspiring developers. Learn the latest programming languages, collaborate on real-world projects, and receive mentorship from industry professionals.",
    category: { name: "Workshops" },
  },
  {
    id: 2,
    images: ["/15.jpg"],
    category_id: 3,
    title: "Coding Bootcamp",
    start_date: "Apr 10",
    time: "10:00 AM",
    city: "San Francisco",
    address: "Tech Hub",
    price: 100,
    likes: 200,
    description: "Take your coding skills to the next level with our immersive bootcamp designed for aspiring developers. Learn the latest programming languages, collaborate on real-world projects, and receive mentorship from industry professionals.",
    category: { name: "Workshops" },
  },

  {
    id: 4,
    images: ["/13.jpg"],
    category_id: 4,
    title: "Coding Bootcamp",
    start_date: "Apr 10",
    time: "10:00 AM",
    city: "San Francisco",
    address: "Tech Hub",
    price: 100,
    likes: 200,
    description: "Take your coding skills to the next level with our immersive bootcamp designed for aspiring developers. Learn the latest programming languages, collaborate on real-world projects, and receive mentorship from industry professionals.",
    category: { name: "Workshops" },
  },
];

const EventCard = () => {
  return (
    <div className="bg-[#020e1e] min-h-screen py-10 pb-56 pt-40">
     <div className="text-center mb-8 px-4">
  <h1 className="text-white text-2xl sm:text-4xl font-bold">
    Explore Exciting Categories
  </h1>
  <p className="text-white mt-4 max-w-2xl mx-auto">
    Discover a wide variety of event categories tailored to your interests. Whether you&apos;re into live music, hands-on workshops, inspiring conferences, or something entirely unique, there&apos;s something for everyone. Browse through different categories to find the perfect event that matches your passion and curiosity.
  </p>
</div>


      <div className="flex justify-center gap-4 flex-wrap mb-8">
        {staticCategories.map((category, index) => (
          <button
            type="button"
            key={category.id}
            className={`px-8 py-2 rounded-full text-sm font-semibold ${
              index === 0 ? "bg-[#9edd45] text-black" : "border border-gray-800 text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
  {staticEvents.map((event) => (
    <div key={event.id} className="flip-card">
      <div className="flip-card-inner">
        
        {/* Front of Card */}
        <div className="flip-card-front flex flex-col h-full">
          <div className="relative w-full h-[250px]">
            <Image
              src={event.images[0]}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 bg-gray-800 flex-1 flex flex-col justify-center items-center">
            <span className="bg-[#9edd45] text-black text-xs font-semibold px-2 py-1 rounded">
              {event.category.name}
            </span>
            <h3 className="text-white font-[600] text-lg mt-2">{event.title}</h3>
            <p className="text-gray-400 text-sm">{event.city} | {event.time}</p>
          </div>
        </div>

        {/* Back of Card (Description in Middle) */}
        <div className="flip-card-back bg-gray-900 text-white flex flex-col justify-center items-center p-6 rounded-lg min-h-full">
          <p className="text-center text-sm leading-relaxed opacity-80">
            {event.description}
          </p>
        </div>

      </div>
    </div>
  ))}
</div>

<style jsx>{`
  .flip-card {
    perspective: 1000px;
    width: 100%;
    max-width: 400px;
    height: 350px; /* Ensure both front and back match */
  }

  .flip-card-inner {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    position: relative;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .flip-card-front {
    background-color: #333;
  }

  .flip-card-back {
    background-color: #222;
    transform: rotateY(180deg);
  }
`}</style>


    </div>
  );
};

export default EventCard;
