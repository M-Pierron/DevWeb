import React, { useState, useEffect } from 'react'

import Gauge from "../gauge"

const temperature = () => {
  // State to track the value of the slider
  const [targetTemperatureValue, setTargetTemperatureValue] = useState(23);

  // Handler for input changes
  const onTargetTemperatureSliderChange = (event) => {
    setTargetTemperatureValue(event.target.value);
  };

  return (
    <div className='flex flex-col bg-gray-500 size-full'>
      <div className='flex justify-center border-2 border-black border-b-0 bg-gray-400 w-full h-fit rounded-t-lg'>
        <h3 className="text-lg font-bold self-center">Température actuelle</h3>
      </div>
      <div className='border-2 border-black border-b-0 bg-gray-100 size-full'>
          <Gauge text="°C"/>
      </div>
      <div className='flex justify-center border-2 border-black border-b-0 bg-gray-400 size-full'>
        <h3 className="text-lg font-bold self-center">Température Cible</h3>
      </div>
      <div className='border-2 border-black bg-gray-100 size-full rounded-b-lg'>
          {/* <!-- Start Slider Component --> */}
          <div className='flex flex-col'>
            <div className="p-4">
              <span className="text-sm"></span>
              <span className="text-sm">{targetTemperatureValue}°C</span>
              <input className="w-full accent-indigo-600" type="range" name="" min="0" max="90" value={targetTemperatureValue} onChange={onTargetTemperatureSliderChange}/>
              <div className="-mt-2 flex w-full justify-between">
                <span className="text-sm text-black font-bold">0</span>
                <span className="text-sm text-black font-bold">90</span>
              </div>
            </div>
          </div>
          {/* <!-- End Slider Component --> */}
      </div>
    </div>
  )
}

export default temperature