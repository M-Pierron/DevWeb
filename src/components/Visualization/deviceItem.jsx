import React from 'react';
import { getWifiColor, getMode } from '../../utils';

const DeviceItem = ({ userDevice, onClick, isSelected }) => {
  return (
    <div 
      className={`flex flex-row h-fit w-full border-b-2 p-4 
        ${isSelected 
          ? "bg-gray-100 dark:bg-gray-700" 
          : "bg-white dark:bg-gray-800"} 
        border-gray-200 dark:border-gray-700 
        hover:cursor-pointer
        hover:bg-gray-50 dark:hover:bg-gray-700
        transition-colors duration-200`}
      onClick={onClick}
    >  
      <div className="flex flex-col w-[50%]">
        <span className='font-bold text-gray-900 dark:text-white'>
          {userDevice.name}
        </span>
        <span className='text-gray-500 dark:text-gray-400'>
          {userDevice.description}
        </span>

        <div className='flex flex-row mt-2'>
          <span className='text-gray-700 dark:text-gray-300'>
            <strong>Mode : </strong>{getMode(userDevice.mode)}
          </span>
        </div>
      </div>
      
      <div className='flex flex-col w-[50%] items-end justify-between'>
        <div className={`rounded-full ${getWifiColor(userDevice.wifi)} size-[24px] border border-gray-300 dark:border-gray-600`}>
        </div>
        <span className='text-gray-700 dark:text-gray-300'>
          {userDevice.battery}%
        </span>
      </div>
    </div>
  );
};

export default DeviceItem;
