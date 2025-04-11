import React from 'react'

const deviceItem = ({userDevice, onClick, isSelected}) => {
  return (
    <div className='flex flex-row h-fit w-full border-b-2 p-4 '>
      <div className={`flex flex-col w-[50%] ${isSelected ? "bg-gray-100" : "bg-white"} border-gray-400 hover:cursor-pointer`}>
          <span className='font-bold' onClick={onClick}>{userDevice.name}</span>
          <span className='text-gray-400'>{userDevice.description}</span>

          <div className='flex flex-row'>
            <span><strong>Mode : </strong>{userDevice.mode}</span>
          </div>
      </div>
      <div className='flex flex-col w-[50%] items-end'>
        
        <span><strong>📶 Wi-Fi : </strong>{userDevice.wifi}</span>
        <span><strong>🔋 Batterie : </strong>{userDevice.battery}</span>

      </div>
    </div>

  )
}

export default deviceItem