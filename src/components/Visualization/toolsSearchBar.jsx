import { Funnel, Search } from 'lucide-react';
import React from 'react';
import { useDeviceContext } from "../../context/DeviceContext";

const ToolsSearchBar = ({onToolFilterClick, isFilterLoading}) => {
  const {
    searchTerm,
    setSearchTerm
  } = useDeviceContext();

  return (
    <div className="flex flex-row h-[5%] gap-2">
      <div className='flex flex-row size-full bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white 
        rounded-lg border border-gray-200 dark:border-gray-700
        transition-colors duration-200'>
        <Search className='ml-2 mr-2 h-[80%] self-center text-gray-500 dark:text-gray-400'/>
        <input 
          type='text' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[90%] outline-none bg-transparent 
            placeholder-gray-500 dark:placeholder-gray-400'
          placeholder="Search devices..."
        />
      </div>
      
      <button 
        className='w-10 h-10 flex items-center justify-center
          bg-gray-200 dark:bg-gray-700 
          text-gray-700 dark:text-gray-300
          hover:bg-gray-300 dark:hover:bg-gray-600
          rounded-lg border border-gray-200 dark:border-gray-600
          transition-colors duration-200'
        onClick={onToolFilterClick}
        disabled={isFilterLoading}
      >
        {isFilterLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
        ) : (
          <Funnel className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default ToolsSearchBar;