import React, { useState, useEffect, useRef } from "react";

import AccordionItem from "../Accordion/accordionItem";

const toolsFilter = ({devicesCategories, isVisible, toggleVisibility}) => {
  return (
    <>
      <div className={`absolute top-0 right-0 p-4 h-full w-full bg-gray-500 overflow-y-auto ${isVisible ? "block" : "hidden"}`}>
        <input type="image" src="/src/assets/backArrow.svg" className="h-[5%] w-full mb-4" onClick={toggleVisibility}/>
          {devicesCategories && devicesCategories.length > 0 && devicesCategories.map((category) => (
            <AccordionItem 
              key={category._id}
              category={category.name}
              items={category.devices.map((device) => (
                <div key={device._id}>
                  <input className='mr-2 bg-white' type="checkbox" name="interest" value={device.name} />
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
          {/* {tools.map(([categoryName, categoryId, devices]) => (
            <AccordionItem 
              key={categoryId} 
              category={categoryName} 
              // Checkbox pour chaque appareils
              items={devices.map(([deviceName, deviceID]) => (
                <div key={deviceID}>
                  <input className='mr-2 bg-white' type="checkbox" name="interest" value={deviceName} />
                  <label htmlFor={deviceName}>{deviceName}</label>
                </div>
              ))} 
              headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
              headerOpenStyle={"rounded-t-sm"}
              headerClosedStyle={"rounded-sm"}
              blockStyle={"border-3 rounded-b-sm border-gray-300 bg-white p-2 text-black"}
              headerImage={`toolsFilter/${categoryId}.svg`}
            />
          ))} */}
        <button className="bg-blue-700 w-full">APPLIQUER</button>
      </div>
    </>
  )
}

export default toolsFilter