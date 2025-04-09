import React from 'react'

const wifi = () => {
  return (
    <div className='flex flex-col items-center justify-center size-full'>
      <div className="flex justify-evenly items-end w-[50%] h-full">
        <div className="w-full h-[25%] mr-2 bg-green-500 border-2 border-black"></div>
        <div className="w-full h-[50%] mr-2 bg-green-500 border-2 border-black"></div>
        <div className="w-full h-[75%] mr-2 bg-green-500 border-2 border-black"></div>
        <div className="w-full h-[100%] bg-gray-300 border-2 border-black"></div>
      </div>
    </div>

  )
}

export default wifi