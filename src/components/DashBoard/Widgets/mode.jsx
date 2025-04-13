import React, { useState } from 'react';
import { getMode } from '../../../utils';
import { ChevronDown, Clock } from 'lucide-react';
import Timer from "../../timer";

const options = ['AUTOMATIC', 'MANUAL'];

const Mode = ({ mode }) => {
  const [isModeDropDownOpen, setIsModeDropDownOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(mode);
  const [isOn, setIsOn] = useState(false);

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
    <div className="flex w-full gap-4">
      <div className="w-1/2">
        <div className="relative">
          <button
            onClick={() => setIsModeDropDownOpen(!isModeDropDownOpen)}
            className="w-full h-full flex items-center justify-between px-4 py-2 
              bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              text-gray-900 dark:text-white
              rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700
              transition-colors duration-200"
          >
            <span className="font-medium">{getMode(selectedMode)}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 
                ${isModeDropDownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isModeDropDownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 
              rounded-lg shadow-lg overflow-hidden">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => onModeClick(option)}
                  className="w-full px-4 py-2 text-left 
                    text-gray-900 dark:text-white
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    border-l-4 border-transparent
                    hover:border-indigo-500 dark:hover:border-indigo-400
                    transition-colors duration-200"
                >
                  {getMode(option)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-1/2">
        {selectedMode === 'SCHEDULE' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Allumer après</span>
              </div>
              <Timer 
                onHourChange={handleOnHourChange} 
                onMinuteChange={handleOnMinuteChange} 
                hour={onHour} 
                minute={onMinute}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Éteindre après</span>
              </div>
              <Timer 
                onHourChange={handleOffHourChange} 
                onMinuteChange={handleOffMinuteChange} 
                hour={offHour} 
                minute={offMinute}
              />
            </div>
          </div>
        )}

        {selectedMode === 'MANUAL' && (
          <div className="flex items-center justify-center h-full">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isOn}
                onChange={() => setIsOn(!isOn)}
                className="sr-only peer" 
              />
              <div className="w-14 h-7 
                bg-gray-200 dark:bg-gray-700 
                peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 
                rounded-full peer 
                peer-checked:after:translate-x-full 
                peer-checked:after:border-white 
                after:content-[''] 
                after:absolute after:top-0.5 after:left-[2px] 
                after:bg-white 
                after:border-gray-300 
                after:border 
                after:rounded-full 
                after:h-6 after:w-6 
                after:transition-all
                peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500">
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mode;