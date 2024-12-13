// src/components/Layout.js
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import React, { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [recentCalls, setRecentCalls] = useState([() => {
    try {
      const savedCalls = localStorage.getItem("recentCalls");
      return savedCalls ? JSON.parse(savedCalls) : [];
    } catch (error) {
      console.error("Error parsing recent calls from localStorage:", error);
      return [];
    }
  }]);

  useEffect(() => {
    // fetchItems();
    // dispatch(increment())
    localStorage.setItem("recentCalls", JSON.stringify(recentCalls));
  }, [recentCalls]);

  return (
      <div>
        <div className="border-b border-gray-700">
          <Header />
        </div>
        <div className="flex">
          <Sidebar recentCalls={recentCalls}/>
          <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
