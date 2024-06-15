"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/auth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { user, logout, signin } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin(formData.email, formData.password);
      if (!response.success) {
        setError(response.error);
        toast.error(response.error);
      } else {
      }
    } catch (error) {}
  };
  return (
    <section className="gradient-form my-20">
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 md:p-12 lg:flex lg:space-x-8">
          <div className="lg:w-1/2">
            <div className="text-center mb-8">
              <img
                className="mx-auto w-48"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
              />
              <h4 className="mt-4 text-2xl font-semibold text-gray-800">
                We are The Lotus Team
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Please log in to your account
              </p>
              <div className="relative">
                <input
                  className="peer block w-full rounded border-2 border-gray-300 focus:outline-none focus:border-primary-500 px-3 py-2"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="relative">
                <input
                  className="peer block w-full rounded border-2 border-gray-300 focus:outline-none focus:border-primary-500 px-3 py-2"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <button
                className="-ml-0 w-full bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign in
              </button>
              <br />
              <a href="#!" className="text-sm text-gray-600">
                Forgot password?
              </a>
            </form>
            <div className="flex items-center justify-center mt-4">
              <p className="text-gray-600 mr-4">Don't have an account?</p>
              <Link href="/auth/register">
                <button
                  className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div className=" border-l border-gray-300 h-auto"></div>
          <div className="flex flex-col lg:w-1/2 lg:flex-row items-center justify-center to-red-500p-8">
            <div>
              <h4 className="text-3xl font-semibold mb-4">
                We are more than just a company
              </h4>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                placerat erat nec sem eleifend, nec fermentum dui feugiat.
                Integer tincidunt rutrum odio, et volutpat risus iaculis nec.
                Vestibulum nec diam vehicula, maximus magna sit amet, faucibus
                sapien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
