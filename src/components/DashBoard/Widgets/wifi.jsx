import React from 'react';
import { getWifiColor, getWifiStrength } from '../../../utils';

const Wifi = ({ strength }) => {
  const bars = getWifiStrength(strength);
  const heights = ['25%', '50%', '75%', '100%'];
  const color = getWifiColor(strength);

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
