import React from 'react'

const Visualization = () => {
  return (
    <>
        <div className='h-dvh flex justify-between m-5'>
          <div className='bg-gray-400 w-1/4'>

          </div>
          <div className='flex flex-col w-1/2'>
            <div className='flex flex-row bg-red-500 p-4 h-1/5'>
                <div className='bg-white w-full'>
                </div>
                <div className='bg-gray-100 w-full'>
                </div>
            </div>

            <div className='bg-green-500 h-full'></div>
          </div>
        </div>
    </>
  )
}

export default Visualization