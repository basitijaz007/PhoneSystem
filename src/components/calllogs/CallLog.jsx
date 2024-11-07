import React, { useState, useMemo, lazy, Suspense } from "react";
import classNames from "classnames";

const All = lazy(() => import("./AllTabData/All"));
const Missed = lazy(() => import("./AllTabData/Missed"));
const Unread = lazy(() => import("./AllTabData/Unread"));

const CallLog = () => {
  const [selectedTab, setSelectedTab] = useState("Unread");

  const tabs = useMemo(
    () => [
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
    ],
    []
  );

  const tabComponents = {
    All: <All />,
    Missed: <Missed />,
    Unread: <Unread />,
  };

  const handleTabClick = (tab) => setSelectedTab(tab);

  return (
    <div className="bg-zinc-950 text-gray-300 p-4 w-full h-full">
      <div className="flex space-x-6 border-b border-gray-700 pb-2 mb-4">
        {tabs.map((tab) => (
          <span
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={classNames("cursor-pointer", {
              "text-blue-500 font-bold": selectedTab === tab,
              "hover:text-white": selectedTab !== tab,
            })}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          {tabComponents[selectedTab] || (
            <div className="text-center text-gray-400">
              No content available for {selectedTab}.
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CallLog;
