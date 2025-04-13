import React from 'react';
import { getDate, getTime } from '../../../utils';
import { useDeviceContext } from "../../../context/DeviceContext";

const Header = () => {
  const {
    selectedDevice,
    setIsDeleteConfirmVisible
  } = useDeviceContext();

  return (
    <div className='flex flex-row h-[8%] mb-4 text-gray-900 dark:text-white justify-between transition-colors duration-200'>
      <div className='flex flex-row gap-2'>
        {/* <button 
          type='button' 
          className='px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
            dark:bg-indigo-500 dark:hover:bg-indigo-600
            h-full w-fit text-white cursor-pointer
            transition-colors duration-200'
        >
          Modifier
        </button> */}
        <button 
          type='button' 
          onClick={() => setIsDeleteConfirmVisible(true)} 
          className='px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
            dark:bg-red-500 dark:hover:bg-red-600
            h-full w-fit text-white cursor-pointer
            transition-colors duration-200'
        >
          Supprimer
        </button>
      </div>

      <div className="flex flex-row w-[60%] gap-2">
        <div className='flex flex-row p-4 rounded-lg bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 h-full w-fit font-bold
          transition-colors duration-200'>
          <span className='self-center'>{selectedDevice.id}</span>
        </div>

        <div className='flex flex-row p-4 rounded-lg bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 h-full w-fit font-bold
          transition-colors duration-200'>
          <span className='self-center'>
            Dernière interaction : {getDate(selectedDevice.lastInteraction)}, {getTime(selectedDevice.lastInteraction)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;