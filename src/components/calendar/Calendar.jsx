import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date()); 

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950"> 
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"> 
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Select a Date</h2> 
        
        <ReactCalendar
          onChange={onChange}
          value={value}
          className="react-calendar rounded-lg shadow-md" 
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
