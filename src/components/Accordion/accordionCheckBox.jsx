import React from 'react'

const accordionCheckBox = ({label}) => {
  return (
    <div>
        <input className='mr-2 bg-white' type="checkbox" id={label} name="interest" value={label} />
        <label for={label}>{label}</label>
    </div>
  )
}

export default accordionCheckBox