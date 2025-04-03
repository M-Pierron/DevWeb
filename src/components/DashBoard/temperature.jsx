import React from 'react'

const temperature = () => {
  return (
    <div className='rounded-lg border-2 border-black w-full h-full'>
        {/* <!-- Gauge Component --> */}
        <div class="relative size-full">
            <svg class="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* <!-- Background Circle (Gauge) --> */}
                <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="75 100" stroke-linecap="round"></circle>

                {/* <!-- Gauge Progress --> */}
                <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-500 dark:text-green-500" stroke-width="2" stroke-dasharray="56.25 100" stroke-linecap="round"></circle>
            </svg>

            {/* <!-- Value Text --> */}
            <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span class="text-fit font-bold text-green-600 dark:text-green-500">19.0°C</span>
            </div>
        </div>
        {/* <!-- End Gauge Component --> */}
    </div>
  )
}

export default temperature