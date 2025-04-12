import React from 'react'

import { getDate, getTime } from '../../../utils';

import { useDeviceContext } from "../../../context/DeviceContext";

const Header = () => {
  const {
    selectedDevice,
    setIsDeleteConfirmVisible
  } = useDeviceContext();

  return (
    <div className='flex flex-row h-[8%] mb-4 text-black justify-between'>
        
        <div className='flex flex-row gap-2'>
            <button type='button' className='p-4 rounded-lg bg-blue-500 h-full w-fit text-white cursor-pointer'>Modifier</button>
            <button type='button' onClick={() => setIsDeleteConfirmVisible(true)} className='p-4 rounded-lg bg-red-500 h-full w-fit text-white cursor-pointer'>Supprimer</button>
        </div>

        <div className="flex flex-row w-[50%] gap-2">
          {/* Cadre pour l'ID de l'appareil */}
          <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
              <span className='self-center'>{selectedDevice.id}</span>
          </div>
        
          {/* Cadre pour qui contient l'information de la dernière interaction */}
          <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
              <span className='self-center'>Dernière interaction : {getDate(selectedDevice.lastInteraction)}, {getTime(selectedDevice.lastInteraction)}</span>
          </div>
        </div>
    </div>
  )
}

export default Header