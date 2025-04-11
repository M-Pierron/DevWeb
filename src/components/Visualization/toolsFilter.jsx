import React, { useState, useEffect, useRef } from "react";

import AccordionItem from "../Accordion/accordionItem";

// Component qui représente la fênetre de filtrage
// devicesCategories : Tous les appareils disponible dans la BDD
// isVisible: Si la fênetre est visible
// toggleVisibility : Etat qui determine si la fênetre est visible ou non
const toolsFilter = ({devicesCategories, isVisible, toggleVisibility}) => {
  return (
    <>
      {/* Cadre qui contient le design de la fênetre de filtrage */}
      <div className={`absolute flex flex-col top-0 right-0 p-4 size-full bg-gray-500 overflow-y-auto ${isVisible ? "block" : "hidden"}`}>
        {/* Button pour éteindre la fênetre de filtre */}
        <input type="image" src="/src/assets/backArrow.svg" className="h-[5%] w-full mb-4" onClick={toggleVisibility}/>
        
        {/*  */}
        <div className="flex flex-col">
          {devicesCategories && devicesCategories.length > 0 && devicesCategories.map((category) => (
            <AccordionItem 
              key={category._id}
              category={category.name}
              // Les appareils lié à cette catégorie
              items={category.devices.map((device) => (
                <div key={device._id}>
                  <input className='mr-2 bg-white' type="checkbox" name={device.name} value={device.name} />
                  <label htmlFor={device.name}>{device.name}</label>
                </div>
              ))}
              headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
              headerOpenStyle={"rounded-t-sm"}
              headerClosedStyle={"rounded-sm"}
              blockStyle={"border-3 rounded-b-sm border-gray-300 bg-white p-2 text-black"}
              headerImage={category.imagePath}
            />
          ))}
        </div>

        {/* Button pour valider le filtrage */}
        <button className="bg-blue-700 border-2 border-black w-full self-end mt-auto shadow-lg rounded-lg py-2 cursor-pointer">APPLIQUER</button>
      </div>
    </>
  )
}

export default toolsFilter