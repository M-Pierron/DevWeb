import React from 'react'

const slider = () => {
  return (
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
  )
}

export default slider