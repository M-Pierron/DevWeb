import React from 'react'

import Nav from "../components/nav"
import ToolsList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/DashBoard/frame"

const Visualization = () => {
  return (
    <>
        <Nav/>
        <div className='h-dvh flex justify-between m-5'>
          <ToolsList />
          <DashBoardFrame />
        </div>
    </>
  )
}

export default Visualization