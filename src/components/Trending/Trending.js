import Image from "next/image";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { CiHeart,CiShare2 } from "react-icons/ci";

function Trending() {
  return (
    <div className="relative">
      <div
        className="h-[40rem] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url("/trending.png")' }}
      >
        <div className="pb-5 lg:grid grid-cols-2 container px-3 py-1 justify-center items-center gap-5">
          <div className="relative">
            <Image
              src="/al3.png"
              alt="Trending Place"
              height={400}
              width={400}
              className="shadow-md transform skew-y-6 skew-x-3"
            />
          </div>
          <div className="text-white">
            <p className="text-xs font-bold bg-[#AFFFF0] text-black inline-block px-2 py-1 rounded-md">
              Trending now
            </p>
            <h1 className="text-3xl font-bold mb-2 mt-2">
              Wilderlife of Alaska
            </h1>
            <div className="flex gap-1 text-xs items-center">
              <IoLocationSharp />
              <p className="">Alaska, USA</p>
              <p>|</p>
              <div className="flex justify-center font-bold">
                <span className="text-[#FFA432]">&#9733;</span>
                <span className="text-[#FFA432]">&#9733;</span>
                <span className="text-[#FFA432]">&#9733;</span>
                <span className="text-[#FFA432]">&#9733;</span>
                <span className="text-gray-300">&#9733;</span>
              </div>
              <p>4.9 (400 reviews)</p>
            </div>
            <p className="text-sm mt-2 mb-4">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <div className="flex gap-2 items-center">
              <button className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-500 mr-4">
                Book Now
              </button>
              <CiHeart className="text-3xl" />
              <CiShare2 className="text-3xl"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;
