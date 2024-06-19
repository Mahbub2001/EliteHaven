'use client'

import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "@/components/Dashboard_Layout/Dashboard_layout";
import axios from "axios";
import { AuthContext } from "@/context/auth";

function My_Bookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const token = typeof window !== 'undefined' ? localStorage.getItem("elite_token") : null;


  useEffect(() => {
    if (!token || !user) {
      return;
    }

    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `https://elitehaven-backend.onrender.com/user-bookings/?user=${user}`, 
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [token, user]);

  console.log(bookings);

  return (
    <DashboardLayout>
       <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Bookings</h1>
          <div className="flex flex-col gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white overflow-hidden shadow-md rounded-lg">
                <div className={`p-6 ${booking.is_completed ? 'bg-green-50' : 'bg-blue-50'} border-t-4 ${booking.is_completed ? 'border-green-500' : 'border-blue-500'}`}>
                  <h2 className="text-2xl font-semibold mb-4">{booking.item.title}</h2>
                  <div className="space-y-2">
                    <p className="text-gray-700"><span className="font-semibold">Booking Date:</span> {new Date(booking.booking_date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><span className="font-semibold">Number of Persons:</span> {booking.number_of_persons}</p>
                    <p className="text-gray-700"><span className="font-semibold">From Date:</span> {new Date(booking.from_date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><span className="font-semibold">To Date:</span> {new Date(booking.to_date).toLocaleDateString()}</p>
                    <p className="text-gray-700"><span className="font-semibold">Subtotal:</span> ${booking.subtotal}</p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Status:</span>{" "}
                      {booking.is_completed ? (
                        <span className="text-green-600">Completed</span>
                      ) : (
                        <span className="text-blue-600">Pending - Finish Payment</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default My_Bookings;
