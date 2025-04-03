import React from 'react'

import AccordionCheckBox from './accordionCheckBox'

const accordionBody = ({isOpen, items}) => {
  return (
    <div className={`border-3 rounded-b-sm border-gray-300 bg-white p-2 text-black ${isOpen ? "block" : "hidden"}`}>
        {items.map(([itemName, itemID]) => (
            <AccordionCheckBox key={itemID} label={itemName}/>
        ))}
    </div>
  )
}

export default accordionBody