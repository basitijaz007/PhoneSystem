// Dialpad.jsx
import { Device } from "@twilio/voice-sdk";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import CallingScreen from "../callingscreen/CallingScreen";

const Dialpad = ({ addRecentCall, recentCalls }) => {
  const [dialedNumber, setDialedNumber] = useState("");
  const [device, setDevice] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/taskrouter-token"
        );
        console.log(response.data.token);
        return response.data.token;
      } catch (error) {
        console.error("Error fetching token:", error);
        return null;
      }
    };
    const initializeDevice = async () => {
      const token = await fetchToken();
      if (!token) {
        console.error("No token received");
        return;
      }
      try {
        const newDevice = new Device(token, {
          logLevel: 1,
          codecPreferences: ["opus", "pcmu"],
          maxCallSignalingTimeoutMs: 3000,
        });

        newDevice.register();
        console.log("Device initialized:", newDevice);

        newDevice.on("ready", () => {
          console.log("Device is ready");
        });

        newDevice.on("error", (error) => {
          console.error("Twilio Device Error:", error);
        });

        newDevice.on("incoming", (connection) => {
          console.log("Incoming call:", connection);
          connection.accept();
        });

        setDevice(newDevice);
      } catch (error) {
        console.error("Error initializing Twilio Device:", error);
      }
    };

    initializeDevice();
    return () => clearInterval(intervalId);
  }, []);
  const startTimer = () => {
    const id = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    setIntervalId(id);
  };
  const params = {
    To: dialedNumber,
    agent: "basit",
    callerId: "+13219780391",
    Location: "PAk",
  };
  const handleCall = async () => {
    if (!dialedNumber && recentCalls.length > 0) {
      setDialedNumber(recentCalls[0]);
    }
    if (!dialedNumber) {
      console.warn("no number is dailed");
      return;
    }
    if (device) {
      setIsCalling(true);
      setCallAccepted(false);
      try {
        const call = await device.connect({ params });
        // console.log(call);
        setCurrentCall(call);
        addRecentCall(dialedNumber);

        call.on("accept", () => {
          console.log("Call accepted by other person");
          setCallAccepted(true);
          startTimer();
        });
        call.on("disconnect", () => {
          console.log("Call disconnected");
          clearInterval(intervalId);
          setIntervalId(null);
          setCallDuration(0);
          setCallAccepted(false);
          setIsCalling(false);
          setCurrentCall(null);
          setDialedNumber("");
        });
      } catch (error) {
        console.error("Call failed:", error);
        setIsCalling(false);
      }
    } else {
      console.error("Device not initialized");
    }
  };
  const handleEndCall = () => {
    if (currentCall) {
      currentCall.disconnect();
      clearInterval(intervalId);
      setIntervalId(null);
      setCallDuration(0);
      setIsCalling(false);
      setCurrentCall(null);
      setDialedNumber("");
    }
  };

  const dialButtons = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" },
  ];

  const handleButtonClick = (number) => {
    setDialedNumber((prev) => prev + number);
  };

  const clearDialedNumber = () => {
    setDialedNumber("");
  };

  return isCalling || callAccepted ? (
    <CallingScreen
      dialedNumber={dialedNumber}
      onEndCall={handleEndCall}
      callDuration={callDuration}
      callAccepted={callAccepted}
    />
  ) : (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white p-6">
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          className="w-3/4 sm:w-1/2 bg-gray-900 text-center text-3xl text-white p-3 rounded-full shadow-lg outline-none placeholder-gray-500"
          placeholder="Enter number"
          value={dialedNumber}
          onChange={(e) => setDialedNumber(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {dialButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(button.number)}
            className="flex flex-col items-center justify-center bg-gray-700 p-6 rounded-lg text-2xl font-semibold text-white hover:bg-gray-600 transform transition-all duration-150 ease-in-out shadow-lg hover:shadow-xl active:scale-90"
          >
            {button.number}
            <span className="text-sm font-light text-gray-300 mt-1">
              {button.letters}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={handleCall}
        className="mt-6 flex items-center justify-center bg-green-600 p-4 rounded-full text-2xl text-white shadow-lg hover:bg-green-500 active:scale-90 transform transition-all duration-150 ease-in-out"
      >
        <FaPhone className="mr-2" /> Call
      </button>

      <button
        onClick={clearDialedNumber}
        className="mt-4 text-gray-400 hover:text-gray-300 text-sm"
      >
        Clear
      </button>
    </div>
  );
};

export default Dialpad;
