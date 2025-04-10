import React, { useState } from 'react'

import AccordionItem from '../Accordion/accordionItem';
import Modal from "../modal"
import { iotDevices } from '../iotDevices';

const addDeviceModal = ({onCancelClick}) => {
  const [isTypeDropDownOpen, setIsTypeDropDownOpen] = useState(false)
  const [selectedDeviceType, setSelectedDeviceType] = useState(null)

  const [newObjet, setNewObjet] = useState({
    name: "",
    description: "",
    mode: "automatique",
    type: "",
    batterie: "0",
    wifi: "aucun"
  });

  const onNewObjectChange = (e) => {
    const { name, value } = e.target;
    console.log(`[handleChange] ${name}:`, value); // 📝 LOG
    setNewObjet({ ...newObjet, [name]: value });
  }

  const onNewObjectSubmit = async (e) => {
    e.preventDefault();
    console.log("[onNewObjectSubmit] Formulaire soumis !");

    try {
      console.log(`[handleSubmit] Envoi requête vers: http://localhost:5000/api/devices/newObject`);
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/devices/newObject", {
        method: "POST",
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newObjet.name,
          description: newObjet.description,
          mode: newObjet.mode,
          type: newObjet.type,
          battery: newObjet.batterie,
          wifi: newObjet.wifi
        }),
      });

    } catch (error) {
      console.error("[onNewObjectSubmit] Erreur catché:", error);
    }
  }

  return (
      <Modal children={        
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-black max-h-[90vh] overflow-y-auto">
          <form onSubmit={onNewObjectSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l'objet</label>
              <input id="name" name="name" value={newObjet.name} onChange={onNewObjectChange} className="border p-2 rounded w-full text-black"/>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <input id="description" name="description" value={newObjet.description} onChange={onNewObjectChange} className="border p-2 rounded w-full text-black" />
            </div>
            
            <div>
              <label htmlFor="mode" className="block text-sm font-medium mb-1">Mode</label>
              <select id="mode" name="mode" value={newObjet.status} onChange={onNewObjectChange} className="border p-2 rounded w-full text-black">
                <option value="automatique">Automatique</option>
                <option value="manuel">Manuel</option>
                <option value="programme">Programmé</option>
              </select>
            </div>
            
            <div className="relative">
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <div className="h-full bg-white flex border p-2 border-black rounded items-center" onClick={() => setIsTypeDropDownOpen((prev) => !prev)}>
                  {/* Nom du type d'appareil */}
                  <span className="appearance-none outline-none text-black w-full select-none">
                    {selectedDeviceType === null
                      ? "Selectioner un type d'appareil"
                      : selectedDeviceType}
                  </span>

                  {/* Cadre pour le button d'affichage de la liste déroulante */}
                  <label 
                    className="flex flex-row cursor-pointer outline-none focus:outline-none border-black transition-all text-gray-300 hover:text-gray-600 h-full"
                  >
                      {/* Dessin de la flèche */}
                      <svg className="w-4 h-4 mx-2 fill-current self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                  </label>
              </div>
              
              {/* Afficher la liste déroulante des types d'appareil */}
              { isTypeDropDownOpen && 
                <div className="mt-2 absolute flex flex-col bg-white w-full border border-black rounded overflow-y-auto max-h-50">
                  {iotDevices.map(([categoryName, categoryId, devices]) => (
                    <AccordionItem 
                      key={categoryId} 
                      category={categoryName} 
                      items={devices.map(([deviceName, deviceID]) => (
                        <div key={deviceID} className="cursor-pointer group" onClick={() => setSelectedDeviceType(deviceName)}>
                          <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">{deviceName}</a>
                        </div>
                      ))}
                      headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
                    />
                  ))}
                </div> }
            </div>
            
            <div>
              <label htmlFor="batterie" className="block text-sm font-medium mb-1">Batterie (%)</label>
              <input min="0" max="100" id="batterie" name="batterie" type="number" value={newObjet.batterie} onChange={onNewObjectChange} className="border p-2 rounded w-full text-black" required />
            </div>
            
            <div>
              <label htmlFor="wifi" className="block text-sm font-medium mb-1">Signal Connexion Wi-Fi</label>
              <select id="wifi" name="wifi" value={newObjet.wifi} onChange={onNewObjectChange} className="border p-2 rounded w-full text-black">
                <option value="aucun">Aucun</option>
                <option value="faible">Faible</option>
                <option value="moyen">Moyen</option>
                <option value="fort">Fort</option>
              </select>
            </div>

            {/* Cadre pour les buttons */}
            <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={onCancelClick} className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2  bg-indigo-700 border-indigo-700 text-white rounded hover:bg-indigo-800">
                  Ajouter
                </button>
            </div>
          </form>

        </div>
      }/>
  )
}

export default addDeviceModal