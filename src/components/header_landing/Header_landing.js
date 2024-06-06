import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Caveat } from "next/font/google";
import Image from "next/image";
import Button1 from "../Button1/Button1";
import Link from "next/link";

const caviate = Caveat({ subsets: ["latin"] });

const HeaderLanding = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src="/img.png"
        alt="Next.js"
        layout="fill"
        objectFit="cover"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
      />
      <div className="absolute inset-0 hidden lg:flex items-center justify-between p-8 bg-black bg-opacity-20">
        <div className={caviate.className}>
          <h1 className="text-5xl lg:text-[10rem] text-yellow-400">
            Make the sight.
          </h1>
          <p className="text-3xl lg:text-[12rem] text-white">Move</p>
          <p className="mt-16"></p>
          <Link href="/auth/register">
            <Button1 name="Sign Up Now" />
          </Link>
        </div>
      </div>
      <div
        onClick={handleScrollDown}
        className={`${caviate.className} cursor-pointer absolute bottom-24 hidden right-8 text-center text-white lg:flex gap-5 items-center`}
      >
        <FaArrowDown className="text-1xl animate-bounce " />
        <div>
          <p className="text-sm">Explore Destination</p>
        </div>
      </div>
      <div className="absolute inset-0 flex lg:hidden flex-col justify-end items-center p-8 bg-black bg-opacity-60">
        <div className={`${caviate.className} text-center mb-auto`}>
          <h1 className="text-5xl sm:text-7xl md:text-9xl text-yellow-400">
            Make the sight.
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl text-white">Move</p>
          <Link href="/auth/register">
            <Button1 name="Sign Up Now" />
          </Link>
        </div>
        {showScrollIndicator && (
          <div
            className={`${caviate.className} text-center text-white flex flex-col items-center gap-2 mt-16 mb-16`}
          >
            <FaArrowDown
              className="text-3xl animate-bounce cursor-pointer"
              onClick={handleScrollDown}
            />
            <div>
              <p className="text-lg sm:text-xl md:text-2xl">Explore</p>
              <p className="text-lg sm:text-xl md:text-2xl">Destination</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderLanding;
