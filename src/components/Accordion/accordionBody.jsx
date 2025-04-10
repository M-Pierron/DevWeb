import React from 'react'

const accordionBody = ({style, isOpen, items}) => {
  return (
    <div className={`${style} ${isOpen ? "block" : "hidden"}`}>
        {items}
    </div>
  )
}

export default accordionBody