import React, { useState, useEffect, useRef } from "react";

import AccordionItem from "../Accordion/accordionItem";

const toolsFilter = ({tools, isVisible, toggleVisibility}) => {

  return (
    <>
      <div className={`absolute top-0 right-0 p-4 h-full w-full bg-gray-500 overflow-y-auto ${isVisible ? "block" : "hidden"}`}>
        <input type="image" src="/src/assets/backArrow.svg" className="h-[5%] w-full mb-4" onClick={toggleVisibility}/>
          {tools.map(([categoryName, categoryId, devices]) => (
            <AccordionItem 
              key={categoryId} 
              category={categoryName} 
              // Checkbox pour chaque appareils
              items={devices.map(([itemName, itemID]) => (
                <div>
                  <input className='mr-2 bg-white' type="checkbox" name="interest" value={itemName} />
                  <label htmlFor={itemName}>{itemName}</label>
                </div>
              ))} 
              headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
              headerOpenStyle={"rounded-t-sm"}
              headerClosedStyle={"rounded-sm"}
              blockStyle={"border-3 rounded-b-sm border-gray-300 bg-white p-2 text-black"}
              headerImage={`toolsFilter/${categoryId}.svg`}
            />
          ))}
        <button className="bg-blue-700 w-full">APPLIQUER</button>
      </div>
    </>
  )
}

export default toolsFilter