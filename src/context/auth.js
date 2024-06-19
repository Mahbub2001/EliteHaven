// auth.js

"use client";

import React, { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [change,setChange] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedUserToken =
      typeof window !== "undefined"
        ? localStorage.getItem("elite_token")
        : null;
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("elite_user_id")
        : null;

    if (storedUser && storedUserToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("elite_user_id");
      }
    }
    setLoading(false);
  }, []);

  const signin = async (email, password) => {
    try {
      const res = await fetch("https://elitehaven-backend.onrender.com/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          return { success: false, error: data.error };
        }
        toast.success("Successfully logged in!");
        setUser(data.user_id);
        localStorage.setItem("elite_token", data.token);
        localStorage.setItem("elite_user_id", data.user_id);
        router.push("/auth/profile", { scroll: false });
        return { success: true };
      } else {
        const errorData = await res.json();
        return { success: false, error: errorData.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    localStorage.removeItem("elite_token");
    localStorage.removeItem("elite_user_id");
    setUser(null);
    await fetch("https://elitehaven-backend.onrender.com/accounts/logout/", {
      method: "POST",
    });
    router.push("/login", { scroll: false });
  };

  const authInfo = {
    user,
    loading,
    signin,
    logout,
    change,
    setChange,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {/* <Toaster /> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
