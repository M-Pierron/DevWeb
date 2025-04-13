import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import ToolsFilter from './toolsFilter';
import ToolsSearchBar from './toolsSearchBar';
import DeviceItem from "./deviceItem";
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
    <div className='relative bg-gradient-to-b from-gray-400 dark:from-gray-700 to-gray-500 dark:to-gray-800 rounded-xl p-4 w-[25%] h-dvh shadow-lg transition-colors duration-200'>
      {/* Filter panel */}
      <ToolsFilter 
        devicesCategories={deviceCategories} 
        isVisible={isToolsFilterVisible} 
        toggleVisibility={toggleToolFilterVisibility} 
        setUserDevices={setUserDevices} 
      />
      
      <div className='flex flex-col h-full gap-4'>
        {/* Search bar with filter button */}
        <ToolsSearchBar 
          onToolFilterClick={toggleToolFilterVisibility} 
          isFilterLoading={isToolsFilterLoading}
        />

        {/* Add device button */}
        <button
          onClick={() => setIsAddNewDeviceVisible(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white py-2.5 px-4 rounded-xl 
                     hover:bg-indigo-700 dark:hover:bg-indigo-600 active:bg-indigo-800 dark:active:bg-indigo-700 
                     transition-colors duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Ajouter un object</span>
        </button>

        {/* Devices list */}
        <div className='flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-inner overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-200'>
          {isUserDevicesLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
          ) : userDevices && userDevices.length > 0 ? (
            <div className="h-full overflow-y-auto px-2 py-3 space-y-2">
              {userDevices.map((userDevice) => (
                <DeviceItem
                  key={userDevice._id}
                  userDevice={userDevice}
                  onClick={() => setSelectedDevice(userDevice)}
                  isSelected={selectedDevice?._id === userDevice._id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-4">
              <p className="text-lg font-medium">Aucun objet trouvé</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1">
                Aucun objet trouvé pour cette catégorie.
                <br />
                Essayez de modifier vos filtres.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolsList;