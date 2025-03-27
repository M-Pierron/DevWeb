import React from 'react'

const toolsList = () => {
  return (
    <>
          <div className='flex flex-col bg-gray-400 w-1/5'>
            <input type='search' className='w-full bg-white text-black'></input>
            <div className='flex flex-row'>
              <div class="w-16 h-16 rounded-full bg-white"></div>
              <div class="w-16 h-16 rounded-full bg-white"></div>
              <div class="w-16 h-16 rounded-full bg-white"></div>
              <div class="w-16 h-16 rounded-full bg-white"></div>
              <div class="w-16 h-16 rounded-full bg-white"></div>
            </div>
          </div>
    </>
  )
}

export default toolsList