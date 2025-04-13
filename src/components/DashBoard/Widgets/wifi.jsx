import React from 'react';
import { getWifiColor, getWifiStrength } from '../../../utils';

const Wifi = ({ strength }) => {
  const bars = getWifiStrength(strength);
  const heights = ['h-[25%]', 'h-[50%]', 'h-[75%]', 'h-full'];
  const color = getWifiColor(strength);

  return (
    <div className='flex flex-col items-center justify-center size-full'>
      <div className="flex justify-evenly items-end w-[50%] h-full gap-2">
        {bars.map((active, i) => (
          <div
            key={i}
            className={`w-full ${heights[i]} 
              ${active 
                ? `${color} dark:opacity-90` 
                : 'bg-gray-200 dark:bg-gray-700'} 
              rounded-sm border border-gray-300 dark:border-gray-600
              transition-colors duration-200`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Wifi;