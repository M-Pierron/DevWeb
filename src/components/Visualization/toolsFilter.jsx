import React, { useState, useEffect, useRef } from "react";

import AccordionItem from "../Accordion/accordionItem";

const toolsFilter = ({devicesCategories, isVisible, toggleVisibility, setUserDevices}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedDevices, setSelectedDevices] = useState([]);

    // Handle checkbox change
    const onCheckboxChange = async (deviceId, isChecked) => {
      setSelectedDevices((prevSelectedDevices) => {
        // If checked, add the device name to the array
        if (isChecked) {
          return [...prevSelectedDevices, deviceId];
        } else {
          return prevSelectedDevices.filter((name) => name !== deviceId);
        }
      });
    };

    useEffect(() => {
      async function filterDevices (){
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
  
          if (data){
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
    }, [selectedDevices])

  return (
    <>
      {/* Cadre qui contient le design de la fênetre de filtrage */}
      <div className={`absolute flex flex-col top-0 right-0 p-4 size-full bg-gray-500 overflow-y-auto ${isVisible ? "block" : "hidden"}`}>
        {/* Button pour éteindre la fênetre de filtre */}
        <div className="flex">
          <input 
            type="image" 
            src={isLoading ? "/src/assets/loading/90-ring.svg" : "/src/assets/backArrow.svg"} 
            className="h-full w-10 mb-4 self-center" 
            onClick={toggleVisibility}
          />
        </div>
        
          {/*  */}
          <div className="flex flex-col size-full">
            {devicesCategories && devicesCategories.length > 0 && devicesCategories.map((category) => (
              <AccordionItem 
                key={category._id}
                category={category.name}
                items={category.devices.map((device) => (
                  <div key={device._id} className="cursor-pointer group">
                    <label 
                      className={`block p-2 border-transparent border-l-4 ${selectedDevices.includes(device.id) ? 'bg-blue-100 border-blue-600' : 'group-hover:bg-gray-100 group-hover:border-blue-600'}`}
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
                headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
                headerOpenStyle={"rounded-t-sm"}
                headerClosedStyle={"rounded-sm"}
                blockStyle={"border-3 rounded-b-sm border-gray-300 bg-white text-black"}
                headerImage={category.imagePath}
              />
            ))}
          </div>

      </div>
    </>
  )
}

export default toolsFilter
