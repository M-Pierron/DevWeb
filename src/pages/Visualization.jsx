import React, { useEffect, useState } from 'react'
import Nav from "../components/nav"
import DevicesList from "../components/Visualization/toolsList"
import DashBoardFrame from "../components/Visualization/Dashboard/frame"
import Modal from "../components/modal"
import AddDeviceModal from "../components/Visualization/addDeviceModal"

import { useDeviceContext } from "../context/DeviceContext";

const Visualization = () => {
  const {
    selectedDevice,
    isDeleteConfirmVisible,
    setIsDeleteConfirmVisible,
    isAddNewDeviceVisible,
    deleteSelectedDevice
  } = useDeviceContext();
  
  return (
    <>
        <Nav name="Visualisation"/>
        <div className='h-dvh flex justify-between m-5'>
          <DevicesList 
          />
          {selectedDevice && <DashBoardFrame/>}

          {/*  */}
          {isDeleteConfirmVisible && <Modal children={
            <div>
              <div className="flex flex-col bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-black max-h-[90vh] overflow-y-auto">
                <span className='mb-4'>Etes-vous sûre de vouloir supprimer cette appareil ?</span>
                <div className='flex flex-row self-end gap-2 *:p-2 *:rounded-lg *:text-white *:font-bold *:cursor-pointer'>
                  <button 
                    className='bg-gray-400'
                    onClick={() => setIsDeleteConfirmVisible(false)}
                  >
                    Annuler
                  </button>
                  <button 
                    className='bg-red-500'
                    onClick={() => {
                      deleteSelectedDevice();
                      setIsDeleteConfirmVisible(false);
                    }}
                  >
                    Confimer
                  </button>
                </div>
              </div>
            </div>
           }/>}

          {isAddNewDeviceVisible && <AddDeviceModal/>}
        </div>
    </>
  )
}

export default Visualization
