import React from 'react'

const modal = ({children}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        {children}
    </div>
  )
}

export default modal