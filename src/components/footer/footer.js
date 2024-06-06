import React from "react";
import "./footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="bg-[#13253F] text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 justify-center items-center">
          <div>
            <h2 className="text-xl font-bold mb-4">Legal</h2>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  GDPR
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Manage cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="text-xs space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/common/about_us" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/common/contact_us" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">123 Street Name, City, State, Zip</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-white hover:text-blue-500">
                <FaFacebookF />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400">
                <FaTwitter />
              </Link>
              <Link href="#" className="text-white hover:text-pink-600">
                <FaInstagram />
              </Link>
              <Link href="#" className="text-white hover:text-blue-700">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-[#121c2b] h-16 flex items-center justify-center text-white text-xs">
        &copy; {new Date().getFullYear()} Developed By <br /> Mahbub Ahmed Turza
      </div>
    </div>
  );
};

export default Footer;
