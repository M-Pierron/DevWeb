import React from 'react'
import Nav from "../components/nav"
import DevicesList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/DashBoard/frame"

const Visualization = () => {
  return (
    <>
        <Nav name="Visualisation"/>
        <div className='h-dvh flex justify-between m-5'>
          <DevicesList />
          <DashBoardFrame />
        </div>
    </>
  )
}

export default Visualization
