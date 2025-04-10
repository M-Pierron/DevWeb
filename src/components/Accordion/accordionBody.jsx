import React from 'react'

import AccordionCheckBox from './accordionCheckBox'

const accordionBody = ({style, isOpen, items}) => {
  return (
    <div className={`${style} ${isOpen ? "block" : "hidden"}`}>
        {items}
    </div>
  )
}

export default accordionBody