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

  const handleAddToWishlist = (destinationId) => {
    console.log(`Added destination ${destinationId} to wishlist`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">More Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className="rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={destination.thumbnail_picture}
                alt={destination.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{destination.title}</h3>
              <p className="text-sm text-gray-600">
                {destination.city}, {destination.country}
              </p>
              <p className="text-sm mt-2">{destination.description}</p>
              <div className="mt-4 flex flex-wrap">
                {destination.speciality.split(", ").map((speciality, index) => (
                  <span
                    key={index}
                    className={`text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2 ${
                      specialityColors[index % specialityColors.length]
                    }`}
                  >
                    {speciality}
                  </span>
                ))}
              </div>
              <p className="mt-2">
                Reviews: {destination.review_count}, Average Rating:{" "}
                {destination.average_rating}
              </p>
              <div className="mt-2">
                <h4 className="text-md font-semibold">Comments:</h4>
                {destination.comments.map((comment, index) => (
                  <div key={index} className="mt-1">
                    <p className="text-sm">
                      <strong>{comment.user}</strong>: {comment.comment} (
                      {comment.rating}/5)
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <button
                  onClick={() => handleAddToWishlist(destination.id)}
                  className="flex items-center text-gray-900 hover:text-blue-500"
                >
                  <svg
                    className="h-5 w-5 fill-current mr-1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Add to Wishlist
                </button>
                <Link href={`/common/destinations/${destination?.id}`}>
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
