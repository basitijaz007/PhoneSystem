// CallLog.jsx
import React from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";

const CallLog = () => {
  return (
    <div className="bg-zinc-950 text-gray-300 p-4 w-full h-full">
      {/* Top Navigation Tabs */}
      <div className="flex space-x-6 border-b border-gray-700 pb-2 mb-4">
        {[
          "Unread",
          "All",
          "Calls",
          "Missed",
          "Meetings",
          "Voicemails",
          "Recordings",
          "Messages",
          "Starred",
          "Spam",
          "Unlogged",
        ].map((tab, index) => (
          <span
            key={index}
            className={`cursor-pointer ${
              tab === "All" ? "text-blue-500 font-bold" : "hover:text-white"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Call Log List */}
      <div className="space-y-4">
        {/* List Item Example */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              A
            </div>
            <div>
              <div className="text-white font-semibold">(914) 768-2746</div>
              <div className="text-gray-500 text-sm">Outbound / 1 min</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Saturday</div>
        </div>

        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              MN
            </div>
            <div>
              <div className="text-white font-semibold">Metuchen NJ</div>
              <div className="text-gray-500 text-sm">Outbound / 1 min</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Saturday</div>
        </div>

        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              Q
            </div>
            <div>
              <div className="text-white font-semibold">Dialbot</div>
              <div className="flex items-center text-red-500 text-sm">
                <FaPhoneAlt className="mr-1" />
                No more spam calls! Dialpad comes with Spam Shield, which
                instantly protects you from known spam callers...
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Tuesday</div>
        </div>

        {/* Repeat for other items as needed */}
        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              A
            </div>
            <div>
              <div className="text-white font-semibold">(321) 415-9482</div>
              <div className="text-gray-500 text-sm">Canceled call</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Tuesday</div>
        </div>

        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              A
            </div>
            <div>
              <div className="text-white font-semibold">(321) 296-5887</div>
              <div className="text-gray-500 text-sm">Canceled call</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Tuesday</div>
        </div>

        <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
              AU
            </div>
            <div>
              <div className="text-white font-semibold">
                Amazon Shipment Updates
              </div>
              <div className="text-gray-500 text-sm">Outbound / 1 min</div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">Sat Oct 26</div>
        </div>
      </div>
    </div>
  );
};

export default CallLog;
