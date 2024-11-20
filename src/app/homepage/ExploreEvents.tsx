"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
  src: string;
  label: string;
}

const ExploreEvents: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [imagesPerSlide, setImagesPerSlide] = useState(4);

  const images: ImageData[] = [
    { src: "/image 23.png", label: "Hair" },
    { src: "/image 23.png", label: "Barber" },
    { src: "/image 23.png", label: "Skin" },
    { src: "/image 23.png", label: "Hair removal" },
    { src: "/image 23.png", label: "Makeup" },
    { src: "/image 23.png", label: "Tattoo" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setImagesPerSlide(window.innerWidth < 640 ? 2 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - imagesPerSlide ? 0 : prevIndex + 1
    );
    setIsFirstClick(true);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - imagesPerSlide : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 mb-10 sm:mt-20 sm:mb-28">
      {/* Heading and Button */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Explore New Experiences Content</h2>
        <p className="text-gray-500 mb-4">
          Take a look at trending and upcoming events curated just for you. Our Explore feature lets you discover events you never knew you needed.
        </p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
          Explore Events &rarr;
        </button>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-[1300px] flex items-center relative">
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / imagesPerSlide)}%)`,
            }}

          >
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-[33.33%] px-4 mt-4 flex flex-col items-center"

              >
                <div className="w-full bg-[#1c2936] shadow-md rounded-lg p-4">
                  <Image
                    src={image.src}
                    alt={image.label}
                    width={200}
                    height={200}
                    className="rounded-t-lg w-full h-auto"
                  />
                  <div className="mt-2 text-center">
                    <p className="text-lg font-semibold">{image.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-4 rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center"
        >
          {''}
          <Image src="/arrowleft.png" alt="Previous slide" width={50} height={50} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-4 rounded-full shadow-lg  hover:bg-gray-100 flex items-center justify-center"
        >
          {''}
          <Image src="/arrow.png" alt="Next slide" width={50} height={50} />
        </button>
      </div>
    </div>
  );
};

export default ExploreEvents;
