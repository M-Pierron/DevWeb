import React from 'react'
import ToolsList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/Visualization/dashBoardFrame"
import "../App.css"
import Nav from "../components/nav.jsx";

function Visualization() {
  return (
    <>
      <Nav name={"Visualisation"}/>
        <div className='h-dvh flex justify-between m-5'>
          <ToolsList />
          <DashBoardFrame />
        </div>
    </>
  )
}

export default Visualization
