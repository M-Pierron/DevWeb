import React from 'react'

const accordionHeader = ({style, openStyle, closedStyle, category, clickEvent, isOpen, image}) => {
  return (
    <button className={`${style} ${isOpen ? openStyle : closedStyle}`} onClick={clickEvent}>
        {image != null && <img src={image} className='h-full mr-2'/>}
        <div className='w-full h-full flex justify-between'>
          <span className='font-bold self-center'>{category}</span>
          {isOpen ? <span className='self-center'>-</span> : <span className='self-center'>+</span>}
        </div>
    </button>
  )
}

export default accordionHeader