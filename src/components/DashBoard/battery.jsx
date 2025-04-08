import React from 'react'

const battery = ({ level }) => {
  const color = level > 60 ? 'bg-green-500' : level > 30 ? 'bg-yellow-400' : 'bg-red-500';
  return (
    <div className="w-full mb-4">
      <div className="text-sm font-bold mb-1 text-gray-800">🔋 Batterie</div>
      <div className="w-full bg-gray-200 rounded-full h-4 text-black">
        <div
          className={`${color} h-4 rounded-full text-xs text-white text-center`} 
          style={{ width: `${level}%` }}
        >
          {level}%
        </div>
      </div>
    </div>
  );
};

export default battery
