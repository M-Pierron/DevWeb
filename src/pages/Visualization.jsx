import React, { useState } from 'react'
import Nav from "../components/nav"
import DevicesList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/DashBoard/frame"

const Visualization = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <>
        <Nav name="Visualisation"/>
        <div className='h-dvh flex justify-between m-5'>
          <DevicesList 
            selectedDevice={selectedDevice} 
            setSelectedDevice={setSelectedDevice}
          />
          {selectedDevice && <DashBoardFrame selectedDevice={selectedDevice}/>}
        </div>
    </>
  )
}

export default Visualization
