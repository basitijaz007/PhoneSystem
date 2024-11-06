import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import All from "./AllTabData/All";
import Missed from "./AllTabData/Missed";
import Unread from "./AllTabData/Unread";

const CallLog = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const tabs = [
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
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="bg-zinc-950 text-gray-300 p-4 w-full h-full">
      <div className="flex space-x-6 border-b border-gray-700 pb-2 mb-4">
        {tabs.map((tab, index) => (
          <span
            key={index}
            onClick={() => handleTabClick(tab)}
            className={`cursor-pointer ${
              selectedTab === tab
                ? "text-blue-500 font-bold"
                : "hover:text-white"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {selectedTab === "All" && <All />}

        {selectedTab === "Missed" && <Missed />}

        {selectedTab === "Unread" && <Unread />}

        {selectedTab !== "All" &&
          selectedTab !== "Missed" &&
          selectedTab !== "Unread" && (
            <div className="text-center text-gray-400">
              No content available for {selectedTab}.
            </div>
          )}
      </div>
    </div>
  );
};

export default CallLog;
