import React from "react";
import {
  FaPhone,
  FaComment,
  FaVideo,
  FaArrowLeft,
  FaArrowRight,
  FaSync,
  FaCog,
  FaSearch,
  FaCalendarAlt,
  FaEllipsisV,
  FaSign,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaSignHanging } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-zinc-900 text-gray-300 py-2 px-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-700 p-2 rounded-lg">
          <Link to="/">
            <span className="font-bold text-lg text-white">Phone System</span>
          </Link>
        </div>
        <Link to="/dialpad">
          <FaPhone className="text-gray-400 hover:text-white cursor-pointer" />
        </Link>
        <FaComment className="text-gray-500 hover:text-white cursor-pointer" />
        <FaVideo className="text-gray-500 hover:text-white cursor-pointer" />
      </div>

      <div className="flex items-center space-x-4">
        <FaArrowLeft className="text-gray-500 hover:text-white cursor-pointer" />
        <FaArrowRight className="text-gray-500 hover:text-white cursor-pointer" />
        <FaSync className="text-gray-500 hover:text-white cursor-pointer" />

        <div className="flex items-center bg-zinc-700 rounded-full px-4 py-1 w-full max-w-md">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Dialpad"
            className="w-full bg-zinc-700 text-gray-300 outline-none placeholder-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <FaCog className="text-gray-500 hover:text-white cursor-pointer" />
        <FaCalendarAlt className="text-gray-500 hover:text-white cursor-pointer" />
        <div className="relative">
          <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            B
          </div>
          <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>
        <FaEllipsisV className="text-gray-500 hover:text-white cursor-pointer" />
        <Link to="/login">
          <FaSignInAlt className="text-gray-400 hover:text-white cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
