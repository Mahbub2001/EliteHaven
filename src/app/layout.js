import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";
import toast, { Toaster } from "react-hot-toast";

import AuthProvider from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EliteHaven",
  description: "Developed by Mahbub ahmed Turza",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
