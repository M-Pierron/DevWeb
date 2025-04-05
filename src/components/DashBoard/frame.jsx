import React, { useState } from 'react'

import Header from "./header"
import Temperature from "./temperature"
import Battery from "./battery"
import Wifi from "./wifi"

import DropDownItem from "../Dropdown/dropDownItem"

const options = ["Automatique", "Manuel", "Programmé", "Économique"]

const frame = () => {
  const [isModeDropDownOpen, setIsModeDropDownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Automatique");

  const onModeClick = (option) => {
    setSelectedMode(option);
    setIsModeDropDownOpen(false);
  };

  return (
    <div className='flex flex-col w-[70%]'>
        <Header/>
        <div className='bg-gray-500 border-2 border-black h-full rounded-xl shadow-lg'>
        <div className='flex flex-row size-full'>
            
            <div id="mainFrame" className='p-4 size-full'>
              <Temperature/>
            </div>

            <div id="sideFrame" className='flex flex-col pr-4 h-full w-full'>
              <div className='flex flex-row m-4 ml-0 h-[20%] w-full'>
                <div className='flex mr-2 items-center gap-2 p-4 border-2 border-black rounded-xl shadow-lg size-full'>
                    <Battery percentage={65}/>  
                </div>
                <div className='flex items-center gap-2 p-4 border-2 border-black rounded-xl shadow-lg size-full'>
                    <Wifi/>  
                </div>
              </div>
                {/* Problème avec le rounded qui sort du cadre */}
                <div className='flex flex-col items-center w-full h-[20%]'>
                  {/* En-tête */}
                  <div className='bg-gray-400 self-start w-full text-center rounded-t-xl border-2 border-black'>
                    Mode
                  </div>
                  
                  {/* Cadre pour le selecteur de mode */}
                  <div className='flex flex-row size-full p-4 border-2 border-t-0 border-black size-full rounded-b-xl shadow-lg'>
                    {/* Selecteur de mode */}
                    <div className='w-[50%] mr-4 h-full'>
                      {/* Utilisé pour les dropdown items */}
                      <div className="relative h-full">
                        <div className="h-full bg-white flex border border-gray-200 rounded items-center">
                          {/* Nom du mode */}
                          <span name="select" id="select" className="px-4 appearance-none outline-none text-gray-800 w-full">{selectedMode}</span>

                          {/* Cadre pour le button */}
                          <label 
                            className="flex flex-row cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600 h-full"
                            onClick={() => setIsModeDropDownOpen((prev) => !prev)}
                          >
                            <svg className="w-4 h-4 mx-2 fill-current self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </label>
                        </div>

                        {/* Dropdown Items */}
                        {isModeDropDownOpen && <div className={`absolute rounded shadow bg-white overflow-hidden flex flex-col w-full mt-1 border border-gray-200 text-black`}>
                          {options.map((option) => (
                            <DropDownItem key={option} itemName={option} onClick={() => onModeClick(option)}/>
                          ))}
                        </div>
                        }         
                      </div>
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <span>Allumer après</span>
                        <span>13:00</span>
                        <span>Eteindre après</span>
                        <div className='flex flex-row size-full  text-black'>
                          <input type="number" max="23" className='w-[20%] bg-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'></input>
                          <span className='ml-2 mr-2'>:</span>
                          <input type="number" max="59" className='w-[20%] bg-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'></input>
                        </div>
                    </div>
                  </div>

                </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default frame