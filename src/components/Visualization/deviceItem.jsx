import React from 'react'

const deviceItem = ({deviceName}) => {
  return (
    <div className='flex flex-row border-b-2 h-12 border-gray-400 hover:cursor-pointer font-bold'>
        <span className='ml-2 self-center'>{deviceName}</span>
    </div>
  )
}

export default deviceItem