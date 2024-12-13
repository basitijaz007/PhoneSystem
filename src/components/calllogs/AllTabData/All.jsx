import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../../redux/actions/counterActions';

const All = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch(INCREMENT());
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">
          A
        </div>
        <div>
          <div className="text-white font-semibold">(914) 768-2746</div>
          <div className="text-gray-500 text-sm">Outbound / 1 min {{count}}</div>
        </div>
      </div>
      <div className="text-gray-500 text-sm">Saturday</div>   
    </div>
  );
};

export default All;
