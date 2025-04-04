import React from 'react'

const deviceItem = ({deviceName, onClick, isSelected}) => {
  return (
    <div className={`flex flex-row border-b-2 h-12 ${isSelected ? "bg-gray-100" : "bg-white"} border-gray-400 hover:cursor-pointer font-bold`}>
        <span className='ml-2 self-center' onClick={onClick}>{deviceName}</span>
    </div>
  )
}

export default deviceItem