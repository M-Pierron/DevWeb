import React from 'react'

const dashBoardFrame = () => {
  return (
    <>
        <div className='flex flex-col w-7/10'>
            <div className='flex flex-row bg-red-500 p-4 h-1/5'>
                <div className='bg-white w-full'>
                </div>
                <div className='bg-gray-100 w-full'>
                </div>
            </div>

            <div className='bg-green-500 h-full'></div>
        </div>
    </>
  )
}

export default dashBoardFrame