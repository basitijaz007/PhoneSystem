// Sidebar.jsx
import React from "react";
import { FaInbox, FaAddressBook, FaHashtag, FaComments } from "react-icons/fa";

const Sidebar = ({ recentCalls }) => {
  return (
    <div className="bg-zinc-900 text-gray-300 w-52 h-full p-4 space-y-6">
      {/* Top Links */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaInbox className="text-gray-400" />
          <span>Inbox</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaAddressBook className="text-gray-400" />
          <span>Contacts</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaHashtag className="text-gray-400" />
          <span>All channels</span>
        </div>
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <FaComments className="text-gray-400" />
          <span>Threads</span>
        </div>
      </div>

      {/* Recents Section */}
      <div>
        <h3 className="text-gray-500 text-xs uppercase mb-2">Recents</h3>
        <div className="space-y-2">
          {recentCalls.map((number, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <div className="bg-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                {number[0]} 
              </div>
              <span>{number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Show More Link */}
      <div className="text-blue-500 text-sm cursor-pointer hover:underline">
        Show all recent conversations
      </div>
    </div>
  );
};

export default Sidebar;
