import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import CallLog from "./components/calllogs/CallLog";
import Dialpad from "./components/dialpad/Dialpad";

const App = () => {
  const [recentCalls, setRecentCalls] = useState([]);

  // Function to add a number to recent calls, keeping only the latest 10
  const addRecentCall = (number) => {
    setRecentCalls((prevCalls) => {
      if (prevCalls.includes(number)) return prevCalls; // Avoid duplicates
      return [number, ...prevCalls].slice(0, 10); // Keep the 10 most recent calls
    });
  };

  return (
    <Router>
      <div>
        <div className="border-b border-gray-700">
          <Header />
        </div>
        <div className="flex">
          <div className="border-r border-gray-700">
            {/* Pass recentCalls as a prop to Sidebar */}
            <Sidebar recentCalls={recentCalls} />
          </div>
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<CallLog />} />
              {/* Pass addRecentCall as a prop to Dialpad */}
              <Route path="/dialpad" element={<Dialpad addRecentCall={addRecentCall} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
