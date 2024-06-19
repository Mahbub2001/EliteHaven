"use client";

import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "@/components/Dashboard_Layout/Dashboard_layout";
import { AuthContext } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast"; 

function My_Advertisements() {
  const { user, loading,change,setChange } = useContext(AuthContext);
  const [advertisements, setAdvertisements] = useState([]);
  const [confirmation, setConfirmation] = useState(null); 
  const token = localStorage.getItem("elite_token");

  useEffect(() => {
    const fetchadddata = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `https://elitehaven-backend.onrender.com/public/advertisements/?host_id=${user}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch advertisements data");
          return;
        }

        const data = await response.json();
        setAdvertisements(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchadddata();
  }, [user,change]);

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 fill-current ${
            i < averageRating ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1.38l2.56 5.62 6.25.56c1.47.13 2.07 2 1 2.98l-4.54 4.39 1.07 6.18c.25 1.47-1.28 2.58-2.65 1.85L10 17.13l-5.71 3.02c-1.38.73-2.9-.38-2.65-1.85l1.07-6.18L.19 10.54c-1.07-.98-.47-2.85 1-2.98l6.25-.56L10 1.38zM10 0l2.56 5.62 6.25.56c1.47.13 2.07 2 1 2.98l-4.54 4.39 1.07 6.18c.25 1.47-1.28 2.58-2.65 1.85L10 17.13l-5.71 3.02c-1.38.73-2.9-.38-2.65-1.85l1.07-6.18L.19 10.54c-1.07-.98-.47-2.85 1-2.98l6.25-.56L10 0z" />
        </svg>
      );
    }
    return stars;
  };

  const handleDelete = async (advertisementId) => {
    try {
      const response = await fetch(
        `https://elitehaven-backend.onrender.com/advertisements/${advertisementId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        console.error("Failed to delete advertisement");
        return;
      }
  
      setAdvertisements((prevAds) =>
        prevAds.filter((ad) => ad.id !== advertisementId)
      );
      toast.success("Advertisement deleted successfully");
      setConfirmation(null);
      setChange(!change);
  
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const handleDeleteConfirmation = (advertisementId) => {
    setConfirmation(advertisementId); 
  };

  const handleCancelDelete = () => {
    setConfirmation(null); 
  };

  return (
    <DashboardLayout>
      <div>
        <AnimatePresence>
          {loading ? (
            <div className="text-center mt-4">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            advertisements.map((destination) => (
              <motion.div
                key={destination.id}
                className="md:grid grid-cols-12 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="col-span-2 sm:col-span-2">
                  <div className="h-[100%]">
                    <img
                      className="rounded-sm h-[100%] w-full object-cover"
                      src={destination.thumbnail_picture}
                      alt={destination.title}
                    />
                  </div>
                </div>
                <div className="col-span-8 sm:col-span-8">
                  <div className="text-sm md:text-1xl flex flex-col md:flex-row items-center">
                    <div>
                      {destination.speciality && (
                        <div className="m-4 space-x-2 flex flex-col md:flex-row gap-2">
                          {destination.speciality
                            .split(",")
                            .slice(0, 2)
                            .map((item, index) => (
                              <p
                                key={index}
                                className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full font-semibold text-xs uppercase tracking-wide"
                              >
                                {item.trim()}
                              </p>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center ml-4 border-l pl-4">
                      <div className="flex items-center">
                        {renderStars(destination.average_rating)}
                        <span className="ml-2 text-xs text-gray-600">
                          ({destination.review_count} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4">
                    <h2 className="text-lg font-bold mb-1 leading-tight">
                      {destination.title}
                    </h2>
                    <p className="text-sm mb-1">{destination.description}</p>
                    <div className="flex text-sm gap-5 text-gray-500 font-bold items-center">
                      <p>Location: {destination?.city}</p>
                      <p>{destination?.country}</p>
                      <Link
                        className="text-green-500"
                        href={`/common/destinations/${destination?.id}`}
                      >
                        See Details
                      </Link>
                      <Link
                        className="text-blue-500"
                        href={{
                          pathname: `/auth/hosts/myadvertisements/${destination?.id}`,
                          query: { destination: JSON.stringify(destination) },
                        }}
                      >
                        Edit Now
                      </Link>
                      <button
                        onClick={() => handleDeleteConfirmation(destination.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-2 flex justify-center sm:justify-start sm:ml-4 sm:flex-shrink-0">
                  <div className="text-sm py-16 text-center text-[#7BBCB0]">
                    ${destination.price_per_day}
                    <span className="block text-gray-500">per person</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        {!loading && advertisements.length === 0 && (
          <p className="text-center mt-4">No destinations found.</p>
        )}
        {confirmation && (
          <div className="fixed bottom-0 left-0 z-50 p-4 bg-white shadow-md border border-gray-200 rounded-md mx-4 mb-4">
            <p className="text-lg font-semibold mb-2">Confirm Deletion</p>
            <p className="text-sm mb-4">
              Are you sure you want to delete this advertisement?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(confirmation)}
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-2 hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default My_Advertisements;
