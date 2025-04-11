import React, { useState, useEffect } from 'react';

import ToolsFilter from './toolsFilter';
import ToolsSearchBar from './toolsSearchBar';
import DeviceItem from "./deviceItem";
import { Plus } from 'lucide-react';
import AddDeviceModal from "./addDeviceModal"

// Component qui représente la fênetre qui contient les appareils de l'utilisateur
// selectedDevice : L'appareil selectionnée
// setSelectedDevice : Etat qui determine 
const ToolsList = ({selectedDevice, setSelectedDevice}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 
  const [isToolsFilterLoading, setToolsFilterLoading] = useState(false);
  const [isToolsFilterVisible, setToolsFilterVisibility] = useState(false);
  
  // 
  const [isUserDevicesLoading, setUserDevicesLoading] = useState(false);
  const [userDevices, setUserDevices] = useState([]);

  const [deviceCategories, setDeviceCategories] = useState([]);

  useEffect(() => {
    // Récuperer les appareils (et leur catégories)
    const fetchCategories = async () => {
      setToolsFilterLoading(true);

      try {
        console.log(`[fetchCategories] Envoi requête vers: http://localhost:5000/api/devices/deviceCategories`);
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/devices/deviceCategories", {
          method: "GET",
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log("[fetchCategories] Réponse reçue:", data);
        
        if (data){
          console.log("[fetchCategories] Succès côté serveur");
          setDeviceCategories(data);
        }
        
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setToolsFilterLoading(false);
      }
    };

    // Récuperer les appareils de l'utilisateur
    const fetchUserDevices = async () => {
      setUserDevicesLoading(true);

      try {
        console.log(`[fetchUserDevices] Envoi requête vers: http://localhost:5000/api/devices/getConnectedUserDevices`);
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/devices/getConnectedUserDevices", {
          method: "GET",
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log("[fetchUserDevices] Réponse reçue:", data);

        if (data){
          console.log("[fetchUserDevices] Succès côté serveur");
          setUserDevices(data);
        }

      } catch (err) {
        console.error("[fetchUserDevices] Erreur catché:", error);
      } finally {
        setUserDevicesLoading(false);
      }
    };

    fetchCategories(); // call the async function
    fetchUserDevices();
  }, []);

  const onToolFilterClick = () => {
    setToolsFilterVisibility(!isToolsFilterVisible);
  };

  const onAddObjectClick = () => {
    setIsModalVisible(true);
  };

  const onCloseModalClick = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='relative bg-gray-400 rounded-xl p-4 w-[25%] h-dvh'>
        {/* Le cadre utilisé pour filtrer les appareils, caché */}
        <ToolsFilter devicesCategories={deviceCategories} isVisible={isToolsFilterVisible} toggleVisibility={onToolFilterClick} setUserDevices={setUserDevices} />
        
        <div className='flex flex-col h-full'>
          {/* La barre de recherche qui contient le button pour afficher le filtre */}
          <ToolsSearchBar onToolFilterClick={onToolFilterClick} isFilterLoading={isToolsFilterLoading}/>
          <div 
            onClick={onAddObjectClick}
            className="flex flex-row mb-2 mt-4 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 cursor-pointer w-[60%] text-center">
            <Plus className='self-center w-[20%]'/>
            <span className='self-start w-full'>Ajouter un object</span>
          </div>
          {/* Tools list */}
          <div className='flex flex-col h-full bg-white text-black'>
            {/* Afficher les objets filtrés */}
            {!isUserDevicesLoading && userDevices.length > 0 ? (
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
                <img src="/src/assets/loading/90-ring.svg" className='self-center'></img>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalVisible && <AddDeviceModal deviceCategories={deviceCategories} onCancelClick={onCloseModalClick}/>}
    </>
  );
}

export default ToolsList;
