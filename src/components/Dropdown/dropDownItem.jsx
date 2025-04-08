import React from 'react'

const dropDownItem = ({className, itemName, onClick}) => {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
        <a className={className}>{itemName}</a>
    </div>
  )
}

export default dropDownItem