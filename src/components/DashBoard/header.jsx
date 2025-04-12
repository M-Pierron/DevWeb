import React from 'react'

import { getDate, getTime } from '../../utils';

const Header = ({selectedDevice}) => {
  return (
    <div className='flex flex-row h-[8%] mb-4 text-black'>
        
        {/* Cadre pour l'ID de l'appareil */}
        <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
            <span className='self-center'>{selectedDevice.id}</span>
        </div>
        
        {/* Div qui sert à séparer */}
        <div className='bg-transparent w-full'></div>
        
        {/* Cadre pour qui contient l'information de la dernière interaction */}
        <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
            <span className='self-center'>Dernière interaction : {getDate(selectedDevice.lastInteraction)}, {getTime(selectedDevice.lastInteraction)}</span>
        </div>
    </div>
  )
}

export default Header