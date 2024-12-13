
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import CallLog from "./components/calllogs/CallLog";
import Dialpad from "./components/dialpad/Dialpad";
import Login from "./components/Auth/login";
import Inbox from "./components/sidebar/Contacts/Inbox";
import Contacts from "./components/sidebar/Contacts/Contacts";
import Threads from "./components/sidebar/Contacts/Threads";
import Channels from "./components/sidebar/Contacts/Channels";
import Calendar from "./components/calendar/Calendar";
import { Device } from "@twilio/voice-sdk";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions/counterActions';
import { getData, postData,getAuthData } from './services/apiService';
import { initiateWorker,setupDevice } from './services/common';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('authToken')));
  const token = useSelector((state) => state.token.token);
  console.log(token);
  
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
    if(isAuthenticated){

      fetchItems();
    }
    // dispatch(increment())
    localStorage.setItem("recentCalls", JSON.stringify(recentCalls));
  }, [recentCalls]);

  const fetchItems = async () => {
    try {
      const device = await getAuthData('/phone/getToken'); // Replace '/items' with your API endpoint
      // console.log(items.data.token);
      setupDevice(device);
      const worker = await getAuthData('/phone/getToken1'); // Replace '/items' with your API endpoint
      // console.log(items.data.token);
      initiateWorker(worker);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };
  const addRecentCall = (number) => {
    setRecentCalls((prevCalls) => {
      if (prevCalls.includes(number)) return prevCalls;

      const updatedCalls = [number, ...prevCalls].slice(0, 10);
      return updatedCalls;
    });
  };

  return (
    <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={ 
                <ProtectedRoute isAuthenticated={isAuthenticated}> 
                  <Layout><CallLog /> </Layout>
                </ProtectedRoute>
              } />
              <Route path="/inbox" element={ <Layout><Inbox /></Layout>} />
              <Route path="/contacts" element={ <Layout><Contacts /></Layout>} />
              <Route path="/channels" element={ <Layout><Channels /></Layout>} />
              <Route path="/Threads" element={ <Layout><Threads /></Layout>} />
              <Route path="/calendar" element={ <Layout><Calendar /></Layout>} />
              <Route
                path="/dialpad"
                element={<Dialpad addRecentCall={addRecentCall} recentCalls={recentCalls} />}
              />
            </Routes>
    </Router>
  );
};

export default App;
