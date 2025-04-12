import { Funnel, Search } from 'lucide-react';
import React, { useState } from 'react'

// Component qui représente la barre de recherche pour les appareils
const toolsSearchBar = ({onToolFilterClick, isFilterLoading}) => {
  return (
    // Cadre pour la barre de recherche
    <div className="flex flex-row h-[5%] ">
        {/* Cadre qui contient la barre de recherche et son icone */}
        <div className='flex flex-row size-full bg-white text-black rounded-lg border-1 border-black'>
          <Search className='ml-2 mr-2 h-[80%] self-center'/>
          <input type='search' className='w-[90%] outline-none'/>
        </div>
        {/* Button pour le filtrage */}
        <div className='w-[10%] ml-2 h-full'>
          {!isFilterLoading ? (
            <Funnel className="size-full text-black bg-gray-500 rounded-lg p-1 border-1 border-black cursor-pointer" onClick={onToolFilterClick}/>
          ) : (
            <img src="/src/assets/loading/90-ring.svg" className='self-center'/>
          )}
        </div>
        
    </div>
  )
}

export default toolsSearchBar