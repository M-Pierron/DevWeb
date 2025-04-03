import React from 'react'

const accordionHeader = ({category, clickEvent, isOpen, image}) => {
  return (
    <button className={`w-full h-10 flex flex-row bg-gray-300 text-black p-2 ${isOpen ? "rounded-t-sm" : "rounded-sm"}`} onClick={clickEvent}>
        <img src={`/src/assets/${image}`} className='h-full mr-2'/>
        <div className='w-full h-full flex justify-between'>
          <span className='font-bold self-center'>{category}</span>
          {isOpen ? <span className='self-center'>-</span> : <span className='self-center'>+</span>}
        </div>
    </button>
  )
}

export default accordionHeader