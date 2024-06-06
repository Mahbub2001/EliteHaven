import Image from "next/image";
import React from "react";
import { GrAndroid } from "react-icons/gr";
import { FaApple } from "react-icons/fa";

function DownloadApp() {
  return (
    <div className="relative mt-16">
      <div
        className="h-[40rem] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'url("/phone_back.png")' }}
      >
        <div className="pb-5 lg:grid grid-cols-2 container px-3 py-1 justify-center items-center gap-5">
          <div className="hidden lg:block relative">
            <Image
              src="/phone.png"
              alt="Trending Place"
              height={400}
              width={400}
              className="shadow-md transform skew-y-6 skew-x-3"
            />
          </div>
          <div className="hidden md:block lg:hidden relative">
            <Image
              src="/phone.png"
              alt="Trending Place"
              height={300}
              width={300}
              className="shadow-md transform skew-y-6 skew-x-3"
            />
          </div>
          <div className="sm:hidden relative">
            <Image
              src="/phone.png"
              alt="Trending Place"
              height={200}
              width={200}
              className="shadow-md transform skew-y-6 skew-x-3"
            />
          </div>

          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 mt-2">
              EliteHaven Tour Mobile App
            </h1>
            <p className="text-sm">Available on IOS & Android</p>
            <p className="text-sm mt-2 mb-4">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <div className="flex gap-4 items-center">
              <div className="flex items-center bg-yellow-400 text-black font-bold px-4 rounded-full hover:bg-yellow-500 ">
                <GrAndroid className="text-2xl" />
                <button className="ml-2">Download for Android</button>
              </div>
              <div className="flex items-center bg-yellow-400 text-black font-bold px-4 rounded-full hover:bg-yellow-50">
                <FaApple className="text-2xl" />
                <button className="ml-2">Download for iOS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
