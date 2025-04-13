import React from 'react'
import { getWifiColor, getMode } from '../../utils';

// -- Component qui représente un appareil pour la liste d'appareils --
const deviceItem = ({userDevice, onClick, isSelected}) => {
  return (
    <div 
      className={`flex flex-row h-fit w-full border-b-2 p-4 ${isSelected ? "bg-gray-100" : "bg-white"} border-gray-400 hover:cursor-pointer`}
      onClick={onClick}
    >  
      <div className="flex flex-col w-[50%]">
          <span className='font-bold'>{userDevice.name}</span>
          <span className='text-gray-400'>{userDevice.description}</span>

          <div className='flex flex-row'>
            <span><strong>Mode : </strong>{getMode(userDevice.mode)}</span>
          </div>
      </div>
      
      <div className='flex flex-col w-[50%] items-end justify-between'>
        <div className={`rounded-full ${getWifiColor(userDevice.wifi)} size-[24px] border-1 border-black`}>
        </div>
        <span>{userDevice.battery}%</span>

      </div>
    </div>

  )
}

export default deviceItem
