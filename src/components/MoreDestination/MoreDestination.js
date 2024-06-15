import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const MoreDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "https://elitehaven-backend.onrender.com/public/advertisements/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDestinations();
  }, []);

  const displayedDestinations = showAll
    ? destinations
    : destinations.slice(0, 4);

  const specialityColors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-gray-200",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">More Destinations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedDestinations.map((destination) => (
          <div
            key={destination.id}
            className="hover:shadow-xl transition duration-300 ease-in-out overflow-hidden rounded-lg shadow-md relative"
          >
            <a href={destination.url} className="block bg-white">
              <div className="relative pb-2/3">
                <Image
                  className="w-full h-full object-cover"
                  src={destination?.thumbnail_picture}
                  alt={destination?.title}
                  width={200}
                  height={200}
                />
                {destination.highlight && (
                  <span className="absolute top-0 right-0 m-4 px-2 py-1 bg-orange-200 text-orange-800 rounded-full font-semibold text-xs uppercase tracking-wide z-10">
                    Highlight
                  </span>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 leading-tight">
                  {destination?.title}
                </h2>
                <p className="text-sm mb-4">{destination.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-sm font-semibold">ab</span>
                  <span className="ml-1 text-xl font-bold">
                    {destination.price}
                  </span>
                  <span className="ml-1 text-sm font-semibold">€</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  {destination.map_location && (
                    <a
                      href={destination.map_location}
                      className="flex items-center mr-4 text-gray-900 hover:text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 fill-current mr-1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2C7.03 2 3 6.03 3 11a8.2 8.2 0 0 0 1.88 5.27L12 22l7.12-5.73A8.2 8.2 0 0 0 21 11c0-4.97-4.03-9-9-9zm0 13c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                      View on Map
                    </a>
                  )}
                  {destination.discount && (
                    <span className="flex items-center">
                      <i className="far fa-address-card fa-fw mr-1"></i>{" "}
                      Ermäßigung mit Karte
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap mt-2">
                  {destination.speciality &&
                    destination.speciality.split(",").map((item, index) => (
                      <span
                        key={index}
                        className={`inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full ${
                          specialityColors[index % specialityColors.length]
                        }`}
                      >
                        {item.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </a>
            <div className="flex items-center mb-2 text-sm text-gray-700">
              <button
              // href={`/wishlist/${destination.id}`}
              >
                <p className="flex items-center mr-4 text-gray-900 hover:text-blue-500">
                  <svg
                    className="h-5 w-5 fill-current mr-1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Add to Wishlist
                </p>
              </button>
              <Link href={`/details/${destination.id}`}>
                <p className="flex items-center hover:text-blue-500">
                  <svg
                    className="h-5 w-5 fill-current mr-1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 13h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V7h8v2z" />
                  </svg>
                  See Details
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {!showAll && (
        <div className="text-center mt-8">
          <Link
            href="/common/destinations"
            className="text-blue-500 hover:text-blue-700"
          >
            <button className="inline-block px-6 py-3 text-sm font-medium leading-5 text-white uppercase transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700">
              See More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MoreDestination;
