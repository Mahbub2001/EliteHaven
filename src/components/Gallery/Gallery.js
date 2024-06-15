"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Gallery = () => {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...prev, Number(entry.target.dataset.index)]);
          } else {
            setVisibleIndexes((prev) => prev.filter((index) => index !== Number(entry.target.dataset.index)));
          }
        });
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    imageRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      if (imageRefs.current) {
        imageRefs.current.forEach((ref) => {
          if (ref) {
            observer.unobserve(ref);
          }
        });
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center px-1">
      <div className="py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold">From The Gallery</h2>
          <p className="mt-4 text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            amet sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
        <div
          id="gallery"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              data-index={index}
              className="overflow-hidden rounded-lg"
              variants={imageVariants}
              initial="hidden"
              animate={visibleIndexes.includes(index) ? "visible" : "hidden"}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="object-cover w-full h-60"
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md">
            View All Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
