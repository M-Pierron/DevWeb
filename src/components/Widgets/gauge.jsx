import React, { useState } from 'react'

const gauge = ({data}) => {   
  const strokeValue = (data.value / data.max) * 75; 

  return (
    <div className="relative size-full">
      <svg
        className="rotate-[135deg] w-full h-full"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle (Gauge) */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-green-200 dark:text-neutral-700"
          strokeWidth="1"
          strokeDasharray="75 100"
          strokeLinecap="round"
        />

        {/* Gauge Progress */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-green-500 dark:text-green-500"
          strokeWidth="2"
          strokeDasharray={`${strokeValue} 100`} 
          strokeLinecap="round"
        />
      </svg>

      {/* Value Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-green-600 dark:text-green-500">
          {data.value}{data.unit}
        </span>
      </div>
    </div>
  )
}

export default gauge
