import React from 'react'

import ToolsList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/Visualization/dashBoardFrame"

const Visualization = () => {
  return (
    <>
        <div className='h-dvh flex justify-between m-5'>
          <ToolsList />
          <DashBoardFrame />
        </div>
    </>
  )
}

export default Visualization