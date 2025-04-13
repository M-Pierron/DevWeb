import React from 'react';
import Header from "./header";
import Temperature from "../../DashBoard/Widgets/temperature";
import Battery from "../../DashBoard/Widgets/battery";
import Wifi from "../../DashBoard/Widgets/wifi";
import Mode from "../../DashBoard/Widgets/mode";
import Conso from '../../DashBoard/Widgets/conso';
import { useDeviceContext } from "../../../context/DeviceContext";

const Frame = () => {
  const {
    selectedDevice,
    handleSelectedDeviceDeleteModal
  } = useDeviceContext();

  return (
    <div className='flex flex-col w-[70%] h-full'>
      <Header selectedDevice={selectedDevice} onDeleteSelectedDeviceClick={handleSelectedDeviceDeleteModal}/>
      
      <div className='bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
        h-full rounded-xl shadow-lg transition-colors duration-200'>
        <div className='flex flex-row size-full'>
          <div id="mainFrame" className='p-4 size-full'>
          {Object.entries(selectedDevice.attributes).map(([key, innerObj]) => (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              {JSON.stringify(innerObj)}
            </div>
          ))}
          </div>

          <div id="sideFrame" className='flex flex-col pr-4 size-full'>
            <div className='flex flex-row m-4 ml-0 h-[30%] w-full gap-2'>
              <div className='flex flex-col items-center size-full'>
                <div className='flex justify-center w-full bg-gray-200 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 border-b-0 rounded-t-xl
                  transition-colors duration-200'>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">🔋 Batterie</h3>
                </div>
                <div className='bg-white dark:bg-gray-800 flex flex-col border border-gray-200 
                  dark:border-gray-600 size-full p-4 justify-center rounded-b-xl
                  transition-colors duration-200'>
                  <Battery percentage={selectedDevice.battery}/>  
                </div>
              </div>
              
              <div className='flex flex-col items-center size-full'>
                <div className='flex justify-center w-full bg-gray-200 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600 border-b-0 rounded-t-xl
                  transition-colors duration-200'>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">📶 Wi-Fi</h3>
                </div>
                <div className='bg-white dark:bg-gray-800 flex flex-col border border-gray-200 
                  dark:border-gray-600 size-full p-4 justify-center rounded-b-xl
                  transition-colors duration-200'>
                  <Wifi strength={selectedDevice.wifi}/>  
                </div>
              </div>
            </div>
            
            {/* Cadre pour les modes */}
            <div className='flex flex-col mb-4 w-full h-[40%]'>
              <div className='bg-gray-200 dark:bg-gray-700 w-full text-center 
                rounded-t-xl border border-gray-200 dark:border-gray-600
                transition-colors duration-200'>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Mode</h3>
              </div>
              <div className='bg-white dark:bg-gray-800 flex items-center justify-center size-full p-4 
                border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-xl shadow-lg
                transition-colors duration-200'>
                <div className="w-full max-w-xl">
                  <Mode mode={selectedDevice.mode}/>
                </div>
              </div>
            </div>
            
            {/* Cadre pour la consommation */}
            <div className='flex flex-col mb-4 size-full'>
              <div className='flex justify-center w-full bg-gray-200 dark:bg-gray-700 
                border border-gray-200 dark:border-gray-600 border-b-0 rounded-t-xl
                transition-colors duration-200'>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">📈 Consommation récente</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 flex justify-center size-full 
                border border-gray-200 dark:border-gray-600 rounded-b-xl
                transition-colors duration-200">
                <Conso/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame;