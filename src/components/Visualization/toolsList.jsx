import React, { useState, useEffect } from 'react'

import ToolsFilter from './toolsFilter';
import ToolsSearchBar from './toolsSearchBar';
import DeviceItem from "./deviceItem";

const toolsList = () => {
  const iotDevices = [
    [
      "Sécurité & Contrôle d'accès", "security",
      [
        ["Serrures connectées", "smart_locks"],
        ["Sonnette vidéo", "video_doorbell"],
        ["Caméras de sécurité", "security_cameras"],
        ["Capteurs de mouvement", "motion_sensors"],
        ["Alarmes connectées", "smart_alarms"]
      ]
    ],
    [
      "Éclairage & Énergie", "energy",
      [
        ["Ampoules connectées", "smart_bulbs"],
        ["Interrupteurs et variateurs connectés", "smart_switches"],
        ["Prises intelligentes", "smart_plugs"],
        ["Multiprises connectées", "smart_power_strips"]
      ]
    ],
    [
      "Climatisation & Confort", "comfort",
      [
        ["Thermostats intelligents", "smart_thermostats"],
        ["Ventilateurs de plafond connectés", "smart_ceiling_fans"],
        ["Purificateurs d'air connectés", "smart_air_purifiers"],
        ["Humidificateurs et déshumidificateurs intelligents", "smart_humidifiers"]
      ]
    ],
    [
      "Divertissement", "entertainment",
      [
        ["Téléviseurs intelligents", "smart_tvs"],
        ["Enceintes connectées", "smart_speakers"],
        ["Appareils de streaming", "streaming_devices"],
        ["Vidéoprojecteurs connectés", "smart_projectors"]
      ]
    ],
    [
      "Cuisine & Électroménager", "kitchen",
      [
        ["Réfrigérateurs intelligents", "smart_fridges"],
        ["Fours et plaques de cuisson connectés", "smart_ovens"],
        ["Cafetières connectées", "smart_coffee_machines"],
        ["Lave-vaisselle intelligents", "smart_dishwashers"]
      ]
    ],
    [
      "Entretien & Nettoyage", "cleaning",
      [
        ["Aspirateurs robots", "robot_vacuums"],
        ["Machines à laver et sèche-linge connectés", "smart_washers"],
        ["Systèmes d'arrosage intelligents", "smart_irrigation"]
      ]
    ]
  ];
  
  const [isToolsFilterVisible, setToolsFilterVisibility] = useState(false);

  const onToolFilterClick = () => {
    setToolsFilterVisibility(!isToolsFilterVisible);
  };

  return (
    <>
          <div className='relative bg-gray-400 rounded-xl p-4 w-[25%] h-full'>
            <ToolsFilter tools={iotDevices} isVisible={isToolsFilterVisible} toggleVisibility={onToolFilterClick}/>
            <div className='flex flex-col h-full'>
              <ToolsSearchBar onToolFilterClick={onToolFilterClick} />
              {/* Tools list */}
              <div className='h-full mt-4 bg-white text-black'>
                <DeviceItem deviceName={"Thermostat Salon"}/>
              </div>
            </div>
          </div>
    </>
  )
}

export default toolsList