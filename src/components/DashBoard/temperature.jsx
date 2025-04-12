import React, { useState, useEffect } from 'react'

const temperature = () => {
  // State to track the value of the slider
  const [targetTemperatureValue, setTargetTemperatureValue] = useState(23);

  // Handler for input changes
  const onTargetTemperatureSliderChange = (event) => {
    setTargetTemperatureValue(event.target.value);
  };

  return (
    <div className='rounded-lg border-2 border-black w-full h-full'>
        <div className='flex flex-col w-full h-full p-4'>
          <span className='self-center'>Température actuelle</span>
          {/* <!-- Gauge Component --> */}
          <div class="relative size-full">
              <svg class="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  {/* <!-- Background Circle (Gauge) --> */}
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="75 100" stroke-linecap="round"></circle>

                  {/* <!-- Gauge Progress --> */}
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-500 dark:text-green-500" stroke-width="2" stroke-dasharray="56.25 100" stroke-linecap="round"></circle>
              </svg>

              {/* <!-- Value Text --> */}
              <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span class="text-fit font-bold text-green-600 dark:text-green-500">19.0°C</span>
              </div>
          </div>
          {/* <!-- End Gauge Component --> */}
          
          {/* <!-- Start Slider Component --> */}
          <div className='flex flex-col'>
            <span className='self-center'>Température Cible</span>
            <div class="p-4">
              <span class="text-sm"></span>
              <span class="text-sm">{targetTemperatureValue}°C</span>
              <input class="w-full accent-indigo-600" type="range" name="" min="0" max="90" value={targetTemperatureValue} onChange={onTargetTemperatureSliderChange}/>
              <div class="-mt-2 flex w-full justify-between">
                <span class="text-sm text-black font-bold">0</span>
                <span class="text-sm text-black font-bold">90</span>
              </div>
            </div>
          </div>
          {/* <!-- End Slider Component --> */}
        </div>
    </div>
  )
}

export default temperature