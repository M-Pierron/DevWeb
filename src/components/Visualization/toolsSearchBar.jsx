import React, { useState } from 'react'

const toolsSearchBar = ({onToolFilterClick}) => {

  const [input, setInput] = useState("");

  const onInputChange = (value) => {
    setInput(value);
    
  }

  return (
    <div className="flex flex-row h-[5%] ">
        <div className='flex flex-row size-full bg-white text-black rounded-lg'>
          <img src='/src/assets/magnifyingGlass.svg' className='ml-2 mr-2 h-[50%] self-center' />
          <input type='search' className='w-[90%] outline-none'/>
        </div>
        <input type="image"  src="/src/assets/filter.svg" className="w-[10%] ml-2 h-full" onClick={onToolFilterClick}/>
    </div>
  )
}

export default toolsSearchBar