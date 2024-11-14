import React from "react";
import { FaVolumeUp, FaMicrophoneSlash, FaPhone, FaPlus } from "react-icons/fa";
const formatDuration = (duration) => {
  const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
  const seconds = String(duration % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const CallingScreen = ({ onEndCall,dialedNumber,callAccepted,callDuration }) => {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-50 blur-lg" />

      <div className="z-10 text-4xl font-extrabold mb-8 tracking-wide text-white opacity-90 shadow-lg">
        {dialedNumber}
      </div>
      {callAccepted ? (
        <div className="z-10 text-xl font-medium mb-4 opacity-90 tracking-wider">
          {formatDuration(callDuration)}
        </div>
      ) : (
        <div className="mb-4 text-lg font-semibold">📞 Calling...</div>
      )}

      <div className="z-10 grid grid-cols-3 gap-6 mb-12">
        <button
          aria-label="Speaker"
          className="flex flex-col items-center p-4 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-transform duration-150 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <FaVolumeUp size={24} />
          <span className="text-xs mt-1">Speaker</span>
        </button>
        <button
          aria-label="Add Call"
          className="flex flex-col items-center p-4 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-transform duration-150 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <FaPlus size={24} />
          <span className="text-xs mt-1">Add</span>
        </button>
        <button
          aria-label="Mute"
          className="flex flex-col items-center p-4 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-transform duration-150 ease-in-out transform hover:scale-105 shadow-lg"
        >
          <FaMicrophoneSlash size={24} />
          <span className="text-xs mt-1">Mute</span>
        </button>
      </div>

      <button
        onClick={onEndCall}
        aria-label="End Call"
        className="z-10 flex items-center justify-center p-5 bg-red-600 rounded-full text-3xl text-white shadow-lg transition-transform duration-150 ease-in-out transform hover:scale-105 hover:bg-red-500"
      >
        <FaPhone className="transform rotate-135" />
      </button>
    </div>
  );
};

export default CallingScreen;
