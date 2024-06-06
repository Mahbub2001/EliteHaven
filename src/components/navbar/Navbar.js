"use client";

import React, { useContext, useState } from "react";
import "./Navbar.css";
import Link from "next/link";
import Image from "next/image";
// import { AuthContext } from "@/app/context/auth";

const Navbar = () => {
  const [isopen, setIsopen] = useState(false);

//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     logout()
//       .then((result) => {})
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  return (
    <div className="home">
      <div className="w-full h-full">
        <div className="Navbar bg-black">
          <div className="flex items-center justify-center gap-2">
            <Image className="" src="/logo1.png" height={100} width={200}/>
            <div className="flex flex-col gap-1">
              {/* <font className="school-name font-bold">EltieHaven</font> */}
            </div>
          </div>
          <div className={`nav-items ${isopen && "open"}`}>
            <Link href="/" className="">
              Home
            </Link>
            <Link href="/common/about_us" className="">
              About us
            </Link>
            <Link href="/common/contact_us" className="">
              Contact us
            </Link>
            {/* {user ? ( */}
              <>
                {/* <Link href="/auth/profile" className="">
                  Profile
                </Link> */}
                {/* <Link
                  href=""
                // onClick={handleLogout}
                >Log out</Link> */}
              </>
            {/* ) : ( */}
              <>
                <Link href="/auth/login" className="">
                  Login
                </Link>
                <Link href="/auth/register" className="">
                  Registration
                </Link>
              </>
            {/* )} */}
          </div>
          <div
            className={`nav-toggle ${isopen && "open"}`}
            onClick={() => setIsopen(!isopen)}
          >
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Navbar;
