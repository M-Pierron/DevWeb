import React, { useState } from 'react'

import Header from "./header"
import Temperature from "./temperature"
import Battery from "./battery"
import Wifi from "./wifi"
import Mode from "./mode"
import Conso from './conso'

const frame = () => {
  return (
    <div className='flex flex-col w-[70%]'>
        <Header/>
        <div className='bg-gray-500 border-2 border-black h-full rounded-xl shadow-lg'>
        <div className='flex flex-row size-full'>
            
            <div id="mainFrame" className='p-4 size-full'>
              <Temperature/>
            </div>

            <div id="sideFrame" className='flex flex-col pr-4 h-full w-full'>
              {/* Cadre pour la batterie et WIFI */}
              <div className='flex flex-row m-4 ml-0 h-[30%] w-full'>
                {/* Cadre pour la batterie */}
                <div className='flex flex-col mr-2 items-center size-full'>
                    <div className='flex justify-center w-full bg-gray-400 border-2 border-black border-b-0 rounded-t-xl'>
                      <h3 className="text-lg font-bold">🔋 Batterie</h3>
                    </div>
                    <div className='flex flex-col border-2 border-black size-full p-4 justify-center rounded-b-xl'>
                      <Battery percentage={65}/>  
                    </div>
                </div>
                <div className='flex items-center gap-2 p-4 border-2 border-black rounded-xl shadow-lg size-full'>
                    <Wifi/>  
                </div>
              </div>
              
              {/* Cadre pour les modes */}
              <div className='flex flex-col mb-4 items-center w-full h-[40%]'>
                {/* En-tête */}
                <div className='bg-gray-400 self-start w-full text-center rounded-t-xl border-2 border-black'>
                  <h3 className="text-lg font-bold">Mode</h3>
                </div>
                <Mode/>
              </div>
              
              <div className='flex flex-col mb-4 size-full'>
                {/* En-tête */}
                <div className='flex justify-center w-full bg-gray-400 border-2 border-black border-b-0 rounded-xl rounded-b-none'>
                  <h3 className="text-lg font-bold">📈 Consommation récente</h3>
                </div>
                <div className="flex justify-center size-full border-2 border-black rounded-b-xl">
                  <Conso/>
                </div>
              </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default frame