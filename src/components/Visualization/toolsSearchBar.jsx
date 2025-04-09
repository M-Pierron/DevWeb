import { Funnel, Search } from 'lucide-react';
import React, { useState } from 'react'

const toolsSearchBar = ({onToolFilterClick}) => {

  const [input, setInput] = useState("");

  const onInputChange = (value) => {
    setInput(value);
    
  }

  return (
    <div className="flex flex-row h-[5%] ">
        <div className='flex flex-row size-full bg-white text-black rounded-lg'>
          <Search className='ml-2 mr-2 h-[80%] self-center'/>
          <input type='search' className='w-[90%] outline-none'/>
        </div>
        <Funnel className="w-[10%] ml-2 h-full text-black bg-gray-500 rounded-lg p-1" onClick={onToolFilterClick}/>
    </div>
  )
}

export default toolsSearchBar