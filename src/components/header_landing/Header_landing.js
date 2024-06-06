import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { Caveat } from "next/font/google";
import Image from "next/image";
import SearchBox from "../SearchBox/SearchBox";

const caviate = Caveat({ subsets: ["latin"] });

const HeaderLanding = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <Image
          src="/img.png"
          alt="Next.js"
          layout="fill"
          objectFit="cover"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
          }}
        />
        <div className="absolute inset-0 hidden lg:flex items-center justify-between p-8 bg-black bg-opacity-20">
          <div className={caviate.className}>
            <h1 className="text-5xl lg:text-[10rem] text-yellow-400">
              Make the sight.
            </h1>
            <p className="text-3xl lg:text-[12rem] text-white">Move</p>
          </div>
        </div>
        <div
          className={`${caviate.className} absolute bottom-24 hidden right-8 text-center text-white lg:flex gap-5 items-center`}
        >
          <FaArrowDown className="text-1xl animate-bounce" />
          <div>
            <p className="text-sm">Explore </p>
            <p className="text-sm"> Destination</p>
          </div>
        </div>
        <div className="absolute inset-0 flex lg:hidden flex-col justify-end items-center p-8 bg-black bg-opacity-60">
          <div className={`${caviate.className} text-center mb-auto`}>
            <h1 className="text-5xl sm:text-7xl md:text-9xl text-yellow-400">
              Make the sight.
            </h1>
            <p className="text-3xl sm:text-4xl md:text-5xl text-white">Move</p>
          </div>
          <div
            className={`${caviate.className} text-center text-white flex flex-col items-center gap-2 mt-16 mb-16 `}
          >
            <FaArrowDown className="text-3xl animate-bounce" />
            <div>
              <p className="text-lg sm:text-xl md:text-2xl">Explore </p>
              <p className="text-lg sm:text-xl md:text-2xl">Destination</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLanding;
