import React from 'react'

const battery = ({percentage}) => {
  return (
    <div className="relative size-full">
      <div className="border-2 border-black rounded flex items-center relative overflow-hidden size-full">
        <div className="h-full bg-green-500 absolute left-0 top-0" style={{ width: `${percentage}%` }}></div>
        <span className="text-full font-bold text-black w-full text-center relative">{percentage}%</span>
      </div>
      <div className="w-1 h-[80%] bg-black absolute right-[-4px] top-1/2 transform -translate-y-1/2"></div>
    </div>
  )
}

export default battery