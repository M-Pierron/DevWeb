import React, { useState, useEffect, useRef } from "react";

import AccordionItem from "../Accordion/accordionItem";

const toolsFilter = ({tools, isVisible, toggleVisibility}) => {

  return (
    <>
      <div className={`absolute top-0 right-0 p-4 h-full w-full bg-gray-500 overflow-y-auto ${isVisible ? "block" : "hidden"}`}>
        <input type="image" src="/src/assets/backArrow.svg" className="h-[5%] w-full mb-4" onClick={toggleVisibility}/>
        {tools.map(([categoryName, categoryId, devices]) => (
          <AccordionItem key={categoryId} category={categoryName} items={devices} headerImage={`toolsFilter/${categoryId}.svg`}/>
        ))}
        <button className="bg-blue-700 w-full">APPLIQUER</button>
      </div>
    </>
  )
}

export default toolsFilter