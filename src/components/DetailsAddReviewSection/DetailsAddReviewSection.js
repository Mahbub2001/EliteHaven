import Image from "next/image";
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { CiShare2 } from "react-icons/ci";
import { SlLike, SlDislike } from "react-icons/sl";

function DetailsAddReviewSection({ advertisement }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-orange-400 h-6 w-6" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-orange-400 h-6 w-6" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 h-6 w-6" />);
      }
    }
    return stars;
  };
  const renderStars2 = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-orange-400 h-3 w-3" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(
          <FaStarHalfAlt key={i} className="text-orange-400 h-3 w-3" />
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 h-3 w-3" />);
      }
    }
    return stars;
  };

  return (
    <div className="p-6 mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-4">Customer Review</h2>
      <div className="flex flex-wrap md:flex-nowrap justify-between">
        <div className="md:w-2/3 w-full mb-6 md:mb-0">
          <span className="text-4xl font-bold">
            {advertisement?.average_rating}
          </span>
          <span className="ml-2 text-sm">
            ({advertisement?.review_count} reviews)
          </span>
          <div className="mt-5 flex items-center">
            {renderStars(advertisement?.average_rating)}
          </div>
        </div>
        <div className="md:w-1/3 w-full mb-6">
          <div className="flex flex-col">
            <RatingLine title="Guide" rating={4.8} />
            <RatingLine title="Transportation" rating={3.0} />
            <RatingLine title="Value for money" rating={4.5} />
            <RatingLine title="Safety" rating={4.0} />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center justify-evenly border space-x-4 overflow-x-auto">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17V12.414L3.293 6.707A1 1 0 013 6V4z"
              ></path>
            </svg>
            <span className="text-gray-700 font-medium">Filtering:</span>
          </div>
          <select className="bg-white border border-gray-300 rounded-md p-2 flex-shrink-0">
            <option>Recommended</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md p-2 flex-shrink-0">
            <option>Traveler type</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md p-2 flex-shrink-0">
            <option>Rating</option>
          </select>
          <div className="flex items-center border border-gray-300 rounded-md p-2 flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.85-2.65a7 7 0 111-1-7 7 0 011 1z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Search Here"
              className="ml-2 outline-none"
            />
          </div>
        </div>
      </div>
      <div>
        {advertisement?.comments.map((review) => (
          <div
            key={review.id}
            className="flex flex-wrap items-start border-b py-4"
          >
            <div className="flex-shrink-0">
              <div className="inline-block relative">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover"
                    src={review?.image}
                    alt="Profile picture"
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                </div>
              </div>
            </div>
            <div className="ml-4 md:ml-6 mt-2 md:mt-0 flex-1">
              <p className="flex items-baseline">
                <span className="text-gray-600 font-bold">{review?.name}</span>
              </p>
              <div className="flex items-center mt-1">
                {renderStars2(review?.rating)}
              </div>
              <div className="flex flex-col md:flex-row md:items-center mt-2 text-gray-600">
                <div className="flex items-center">
                  <span className="text-xs md:text-sm mr-1">
                    Product Quality
                  </span>
                  {renderStars2(review?.rating)}
                </div>
                <div className="flex items-center md:ml-4">
                  <span className="text-sm mr-1">Purchasing Experience</span>
                  {renderStars2(review?.rating)}
                </div>
              </div>
              <div className="mt-1">
                <p className="mt-1 text-sm">{review?.comment}</p>
              </div>
              <div className="mt-3 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 fill-current">
                <div></div>
                <div className="grid grid-cols-2 md:grid-cols-4 items-center">
                  <button className="flex items-center">
                    <CiShare2 className="w-4 h-4" />
                    <span className="ml-2">Share</span>
                  </button>
                  <span className="">Was this review helpful?</span>
                  <button className="flex items-center md:ml-6">
                    <SlLike className="w-4 h-4" />
                    <span className="ml-2">56</span>
                  </button>
                  <button className="flex items-center ml-4">
                    <SlDislike className="w-4 h-4" />
                    <span className="ml-2">10</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const RatingLine = ({ title, rating }) => {
  const width = (rating / 5) * 100;

  return (
    <div className="flex items-center mb-1">
      <p className="text-gray-700">{title}</p>
      <div className="w-full h-2 ml-2 bg-gray-300 rounded-full">
        <motion.div
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: `${width}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
        ></motion.div>
      </div>
      <span className="ml-2 text-gray-700">{rating}</span>
    </div>
  );
};

export default DetailsAddReviewSection;
