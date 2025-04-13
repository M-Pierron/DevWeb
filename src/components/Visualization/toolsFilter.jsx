import React, { useState, useEffect } from "react";
import AccordionItem from "../Accordion/accordionItem";

const ToolsFilter = ({devicesCategories, isVisible, toggleVisibility, setUserDevices}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState([]);

    const onCheckboxChange = async (deviceId, isChecked) => {
      setSelectedDevices((prevSelectedDevices) => {
        if (isChecked) {
          return [...prevSelectedDevices, deviceId];
        } else {
          return prevSelectedDevices.filter((name) => name !== deviceId);
        }
      });
    };

    useEffect(() => {
      async function filterDevices() {
        console.log("[onDeviceFilterSubmit] Formulaire soumis !");
        setIsLoading(true);

        try {
          console.log(`[onDeviceFilterSubmit] Envoi requête vers: http://localhost:5000/api/devices/filter`);
          const token = localStorage.getItem('token');     
          const response = await fetch("http://localhost:5000/api/devices/filter", {
            method: "POST",
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              selectedDevices: selectedDevices, 
            }),
          });
  
          const data = await response.json();
          console.log("[onDeviceFilterSubmit] Réponse reçue:", data);
  
          if (data) {
            console.log("[onDeviceFilterSubmit] Succès côté serveur");
            setUserDevices(data);
          }
  
        } catch (error) {
          console.error("[onDeviceFilterSubmit] Erreur catché:", error);
        } finally {
          setIsLoading(false);
        }
      }
      filterDevices();
    }, [selectedDevices]);

  return (
    <div className={`absolute flex flex-col top-0 right-0 p-4 size-full 
      bg-gray-100 dark:bg-gray-800 
      overflow-y-auto 
      transition-colors duration-200
      ${isVisible ? "block" : "hidden"}`}>
      
      <div className="flex">
        <button 
          className="h-full w-10 mb-4 self-center text-gray-700 dark:text-gray-300 
            hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          onClick={toggleVisibility}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700 dark:border-gray-300" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex flex-col size-full">
        {devicesCategories && devicesCategories.length > 0 && devicesCategories.map((category) => (
          <AccordionItem 
            key={category._id}
            category={category.name}
            items={category.devices.map((device) => (
              <div key={device._id} className="cursor-pointer group">
                <label 
                  className={`block p-2 border-transparent border-l-4 
                    ${selectedDevices.includes(device.id) 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 border-indigo-600 dark:border-indigo-400' 
                      : 'group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:border-indigo-600 dark:group-hover:border-indigo-400'
                    }
                    text-gray-900 dark:text-gray-100
                    transition-colors duration-200`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedDevices.includes(device.id)} 
                    onChange={(e) => onCheckboxChange(device.id, e.target.checked)} 
                    className="hidden" 
                  />
                  {device.name}
                </label>
              </div>
            ))}
            headerStyle={"w-full h-10 flex flex-row bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-2 transition-colors duration-200"}
            headerOpenStyle={"rounded-t-sm"}
            headerClosedStyle={"rounded-sm"}
            blockStyle={"border-3 rounded-b-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"}
            headerImage={category.imagePath}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsFilter;