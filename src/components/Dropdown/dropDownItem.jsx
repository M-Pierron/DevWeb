import React from 'react'

const dropDownItem = ({itemName, onClick}) => {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
        <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">{itemName}</a>
    </div>
  )
}

export default dropDownItem