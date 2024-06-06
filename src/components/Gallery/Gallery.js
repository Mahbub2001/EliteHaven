"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const images = [
  "/g1.png",
  "/g2.png",
  "/g3.png",
  "/g4.png",
  "/g5.png",
  "/g6.png",
  "/g7.png",
  "/g8.png",
];

const Gallery = () => {
  useEffect(() => {
    return () => {
      AOS.init({
        duration: 2000,
      });
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center px-1">
        <div className="py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold">From The Gallery</h2>
            <p className="mt-4 text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((src, index) => (
              <div key={index} data-aos="zoom-in" className="overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="object-cover w-full h-60"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md">
              View All Images
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
