import React from 'react'

const battery = ({percentage}) => {
  const color = percentage > 60 ? 'bg-green-500' : percentage > 30 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    // Battery frame
    <div className="flex flex-row w-full bg-gray-200 rounded-full h-4 text-black">
      <div
        className={`${color} h-4 rounded-full text-xs text-white text-center`} 
        style={{ width: `${percentage}%` }}
      >
        <span>{percentage}%</span>
      </div>
    </div>
  )
}

export default battery