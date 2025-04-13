import React, { useState, useEffect } from 'react';

import ToolsFilter from './toolsFilter';
import ToolsSearchBar from './toolsSearchBar';
import DeviceItem from "./deviceItem";
import { Plus } from 'lucide-react';
import AddDeviceModal from "./addDeviceModal"

import { useDeviceContext } from "../../context/DeviceContext";

const ToolsList = () => {
  const {
    userDevices,
    setUserDevices,
    selectedDevice,
    setSelectedDevice,
    isUserDevicesLoading,
    deviceCategories,
    isToolsFilterLoading,
    setIsAddNewDeviceVisible
  } = useDeviceContext();

  const [isToolsFilterVisible, setToolsFilterVisibility] = useState(false);

  const toggleToolFilterVisibility = () => {
    setToolsFilterVisibility(!isToolsFilterVisible);
  };

  return (
    <>
      <div className='relative bg-gray-400 rounded-xl p-4 w-[25%] h-dvh'>
        {/* Le cadre utilisé pour filtrer les appareils, caché */}
        <ToolsFilter devicesCategories={deviceCategories} isVisible={isToolsFilterVisible} toggleVisibility={toggleToolFilterVisibility} setUserDevices={setUserDevices} />
        
        <div className='flex flex-col h-full'>
          {/* La barre de recherche qui contient le button pour afficher le filtre */}
          <ToolsSearchBar onToolFilterClick={toggleToolFilterVisibility} isFilterLoading={isToolsFilterLoading}/>
          <div 
            onClick={() => setIsAddNewDeviceVisible(true)}
            className="flex flex-row mb-2 mt-4 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 cursor-pointer w-[60%] text-center">
            <Plus className='self-center w-[20%]'/>
            <span className='self-start w-full'>Ajouter un object</span>
          </div>
          {/* Tools list */}
          <div className='flex flex-col h-full bg-white text-black border-1 border-black overflow-y-auto'>
            {/* Afficher les objets filtrés */}
            {!isUserDevicesLoading && userDevices && userDevices.length > 0 ? (
              userDevices.map((userDevice) => (
                <DeviceItem
                  key={userDevice._id}
                  userDevice={userDevice}
                  onClick={() => setSelectedDevice(userDevice)}
                  isSelected={selectedDevice?._id === userDevice._id}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                {isUserDevicesLoading ? (
                  <img src="/src/assets/loading/90-ring.svg" className='self-center'></img>
                ) : (
                  <p>Aucun objet trouvé pour cette catégorie.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ToolsList;
