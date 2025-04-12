import React from 'react'

const dropDownItem = ({style, itemName, onClick}) => {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
        <a className={style}>{itemName}</a>
    </div>
  )
}

export default dropDownItem