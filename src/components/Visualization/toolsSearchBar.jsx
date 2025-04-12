import React from 'react'

const toolsSearchBar = ({onToolFilterClick}) => {

  return (
    <div className="flex flex-row h-[5%]">
        <input type='search' className='w-[90%] bg-white text-black rounded-xl'/>
        <input type="image"  src="/src/assets/filter.svg" className="w-[10%] h-full" onClick={onToolFilterClick}/>
    </div>
  )
}

export default toolsSearchBar