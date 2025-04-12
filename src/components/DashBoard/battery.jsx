import React from 'react'

const battery = ({percentage}) => {
  return (
    <div className="flex size-full">
      <div className="border-2 border-black rounded-xl flex items-center relative overflow-hidden size-full">
        <div className="h-full bg-green-500 absolute left-0 top-0" style={{ width: `${percentage}%` }}></div>
        <span className="text-full font-bold text-black w-full text-center relative">{percentage}%</span>
      </div>
      {/* Tip of the battery */}
      <div className="w-[10%] h-[80%] rounded-r-xl bg-black self-center"></div>
    </div>
  )
}

export default battery