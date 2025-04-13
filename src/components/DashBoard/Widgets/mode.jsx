import React, { useState } from 'react'
import { getMode } from '../../../utils';

import DropDownItem from "../../Dropdown/dropDownItem"
import Timer from "../../timer"

const options = [
    'AUTOMATIC',
    'MANUAL',
    // 'SCHEDULE'
]

const mode = ({mode}) => {
    const [isModeDropDownOpen, setIsModeDropDownOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState(mode);

    const [onHour, setOnHour] = useState(0);
    const [onMinute, setOnMinute] = useState(0);
    const [offHour, setOffHour] = useState(0);
    const [offMinute, setOffMinute] = useState(1);

    const isTimeGreater = (h1, m1, h2, m2) => {
        return h1 > h2 || (h1 === h2 && m1 >= m2);
    };

    const handleOnHourChange = (e) => {
        const value = Math.max(0, Math.min(23, Number(e.target.value)));
        if (!isTimeGreater(value, onMinute, offHour, offMinute)) {
        setOnHour(value);
        }
    };

    const handleOnMinuteChange = (e) => {
        const value = Math.max(0, Math.min(59, Number(e.target.value)));
        if (!isTimeGreater(onHour, value, offHour, offMinute)) {
        setOnMinute(value);
        }
    };

    const handleOffHourChange = (e) => {
        const value = Math.max(0, Math.min(23, Number(e.target.value)));
        if (!isTimeGreater(onHour, onMinute, value, offMinute)) {
        setOffHour(value);
        }
    };

    const handleOffMinuteChange = (e) => {
        const value = Math.max(0, Math.min(59, Number(e.target.value)));
        if (!isTimeGreater(onHour, onMinute, offHour, value)) {
        setOffMinute(value);
        }
    };

    const onModeClick = (option) => {
        setSelectedMode(option);
        setIsModeDropDownOpen(false);
    };

  return (
    <>        
        {/* Cadre pour le selecteur de mode */}
            {/* Selecteur de mode */}
            <div className='w-[50%] mr-4 h-full'>
                {/* Utilisé pour le positionnement des éléments de la liste déroulante */}
                <div className="relative h-full">
                    {/* Cadre du séléctionneur pour les modes */}
                    <div className="h-full bg-white flex border-2 border-black rounded items-center">
                        {/* Nom du mode */}
                        <span name="select" id="select" className="px-4 appearance-none outline-none text-gray-800 w-full">{getMode(mode)}</span>

                        {/* Cadre pour le button d'affichage de la liste déroulante des modes */}
                        <label 
                        className="flex flex-row cursor-pointer outline-none focus:outline-none border-l-2 border-black transition-all text-gray-300 hover:text-gray-600 h-full"
                        onClick={() => setIsModeDropDownOpen((prev) => !prev)}
                        >
                            {/* Dessin de la flèche */}
                            <svg className="w-4 h-4 mx-2 fill-current self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        </label>
                    </div>

                    {/* Liste déroulante des modes */}
                    {isModeDropDownOpen && <div className={`absolute rounded shadow bg-white overflow-hidden flex flex-col w-full mt-1 border border-gray-200 text-black`}>
                        {/* Mettre chaque options */}
                        {options.map((option) => (
                            <DropDownItem style={"block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100"} key={option} itemName={getMode(option)} onClick={() => onModeClick(option)}/>
                        ))}
                    </div>
                    }         
                </div>
            </div>
            
            {/* Si le mode est "programmé", alors affiché les horaires */}
            {selectedMode == "Programmé" && 
                <div className='flex flex-col w-[50%]'>
                    <span>Allumer après</span>
                    <Timer onHourChange={handleOnHourChange} onMinuteChange={handleOnMinuteChange} hour={onHour} minute={onMinute}/>
                    <span>Eteindre après</span>
                    <Timer onHourChange={handleOffHourChange} onMinuteChange={handleOffMinuteChange} hour={offHour} minute={offMinute}/>
                </div>
            }

            {/*  */}
            {selectedMode == "Manuel" &&
                <div className="flex w-[50%]">
                    <label for="toggle" class="relative flex flex-row items-center size-full rounded-full bg-gray-600 border-2 border-black">
                        <input type="checkbox" id="toggle" class="sr-only peer" />
                        <span class="peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 size-full transform bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-full peer-checked:bg-indigo-600"></span>
                        <span class="peer-checked:bg-indigo-600 size-full bg-gray-300 rounded-full"></span>
                    </label>
                </div>
            }
    </>
  )
}

export default mode