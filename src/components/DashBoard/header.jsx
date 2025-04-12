import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row h-[8%] mb-4 text-black'>
        <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
            <span className='self-center'>Thermo123</span>
        </div>
        <div className='bg-transparent w-full'></div>
        <div className='flex flex-row p-4 rounded-lg bg-white border-2 border-black h-full w-fit font-bold'>
            <span className='self-center'>Dernière interaction : Aujourd'hui, 10:00 AM</span>
        </div>
    </div>
  )
}

export default Header