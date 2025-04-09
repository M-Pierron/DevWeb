import React, { useState, useEffect } from 'react';

import ToolsFilter from './toolsFilter';
import ToolsSearchBar from './toolsSearchBar';
import DeviceItem from "./deviceItem";
import { Plus } from 'lucide-react';
import { iotDevices } from "../iotDevices"
import AddDeviceModal from "./addDeviceModal"

const ToolsList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isToolsFilterVisible, setToolsFilterVisibility] = useState(false);
  const [category, setCategory] = useState('');
  const [filteredObjects, setFilteredObjects] = useState([]);

  const onToolFilterClick = () => {
    setToolsFilterVisibility(!isToolsFilterVisible);
  };

  const onAddObjectClick = () => {
    setIsModalVisible(true);
  };

  const onCloseModalClick = () => {
    setIsModalVisible(false);
  };

  const handleCategorySelection = async (category) => {
    setCategory(category); // Mémoriser la catégorie sélectionnée
    const response = await fetch(`http://localhost:5000/api/objects/filter?category=${category}`);
    const data = await response.json();
    setFilteredObjects(data); // Mettre à jour les objets filtrés
  };

  return (
    <>
      <div className='relative bg-gray-400 rounded-xl p-4 w-[25%] h-dvh'>
        {/* Le cadre utilisé pour filtrer les appareils, caché */}
        <ToolsFilter tools={iotDevices} isVisible={isToolsFilterVisible} toggleVisibility={onToolFilterClick} />
        <div className='flex flex-col h-full'>
          {/* La barre de recherche qui contient le button pour afficher le filtre */}
          <ToolsSearchBar onToolFilterClick={onToolFilterClick} />
          <div 
            onClick={onAddObjectClick}
            className="flex flex-row mb-2 mt-4 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 cursor-pointer w-[60%] text-center">
            <Plus className='self-center w-[20%]'/>
            <span className='self-start w-full'>Ajouter un object</span>
          </div>
          {/* Tools list */}
          <div className='flex flex-col h-full bg-white text-black'>
            {/* Afficher les objets filtrés */}
            {filteredObjects.length > 0 ? (
              filteredObjects.map((object) => (
                <DeviceItem key={object._id} deviceName={object.name} />
              ))
            ) : (
              <p className='self-center'>Aucun objet trouvé pour cette catégorie.</p>
            )}
          </div>
        </div>
      </div>

      {isModalVisible && <AddDeviceModal onCancelClick={onCloseModalClick}/>}
    </>
  );
}

export default ToolsList;
