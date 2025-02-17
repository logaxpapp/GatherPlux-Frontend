"use strict";
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/helpers/hooks/useDebounce";
import { useGetAllCountriesQuery } from "@/services/slices/state.slice";
import { CountryProp } from "@/app/create-event/types/types";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [canDebounce, setCanDebounce] = useState(false);
  const debouncedQuery: string = useDebounce(
    canDebounce ? searchQuery : "",
    300,
  );

  const [userCountry, setUserCountry] = useState("");
  const [countries, setCountries] = useState<CountryProp[]>([]);

  const { data: allCountries } = useGetAllCountriesQuery("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    if (value.length === 4) {
      setCanDebounce(true);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const country = JSON.parse(value);
    router.push(`/search?query=${country.name}`);
  };

  useEffect(() => {
    if (debouncedQuery && debouncedQuery?.length >= 4) {
      router.push(`/search?query=${debouncedQuery}`);
    }
  }, [debouncedQuery, router]);

  useEffect(() => {
    if (allCountries && allCountries.body) {
      setCountries(allCountries.body);
    }

    const getGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Use a reverse geocoding API to get the country name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await response.json();
            const countryName = data.address.country;

            // Find the country in your list
            const country = countries.find(
              (eachCountry) =>
                eachCountry.name.toLowerCase() === countryName.toLowerCase(),
            );

            if (country) {
              setUserCountry(JSON.stringify(country));
            }
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          },
        );
      }
    };

    getGeolocation();
  }, [allCountries, countries]);

  return (
    <div className="flex items-center bg-[#253f3f] rounded-full px-2 sm:px-4 py-2 sm:py-4 shadow-md w-full sm:w-auto space-x-2 sm:space-x-4 max-w-2xl mx-auto text-white">
      {/* Search Input */}
      <div className="flex items-center space-x-2 flex-grow">
        <Image
          src="/Searchicon.png" // Search icon image
          alt="Search Icon"
          width={14} // Reduced size for smaller screens
          height={14}
        />
        <input
          type="text"
          placeholder="Search Events, Categories, Location..."
          onChange={handleChange}
          value={searchQuery}
          className="flex-grow outline-none bg-transparent text-xs sm:text-base text-[#ffffff] placeholder-gray-300"
        />
      </div>

      {/* Location Dropdown */}
      <div className="flex items-center space-x-1 sm:space-x-2 border-l border-gray-500 pl-2 sm:pl-4">
        <Image
          src="/Locationicon.png" // Location icon image
          alt="Location Icon"
          width={14} // Reduced size for smaller screens
          height={14}
          className="shrink-0"
        />
        <select
          title="Select a country"
          className="bg-gray-800 outline-none text-xs sm:text-base text-white cursor-pointer max-w-[80px] sm:max-w-full rounded border border-gray-600 hover:border-gray-400 "
          defaultValue={userCountry || ""}
          onChange={handleCountryChange}
        >
          <option value="" disabled hidden>
            Select a country
          </option>
          {countries?.length ? (
            countries.map(({ name, code2 }) => (
              <option
                value={JSON.stringify({ name, code2 })}
                key={code2}
                className="bg-gray-700 text-white hover:bg-gray-600 pr-9"
              >
                {name}
              </option>
            ))
          ) : (
            <option disabled>No countries available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
