"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth";
import DashboardLayout from "@/components/Dashboard_Layout/Dashboard_layout";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      const token = localStorage.getItem("elite_token");

      try {
        const response = await fetch(
          `https://elitehaven-backend.onrender.com/accounts/profile/?user=${user}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch profile data");
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchProfileData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">
          Welcome {profileData?.username}
        </h2>
        {profileData && <UserProfile profileData={profileData} />}
      </div>
    </DashboardLayout>
  );
};

const UserProfile = ({ profileData }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Profile Data</h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.first_name} {profileData?.last_name}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.email}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.role}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.phone_number}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.address}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Profile Picture
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <img
                  src={profileData?.profile_picture}
                  alt="Profile Picture"
                  className="h-20 w-20 rounded-sm object-cover"
                />
              </dd>
            </div>
            {/* <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Login</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {profileData?.last_login_date}
              </dd>
            </div> */}
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Registration Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {formatDate(profileData?.registration_date)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
