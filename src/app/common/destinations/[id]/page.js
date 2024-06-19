"use client";
import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { FaMobileAlt, FaTeamspeak } from "react-icons/fa";
import { GiElectric, GiHealthCapsule } from "react-icons/gi";
import { PiSecurityCameraFill } from "react-icons/pi";
import DetailsAddReviewSection from "@/components/DetailsAddReviewSection/DetailsAddReviewSection";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/auth";

function AdverDetails({ params }) {
  const {user} = useContext(AuthContext);
  const { id } = params;
  const [advertisement, setAdvertisement] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [subtotal, setSubtotal] = useState(0);
  const [disableDates, setDisableDates] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDisableDates({ before: today });

    if (fromDate && toDate && fromDate > toDate) {
      setToDate("");
      alert("To date cannot be before from date");
    }

    calculateSubtotal();
  }, [fromDate, toDate, guests]);

  const calculateSubtotal = () => {
    if (!fromDate || !toDate) return;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const durationInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (durationInDays < 0) {
      setSubtotal(0);
      alert("To date cannot be before from date");
      return;
    }

    if (durationInDays < 30) {
      const subtotal = durationInDays * advertisement.price_per_day;
      setSubtotal(subtotal);
    } else if (durationInDays >= 30 && durationInDays < 180) {
      const months = Math.floor(durationInDays / 30);
      const remainingDays = durationInDays % 30;

      const subtotal =
        months * advertisement.price_6_month +
        (remainingDays / 30) * advertisement.price_6_month;
      setSubtotal(subtotal);
    } else if (durationInDays >= 365) {
      const years = Math.floor(durationInDays / 365);
      const remainingDays = durationInDays % 365;
      const months = Math.floor(remainingDays / 30);

      const subtotal =
        years * advertisement.price_1_year +
        (months / 12) * advertisement.price_1_year;
      setSubtotal(subtotal);
    }
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
    if (!toDate || toDate < date) {
      setToDate("");
    }
  };
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating === 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  const Section = ({ children }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 1.0 }}
        className="mt-10"
      >
        {children}
      </motion.div>
    );
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem("elite_token") : null;

  const confirmBooking = async () => {
    const data = {
      from_date: fromDate,
      to_date: toDate,
      number_of_persons: parseInt(guests),
      advertisement: advertisement.id,
      subtotal: subtotal,
      is_completed: false,
      user: user, 
      item: advertisement?.id
    };
    console.log(data);
    try {
      const response = await fetch('https://elitehaven-backend.onrender.com/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to confirm booking');
      }

      toast.success('Booking confirmed successfully! Complete your payment from your dashboard');
    } catch (error) {
      console.error('Error confirming booking:', error.message);
      alert('Failed to confirm booking. Please try again later.');
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-md overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col w-full md:w-[770px]">
            <h4 className="font-bold text-[2rem]">{advertisement?.title}</h4>
            <div className="flex text-xs items-center gap-2 mb-4 text-gray-500">
              <FaMapMarkedAlt className="text-green-500" />
              <p>
                {advertisement?.city},{advertisement?.country}
              </p>
              <p> | </p>
              <div className="flex items-center">
                {renderStars(advertisement?.average_rating)}
              </div>
              <p>{advertisement?.average_rating}</p>
              <p>({advertisement?.review_count} reviews)</p>
            </div>
            <div>
              <div className="mb-4">
                <img
                  src={currentImage}
                  alt={advertisement?.title}
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
                        onClick={() => handleThumbnailClick(image?.image_url)}
                      >
                        <img
                          src={image?.image_url}
                          alt={`Thumbnail ${index}`}
                          className="w-full md:max-w-[10rem] h-[10rem] md:h-auto object-cover rounded-md cursor-pointer"
                          style={{ marginRight: "1rem" }}
                          onClick={() => handleThumbnailClick(image?.image_url)}
                        />
                      </motion.div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 bg-[#F8FAFC] p-5 shadow-lg">
              <div className="flex items-start gap-3">
                <TiCancel className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-sm font-bold">Free Cancellation</h4>
                  <p className="text-xs">
                    Cancel up to 5 days before check-in and get a full refund,
                    minus the service fee.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GiHealthCapsule className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-sm font-bold">Health precautions</h4>
                  <p className="text-xs">
                    This host committed to Airbnb's 5-step enhanced cleaning
                    process.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMobileAlt className="text-blue-600 text-1xl" />
                <div>
                  <h4 className="text-sm font-bold">Mobile Ticketing</h4>
                  <p className="text-xs">
                    Use your phone to show proof of your reservation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PiSecurityCameraFill className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-sm font-bold">Security</h4>
                  <p className="text-xs">
                    Security cameras and smoke alarm are installed in the
                    property.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GiElectric className="text-blue-600 text-1xl" />
                <div>
                  <h4 className="text-sm font-bold">Instant Confirmation</h4>
                  <p className="text-xs">
                    You'll receive instant confirmation of your booking.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaTeamspeak className="text-blue-600 text-2xl" />
                <div>
                  <h4 className="text-sm font-bold">
                    Live Tour Guide in English
                  </h4>
                  <p className="text-xs">
                    Get a personalized tour with a local guide who speaks your
                    language.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mt-6">Description</h4>
              <p className="text-sm mt-2">{advertisement?.description}</p>
            </div>
            <div>
              <Section>
                <div className="mb-8">
                  <h2 className="text-sm font-bold text-gray-500 mb-4">
                    Monthly Spend for a Family of 4
                  </h2>
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border rounded-lg bg-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.rent_family}
                      </p>
                      <p className="text-gray-500">Rent</p>
                      <p className="text-sm text-gray-400">
                        This is for a 3 bedroom (40sqm) within city center.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.groceries_family}
                      </p>
                      <p className="text-gray-500">Groceries</p>
                      <p className="text-sm text-gray-400">
                        The average cost of groceries for a family of 4.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.others_family}
                      </p>
                      <p className="text-gray-500">Others</p>
                      <p className="text-sm text-gray-400">
                        The average monthly cost of Gas, Water, Electricity, and
                        Internet.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.total_family}
                      </p>
                      <p className="text-gray-500">Total</p>
                      <p className="text-sm text-gray-400">
                        This is the average monthly spending for a family of
                        four (4).
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-500 mb-4">
                    Monthly Spend for an Individual
                  </h2>
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border rounded-lg bg-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.rent_individual}
                      </p>
                      <p className="text-gray-500">Rent</p>
                      <p className="text-sm text-gray-400">
                        This is for a 3 bedroom (40sqm) within city center.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.groceries_individual}
                      </p>
                      <p className="text-gray-500">Groceries</p>
                      <p className="text-sm text-gray-400">
                        The average cost of groceries for a family of 4.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.others_individual}
                      </p>
                      <p className="text-gray-500">Others</p>
                      <p className="text-sm text-gray-400">
                        The average monthly cost of Gas, Water, Electricity, and
                        Internet.
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-semibold">
                        ${advertisement?.total_individual}
                      </p>
                      <p className="text-gray-500">Total</p>
                      <p className="text-sm text-gray-400">
                        This is the average monthly spending for a family of
                        four (4).
                      </p>
                    </div>
                  </motion.div>
                </div>
              </Section>
            </div>
          </div>
          <div className="md:mt-20">
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Booking</h2>
              <div className="mb-4">
                <label
                  htmlFor="fromDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  From
                </label>
                <input
                  type="date"
                  id="fromDate"
                  value={fromDate}
                  onChange={(e) => handleFromDateChange(e.target.value)}
                  min={disableDates.before}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="toDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  To
                </label>
                <input
                  type="date"
                  id="toDate"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate || disableDates.before}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="guests"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="1">1 adult</option>
                  <option value="2">2 adults</option>
                  <option value="3">3 adults</option>
                  <option value="4">4 adults</option>
                </select>
              </div>
              <div className="mb-4 text-center">
                <p className="text-gray-500 text-xs font-bold">Subtotal</p>
                <span className="text-2xl font-bold text-[#7BBCB0]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button 
               onClick={confirmBooking}
              className="w-full bg-[#7BBCB0] font-bold text-white py-4 px-4 rounded-md hover:bg-[#72ccbc] transition duration-300">
                Confirm Booking
              </button>
              <div className="mt-1">
                <button className="w-full border border-[#7BBCB0] font-bold text-gray-500 py-4 px-4 rounded-md hover:bg-[#72ccbc] hover:text-white transition duration-300">
                  Save To Wishlist
                </button>
                <button className="w-full border border-[#7BBCB0] font-bold text-gray-500 py-4 px-4 rounded-md hover:bg-[#72ccbc] hover:text-white transition duration-300">
                  Share The Activity
                </button>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-around bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                  <p className="ml-5 text-sm mb-1 text-gray-400 font-bold">
                    CITY SIZE
                  </p>
                  <div className="flex items-center text-xl font-bold">
                    <svg
                      className="w-5 h-5 mr-2 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4a1 1 0 112 0v1a1 1 0 11-2 0v-1zm.25-7.875c-.663 0-1.2.514-1.2 1.125 0 .517.347.894.827 1.072.39.14.778.282 1.17.424.612.218 1.23.438 1.838.656C13.188 9.9 14 10.2 14 11c0 .57-.338.892-.84 1.07-.74.25-1.515.43-2.243.656C9.76 12.91 9 13.185 9 14v1a1 1 0 11-2 0v-1c0-1.016.888-1.425 1.687-1.673.518-.157 1.035-.314 1.553-.474.53-.164 1.06-.332 1.577-.516.522-.188 1.073-.386 1.073-1.088 0-.666-.665-.915-1.412-1.148-.9-.29-1.787-.578-2.65-.868C10.173 8.872 10 8.756 10 8.25c0-.535.647-.988 1.405-1.276C11.69 6.67 12.375 6.44 13 6.25V5a1 1 0 112 0v1c0 1.012-.888 1.425-1.687 1.673-.517.157-1.035.314-1.553.474-.53.164-1.06.332-1.577.516C9.66 8.874 9.11 9.072 9.11 9.774c0 .667.665.915 1.412 1.148.9.29 1.787.578 2.65.868.507.164.68.282.68.788 0 .534-.647.988-1.405 1.276-.685.246-1.37.476-2.018.666C10.827 13.98 10 14.2 10 15v1a1 1 0 11-2 0v-1c0-1.015.888-1.425 1.687-1.673.517-.157 1.035-.314 1.553-.474.53-.164 1.06-.332 1.577-.516.523-.188 1.073-.386 1.073-1.088 0-.666-.665-.915-1.412-1.148-.9-.29-1.787-.578-2.65-.868-.85-.29-1.297-.508-1.297-1.026 0-.608.538-1.114 1.2-1.114zm.25 3.25c.263 0 .528.07.783.204.265.14.523.298.788.464.265.167.523.334.788.502a4.634 4.634 0 00.788-.502c.265-.166.523-.324.788-.464.255-.134.52-.204.783-.204.4 0 .765.106 1.067.302.3.195.556.447.75.74a2.983 2.983 0 01.4.998 3.011 3.011 0 01.073 1.297 2.993 2.993 0 01-.495 1.307 2.992 2.992 0 01-.783.788c-.278.197-.58.362-.897.49-.317.13-.64.194-.96.194H7.61c-.32 0-.643-.064-.96-.194-.317-.128-.62-.293-.898-.49a2.993 2.993 0 01-.782-.788 2.993 2.993 0 01-.496-1.307 3.01 3.01 0 01.073-1.297 2.983 2.983 0 01.4-.998c.193-.293.45-.545.75-.74.302-.196.667-.302 1.067-.302z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{advertisement?.city_size}</span>
                  </div>
                  <div className="text-sm text-gray-500 ml-3">(2009)</div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="ml-5 text-sm mb-1 text-gray-400 font-bold">
                    WEATHER
                  </p>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4a7.004 7.004 0 00-6.902 6H5a1 1 0 00-1 1v1h12v-1a1 1 0 00-1-1h-.098A7.004 7.004 0 0012 4zm-1 10v2h2v-2h-2zm-1 5v1h4v-1h-4z" />
                    </svg>
                    <div className="flex flex-col text-center text-gray-500">
                      <span className="text-sm">HIGH - 29°C</span>
                      <span className="text-sm">LOW - 19°C</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="ml-5 text-sm mb-1 text-gray-400 font-bold">
                    SAFETY
                  </p>
                  <div className="flex items-center text-xl font-bold">
                    <svg
                      className="w-4 h-4 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927a1 1 0 011.902 0l1.517 4.68a1 1 0 00.95.69h4.928a1 1 0 01.591 1.81l-3.992 2.904a1 1 0 00-.364 1.118l1.518 4.68a1 1 0 01-1.537 1.118L10 15.428l-3.991 2.905a1 1 0 01-1.537-1.118l1.518-4.68a1 1 0 00-.364-1.118l-3.992-2.904A1 1 0 014.558 8.297h4.928a1 1 0 00.95-.69l1.517-4.68z" />
                    </svg>
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DetailsAddReviewSection advertisement={advertisement} />
        </div>
      </div>
    </div>
  );
}

export default AdverDetails;
