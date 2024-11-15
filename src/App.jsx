
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import CallLog from "./components/calllogs/CallLog";
import Dialpad from "./components/dialpad/Dialpad";
import Login from "./components/Auth/login";
import Inbox from "./components/sidebar/Contacts/Inbox";
import Contacts from "./components/sidebar/Contacts/Contacts";
import Threads from "./components/sidebar/Contacts/Threads";
import Channels from "./components/sidebar/Contacts/Channels";
import Calendar from "./components/calendar/Calendar";

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions/counterActions';

const App = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [recentCalls, setRecentCalls] = useState(() => {
    try {
      const savedCalls = localStorage.getItem("recentCalls");
      return savedCalls ? JSON.parse(savedCalls) : [];
    } catch (error) {
      console.error("Error parsing recent calls from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    dispatch(increment())
    localStorage.setItem("recentCalls", JSON.stringify(recentCalls));
  }, [recentCalls]);

  const addRecentCall = (number) => {
    setRecentCalls((prevCalls) => {
      if (prevCalls.includes(number)) return prevCalls;

      const updatedCalls = [number, ...prevCalls].slice(0, 10);
      return updatedCalls;
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
            <Sidebar recentCalls={recentCalls} />
          </div>
          <div className="flex-1 ">
            <Routes>
              <Route path="/" element={<CallLog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/Threads" element={<Threads />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route
                path="/dialpad"
                element={<Dialpad addRecentCall={addRecentCall} recentCalls={recentCalls} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
