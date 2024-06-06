import React, { useEffect } from "react";
import "./MoreDestination.css";
import AOS from "aos";
import "aos/dist/aos.css";

const MoreDestination = () => {
  useEffect(() => {
    return () => {
      AOS.init({
        duration: 100,
      });
    };
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">More Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <div data-aos="fade-right" className="w-full h-96 relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="Paris"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-3xl font-bold text-white">Paris</h3>
              <p className="text-sm text-gray-300">City of Love</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div data-aos="fade-left" className="w-full h-52 relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="Paris"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-2xl font-bold text-white">Paris</h3>
              <p className="text-sm text-gray-300">City of Love</p>
            </div>
          </div>

          <div data-aos="fade-left" className="w-full h-52 relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
              alt="Paris"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-2xl font-bold text-white">Paris</h3>
              <p className="text-sm text-gray-300">City of Love</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div data-aos="fade-down" className="w-full h-52 relative rounded-xl overflow-hidden mt-8">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
          alt="Paris"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white">Paris</h3>
          <p className="text-sm text-gray-300">City of Love</p>
        </div>
      </div>
    </div>
  );
};

export default MoreDestination;
