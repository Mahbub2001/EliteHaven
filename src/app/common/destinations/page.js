"use client";

import React, { useState, useEffect } from "react";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    city: "",
    country: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const itemPerPage = 5;

  useEffect(() => {
    fetchDestinations();
  }, [currentPage, sortBy, sortOrder]);

  const fetchDestinations = async () => {
    try {
      let url = `https://elitehaven-backend.onrender.com/public/advertisements/?page=${currentPage}&page_size=${itemPerPage}`;
      const params = new URLSearchParams({
        title: filters.title,
        city: filters.city,
        country: filters.country,
      });
      if (sortBy) {
        params.set("ordering", sortOrder === "desc" ? `-${sortBy}` : sortBy);
      }
      url += `&${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setDestinations(data.results);
      setTotalPages(data.num_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchDestinations();
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
    setCurrentPage(1);
    fetchDestinations();
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    fetchDestinations();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 fill-current ${
            i < averageRating ? "text-yellow-500" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M10 1.38l2.56 5.62 6.25.56c1.47.13 2.07 2 1 2.98l-4.54 4.39 1.07 6.18c.25 1.47-1.28 2.58-2.65 1.85L10 17.13l-5.71 3.02c-1.38.73-2.9-.38-2.65-1.85l1.07-6.18L.19 10.54c-1.07-.98-.47-2.85 1-2.98l6.25-.56L10 1.38zM10 0l2.56 5.62 6.25.56c1.47.13 2.07 2 1 2.98l-4.54 4.39 1.07 6.18c.25 1.47-1.28 2.58-2.65 1.85L10 17.13l-5.71 3.02c-1.38.73-2.9-.38-2.65-1.85l1.07-6.18L.19 10.54c-1.07-.98-.47-2.85 1-2.98l6.25-.56L10 0z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={filters.title}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={filters.country}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Apply Filters
            </button>
          </form>
        </div>
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="md:grid grid-cols-12 overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition duration-300 ease-in-out mb-4"
            >
              {/* Image */}
              <div className="col-span-2 sm:col-span-2">
                <div className="h-[100%]">
                  <img
                    className="rounded-sm h-[100%] w-full object-cover"
                    src={destination.thumbnail_picture}
                    alt={destination.title}
                  />
                </div>
              </div>
              <div className="col-span-8 sm:col-span-8">
                <div className="flex items-center">
                  <div>
                    {destination.speciality && (
                      <div className="m-4 space-x-2">
                        {destination.speciality
                          .split(",")
                          .slice(0, 2)
                          .map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full font-semibold text-xs uppercase tracking-wide"
                            >
                              {item.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center ml-4 border-l pl-4">
                    <div className="flex items-center">
                      {renderStars(destination.average_rating)}
                      <span className="ml-2 text-xs text-gray-600">
                        ({destination.review_count} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 leading-tight">
                    {destination.title}
                  </h2>
                  <p className="text-sm mb-4">{destination.description}</p>
                </div>
              </div>
              <div className="col-span-2 sm:col-span-2 flex justify-center sm:justify-start sm:ml-4 sm:flex-shrink-0">
                <div className="text-sm py-16 text-center text-[#7BBCB0]">
                  ${destination.price_per_day}
                  <span className="block text-gray-500">per person</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <nav className="bg-white rounded-md shadow-md p-4 flex flex-col lg:flex-row items-center justify-between w-full md:w-auto">
              <ul className="flex space-x-4">
                <li>
                  <button
                    onClick={() =>
                      handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    className={`px-3 py-1 ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } rounded-md`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-300 text-gray-700"
                      } rounded-md`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() =>
                      handlePageChange(
                        currentPage < totalPages ? currentPage + 1 : currentPage
                      )
                    }
                    className={`px-3 py-1 ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    } rounded-md`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
              <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                <label className="block text-sm font-medium text-gray-700 mr-2">
                  Sort By:
                </label>
                <select
                  onChange={handleSortChange}
                  className="mt-1 block w-full md:w-auto px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">None</option>
                  <option value="title">Title</option>
                  <option value="city">City</option>
                  <option value="country">Country</option>
                </select>
                <button
                  onClick={handleSortOrderChange}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer ml-2 mt-2 md:mt-0"
                >
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
