import React from 'react'

const wifi = ({ strength }) => {
  const getBars = (level) => {
    switch (level) {
      case 'fort':
        return [true, true, true];
      case 'moyen':
        return [true, true, false];
      case 'faible':
        return [true, false, false];
      default:
        return [false, false, false];
    }
  };

  const colors = ['bg-red-500', 'bg-yellow-400', 'bg-green-500'];
  const bars = getBars(strength);

  return (
    <div className="text-sm w-full text-gray-800">
      <div className="mb-1 font-bold text-black">📶 Wi-Fi</div>
      <div className="flex items-end gap-1 pl-2">
        {bars.map((on, i) => (
          <div
            key={i}
            className={`w-2 ${on ? colors[i] : 'bg-gray-300'} rounded`}
            style={{ height: `${(i + 1) * 8}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default wifi
