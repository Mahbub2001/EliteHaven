import React from "react";

function SearchBox() {
  return (
    <div className="px-1">
      <div className="max-w-lg mx-auto my-10">
        <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <div className="p-2">
            <span className="text-green-500 text-xl">📍</span>
          </div>
          <input
            type="text"
            placeholder="Search For A Destination"
            className="w-full p-2 bg-transparent focus:outline-none text-gray-500"
          />
        </div>

        <div className="mt-4 flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <div className="p-2">
            <span className="text-green-500 text-xl">👥</span>
          </div>
          <input
            type="text"
            placeholder="How many Guests?"
            className="w-full p-2 bg-transparent focus:outline-none text-gray-500"
          />
        </div>

        <div className="mt-4 flex items-center bg-white rounded-full shadow-md overflow-hidden">
          <div className="p-2">
            <span className="text-green-500 text-xl">📅</span>
          </div>
          <input
            type="date"
            placeholder="Pick a date"
            className="w-full p-2 bg-transparent focus:outline-none text-gray-500"
          />
        </div>
        <button className="-ml-[0.5px] mt-4 w-full flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white rounded-full px-2 py-2 shadow-md">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
