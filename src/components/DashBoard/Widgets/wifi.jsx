import React from 'react';

const Wifi = ({ strength }) => {
  const getBars = (level) => {
    switch (level) {
      case 'STRONG':
        return [true, true, true, true];
      case 'MODERATE':
        return [true, true, true, false];
      case 'WEAK':
        return [true, true, false, false];
      case 'VERY_WEAK':
        return [true, false, false, false];
      default:
        return [false, false, false, false];
    }
  };

  const getColor = (level) => {
    switch (level) {
      case 'STRONG':
        return 'bg-green-500'; // green for strong
      case 'MODERATE':
        return 'bg-yellow-400'; // yellow for moderate
      case 'WEAK':
        return 'bg-red-500'; // red for weak
      case 'VERY_WEAK':
        return 'bg-gray-300'; // gray for very weak
      default:
        return 'bg-gray-300'; // default to gray
    }
  };

  const bars = getBars(strength);
  const heights = ['25%', '50%', '75%', '100%'];
  const color = getColor(strength); // Get the color based on strength

  return (
    <div className='flex flex-col items-center justify-center size-full'>
      <div className="flex justify-evenly items-end w-[50%] h-full">
        {bars.map((active, i) => (
          <div
            key={i}
            className={`w-full h-[${heights[i]}] 
            ${i !== bars.length - 1 ? 'mr-2' : ''} 
            ${active ? color : 'bg-gray-300'} 
            border-2 border-black`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Wifi;
