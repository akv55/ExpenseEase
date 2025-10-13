import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section - Logo + Name */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          {/* Overlapping Circles Logo */}
          <div className="relative w-16 h-8">
            <div className="absolute w-8 h-8 bg-cyan-400 rounded-full opacity-90 left-0"></div>
            <div className="absolute w-8 h-8 bg-sky-300 rounded-full opacity-90 left-4"></div>
          </div>

          <div>
            <h1 className="text-white font-semibold text-lg">Split & Track</h1>
            <p className="text-xs text-gray-400">
              © Copyright Split & Track 2025
            </p>
          </div>
        </div>

        {/* Center Section - Links */}
        <ul className="flex space-x-6 text-sm mb-4 md:mb-0">
          <li>
            <a href="#" className="hover:text-cyan-400 transition">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-3">
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-cyan-400 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-cyan-400 hover:text-white transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-cyan-400 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-cyan-400 hover:text-white transition"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
