import React, { useEffect, useState } from 'react'

import Header from "./header"
import Temperature from "../../DashBoard/Widgets/temperature"
import Battery from "../../DashBoard/Widgets/battery"
import Wifi from "../../DashBoard/Widgets/wifi"
import Mode from "../../DashBoard/Widgets/mode"
import Conso from '../../DashBoard/Widgets/conso'

import { useDeviceContext } from "../../../context/DeviceContext";

const frame = () => {
  const {
    selectedDevice,
    handleSelectedDeviceDeleteModal
  } = useDeviceContext();

  return (
    // Le cadre qui contient l'en-tête et le cadre pour les widgets
    <div className='flex flex-col w-[70%] h-full'>
      
      {/* En-tête qui montre l'ID et la dernière interaction */}
      <Header selectedDevice={selectedDevice} onDeleteSelectedDeviceClick={handleSelectedDeviceDeleteModal}/>
      
      {/* Cadre qui contient les widgets */}
      <div className='bg-gray-500 border-2 border-black h-full rounded-xl shadow-lg'>

        {/* Divisé le cadre en deux colonnes */}
        <div className='flex flex-row size-full'>
            
            {/* Coté gauche du cadre */}
            <div id="mainFrame" className='p-4 size-full'>
              <Temperature/>
            </div>

            {/* Coté droit du cadre */}
            <div id="sideFrame" className='flex flex-col pr-4 size-full'>
              
              {/* Cadre pour la batterie et WIFI */}
              <div className='flex flex-row m-4 ml-0 h-[30%] w-full'>
                {/* Cadre pour la batterie */}
                <div className='flex flex-col mr-2 items-center size-full'>
                    {/* En-tête pour la batterie */}
                    <div className='flex justify-center w-full bg-gray-400 border-2 border-black border-b-0 rounded-t-xl'>
                      <h3 className="text-lg font-bold">🔋 Batterie</h3>
                    </div>
                    {/* Le widget de la batterie */}
                    <div className='bg-white flex flex-col border-2 border-black size-full p-4 justify-center rounded-b-xl'>
                      <Battery percentage={selectedDevice.battery}/>  
                    </div>
                </div>
                
                {/* Cadre pour le Wifi */}
                <div className='flex flex-col items-center size-full'>
                    {/* En-tête pour la Wifi */}
                    <div className='flex justify-center w-full bg-gray-400 border-2 border-black border-b-0 rounded-t-xl'>
                      <h3 className="text-lg font-bold">📶 Wi-Fi</h3>
                    </div>
                    {/* Le wigdet de la wifi */}
                    <div className='bg-white flex flex-col border-2 border-black size-full p-4 justify-center rounded-b-xl'>
                      <Wifi strength={selectedDevice.wifi}/>  
                    </div>
                </div>

              </div>
              
              {/* Cadre pour les modes */}
              <div className='flex flex-col mb-4 items-center w-full h-[40%]'>
                {/* En-tête */}
                <div className='bg-gray-400 self-start w-full text-center rounded-t-xl border-2 border-black'>
                  <h3 className="text-lg font-bold">Mode</h3>
                </div>
                {/* Le widget pour les modes */}
                <div className='bg-white flex flex-row size-full p-4 border-2 border-t-0 border-black rounded-b-xl shadow-lg'>
                  <Mode mode={selectedDevice.mode}/>
                </div>
              </div>
              
              <div className='flex flex-col mb-4 size-full'>
                {/* En-tête pour la consommation */}
                <div className='flex justify-center w-full bg-gray-400 border-2 border-black border-b-0 rounded-xl rounded-b-none'>
                  <h3 className="text-lg font-bold">📈 Consommation récente</h3>
                </div>
                {/* Le widget pour la consommation */}
                <div className="bg-white flex justify-center size-full border-2 border-black rounded-b-xl">
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