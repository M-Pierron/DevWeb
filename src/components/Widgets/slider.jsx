import React, { useState } from 'react';

const Slider = ({ data }) => {
  const [value, setValue] = useState(data.value || 0);

  return (
    <div className='flex flex-col'>
      <div className="flex flex-col p-4">
        <span className="text-sm"></span>
        <span className="text-sm font-bold self-center">{value}{data.unit}</span>
        <input
          className="w-full accent-indigo-600"
          type="range"
          min={data.min}
          max={data.max}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="-mt-2 flex w-full justify-between">
          <span className="text-sm text-black dark:text-white font-bold">{data.min}</span>
          <span className="text-sm text-black dark:text-white font-bold">{data.max}</span>
        </div>
      </div>
    </div>
  );
};

export default Slider;