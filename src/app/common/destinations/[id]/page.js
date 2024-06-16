"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function AdverDetails({ params }) {
  console.log(params);
  const { id } = params;
  const [advertisement, setAdvertisement] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAdvertisement(id);
    }
  }, [id]);

  const fetchAdvertisement = async (id) => {
    try {
      const response = await fetch(
        `https://elitehaven-backend.onrender.com/public/advertisements/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch advertisement");
      }
      const data = await response.json();
      setAdvertisement(data);
      setCurrentImage(data.thumbnail_picture);
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  if (!advertisement) {
    return <p>Loading...</p>;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-md overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full md:w-[770px]">
            <div>
              <div className="mb-4">
                <img
                  src={currentImage}
                  alt={advertisement.title}
                  className="rounded-md h-96 w-full"
                />
              </div>
              <div className="">
                <Slider {...sliderSettings}>
                  {advertisement.pictures.map((image, index) => (
                    <div key={index} className="px-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative"
                        onClick={() => handleThumbnailClick(image.image_url)}
                      >
                        <img
                          src={image.image_url}
                          alt={`Thumbnail ${index}`}
                          className="w-full md:max-w-[10rem] h-[10rem] md:h-auto object-cover rounded-md cursor-pointer"
                          style={{ marginRight: "10px" }} // Adjust the gap here
                          onClick={() => handleThumbnailClick(image.image_url)}
                        />
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdverDetails;
