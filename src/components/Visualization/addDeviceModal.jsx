import React, { useState } from 'react'

import AccordionItem from '../Accordion/accordionItem';
import Modal from "../modal"
import { iotDevices } from '../iotDevices';

const addDeviceModal = ({onCancelClick}) => {
  const [newObjet, setNewObjet] = useState({
    name: "",
    description: "",
    mode: "actif",
    type: "",
    batterie: "",
    wifi: "fort"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObjet({ ...newObjet, [name]: value });
  }

  return (
      <Modal children={        
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-black max-h-[90vh] overflow-y-auto">
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l’objet</label>
              <input id="name" name="name" value={newObjet.name} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <input id="description" name="description" value={newObjet.description} onChange={handleChange} className="border p-2 rounded w-full text-black" />
            </div>
            
            <div>
              <label htmlFor="mode" className="block text-sm font-medium mb-1">Statut</label>
              <select id="mode" name="mode" value={newObjet.status} onChange={handleChange} className="border p-2 rounded w-full text-black">
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>
            
            <div className="relative">
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <select id="type" name="type" value={newObjet.type} onChange={handleChange} className="border p-2 rounded w-full text-black" required>
              </select>
              <div className="absolute flex flex-col bg-white w-full border border-gray-200">
                {iotDevices.map(([categoryName, categoryId, devices]) => (
                  <AccordionItem key={categoryId} category={categoryName} items={devices}/>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="batterie" className="block text-sm font-medium mb-1">Batterie (%)</label>
              <input id="batterie" name="batterie" type="number" value={newObjet.batterie} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
            </div>
            
            <div>
              <label htmlFor="wifi" className="block text-sm font-medium mb-1">Signal Connexion Wi-Fi</label>
              <select id="wifi" name="wifi" value={newObjet.wifi} onChange={handleChange} className="border p-2 rounded w-full text-black">
                <option value="Aucun">Aucun</option>
                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Fort">Fort</option>
              </select>
            </div>
          </form>
      
          <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={onCancelClick} className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400">
                Annuler
              </button>
              <button type="submit" className="px-4 py-2 text-indigo-700 bg-indigo-700 border-indigo-700 text-white rounded hover:bg-indigo-800">
                Ajouter
              </button>
          </div>
        </div>
      }/>
  )
}

export default addDeviceModal