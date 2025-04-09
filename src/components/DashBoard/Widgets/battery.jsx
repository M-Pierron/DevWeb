import React from 'react'

const battery = ({percentage}) => {
  const color = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    // Battery frame
    <div className="border-2 border-black relative w-full bg-gray-200 rounded-full h-[80%] text-black">
      <div
        className={`${color} h-full rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs text-black">
        {percentage}%
      </span>
    </div>
  )
}

export default battery