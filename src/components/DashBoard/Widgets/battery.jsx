import React from 'react'

const battery = ({percentage}) => {
  const color = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    // Battery frame
    <div className="relative w-full bg-gray-200 rounded-full h-4 text-black">
      <div
        className={`${color} h-4 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs text-black">
        {percentage}%
      </span>
    </div>
  )
}

export default battery