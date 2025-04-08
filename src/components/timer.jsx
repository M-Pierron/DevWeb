import React from 'react'

const timer = ({onHourChange, onMinuteChange, hour, minute}) => {
  return (
    <div className='flex flex-row size-full  text-black'>
        <input
            type="number"
            min="0"
            max="23"
            value={hour}
            onChange={onHourChange}
            className='w-[20%] bg-white text-center rounded-md shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <span>:</span>
        <input
            type="number"
            min="0"
            max="59"
            value={minute}
            onChange={onMinuteChange}
            className='w-[20%] bg-white text-center rounded-md shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
    </div>
  )
}

export default timer