"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const sidebarLinks = [
    { label: "View Profile", path: "/auth/profile" },
    { label: "Edit Profile", path: "/edit-profile" },
    {
      label: "My Wishlist",
      path: "/auth/generalluser/mywishlist",
      roles: ["generaluser"],
    },
    {
      label: "My Bookings",
      path: "/auth/generalluser/mybookings",
      roles: ["generaluser"],
    },
    { label: "Host Profile", path: "/host-profile", roles: ["host"] },
    { label: "Edit Host Profile", path: "/edit-host-profile", roles: ["host"] },
    { label: "Add Advertisements", path: "/auth/hosts/addadvertisement", roles: ["host"] },
    { label: "My Advertisements", path: "/auth/hosts/myadvertisements", roles: ["host"] },
    {
      label: "Edit Advertisements",
      path: "/edit-advertisements",
      roles: ["host"],
    },
  ];

  const filterLinksByRole = (links) => {
    const userRole = profileData?.role;
    return links.filter((link) => !link.roles || link.roles.includes(userRole));
  };

  const filteredLinks = filterLinksByRole(sidebarLinks);

  return (
    <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <button
        className="lg:hidden block mb-4 p-2 bg-gray-200 rounded"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        {isDrawerOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>

      <div
        className={`col-span-1 lg:block ${
          isDrawerOpen ? "block" : "hidden"
        }`}
      >
        <nav className="space-y-2 bg-white lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none rounded-lg lg:rounded-none">
          {filteredLinks.map((link, index) => (
            <Link key={index} href={link.path}>
              <p
                className={`block px-4 py-2 rounded hover:bg-gray-100 ${
                  router.pathname === link.path ? "bg-gray-200" : ""
                }`}
              >
                {link.label}
              </p>
            </Link>
          ))}
        </nav>
      </div>

      <div className="col-span-1 lg:col-span-2">{children}</div>
    </div>
  );
};

export default DashboardLayout;
