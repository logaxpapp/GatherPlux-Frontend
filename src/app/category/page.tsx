"use client";

import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "@/services/slices/category.slice";
// import Image from "next/image";
import { setCategories as setStateCategories } from "@/store/slices/category.slice";
import { useDispatch } from "react-redux";

interface CategoriesProps {
  id: number;
  name: string;
  description: string;
}

const Category: React.FC = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const { data: categoriesData } = useGetAllCategoriesQuery("");

  useEffect(() => {
    if (categoriesData && categoriesData.body) {
      setCategories(categoriesData.body);
      dispatch(setStateCategories(categoriesData.body));
    }
  }, [categoriesData, dispatch]);

  return (
    <div className="bg-[#020e1e] min-h-screen py-10 pb-56 pt-40">
      <div className="text-center mb-8 px-4">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">
          Explore Exciting Categories
        </h1>
        <p className="text-white mt-4 max-w-2xl mx-auto">
          Discover a wide variety of event categories tailored to your
          interests. Whether you&apos;re into live music, hands-on workshops,
          inspiring conferences, or something entirely unique, there&apos;s
          something for everyone. Browse through different categories to find
          the perfect event that matches your passion and curiosity.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 cursor-pointer">
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <div key={category.id} className="flip-card">
              <div className="flip-card-inner">
                {/* Front of Card */}
                <div className="flip-card-front flex flex-col h-full">
                  <div className="relative w-full h-[250px]">
                    {/* <Image
              src={event.images[0]}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            /> */}
                  </div>
                  <div className="p-4 bg-gray-800 flex-1 flex flex-col justify-center items-center">
                    <span className="bg-[#9edd45] text-black text-xs font-semibold px-2 py-1 rounded">
                      {category.name}
                    </span>
                    {/* <h3 className="text-white font-[600] text-lg mt-2">{event.title}</h3>
            <p className="text-gray-400 text-sm">{event.city} | {event.time}</p> */}
                  </div>
                </div>

                {/* Back of Card (Description in Middle) */}
                <div className="flip-card-back bg-gray-900 text-white flex flex-col justify-center items-center p-6 rounded-lg min-h-full">
                  <p className="text-center text-sm leading-relaxed opacity-80">
                    {category.description}
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

export default Category;
