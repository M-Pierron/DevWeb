import React from 'react'

import Header from "./header"
import Temperature from "./temperature"
import Battery from "./battery"
import Wifi from "./wifi"

const frame = () => {
  return (
    <div className='flex flex-col w-[70%]'>
        <Header/>
        <div className='bg-gray-500 border-2 border-black h-full rounded-lg'>
        <div className='flex flex-row h-full w-full'>
            <div id="mainFrame" className='p-4 w-full h-full'>
            <Temperature/>
            </div>
            <div id="sideFrame" className='flex flex-col w-full'>
            <div className='mt-4 mr-4 flex items-center gap-2 p-4 border-2 border-black rounded-xl shadow-lg w-full h-[30%]'>
                <Battery percentage={65}/>  
            </div>
            <div className='mt-4 mr-4 flex items-center gap-2 p-4 border-2 border-black rounded-xl shadow-lg w-full h-[30%]'>
                <Wifi/>  
            </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default frame