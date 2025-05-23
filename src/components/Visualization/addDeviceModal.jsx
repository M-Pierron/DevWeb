  import React, { useState } from 'react'

  import AccordionItem from '../Accordion/accordionItem';
  import Modal from "../modal"

  import { useDeviceContext } from "../../context/DeviceContext";
  
  //--  Modale qui permet de rajouter un appareil pour l'utilisateur --
  const addDeviceModal = () => {
    const {
      deviceCategories,
      setIsAddNewDeviceVisible,
      onAddDeviceSubmit,
      isAddNewDeviceLoading
    } = useDeviceContext();

    // -- La liste déroulante des types d'appareils --
    const [isDeviceTypesDropDownOpen, setIsDeviceTypesDropDownOpen] = useState(false)
    const [selectedDeviceType, setSelectedDeviceType] = useState(null)

    const [newDevice, setNewDevice] = useState({
      name: "",
      description: "",
      mode: "AUTOMATIC",
      deviceId: "",
      battery: "0",
      wifi: "NONE"
    });


    const onNewDeviceChange = (e) => {
      const { name, value } = e.target;
      console.log(`[onNewDeviceChange] ${name}:`, value); 
      setNewDevice({ ...newDevice, [name]: value });
    }

    return (
        <Modal children={        
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            
            <form onSubmit={(e) => onAddDeviceSubmit(e, newDevice, selectedDeviceType)} className="flex flex-col gap-4">
              {/* Saisie pour le nom de l'appareil */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l'objet</label>
                <input id="name" name="name" value={newDevice.name} onChange={onNewDeviceChange} 
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"/>
              </div>
              
              {/* Saisie pour la description de l'appareil */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <input id="description" name="description" value={newDevice.description} onChange={onNewDeviceChange} 
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" />
              </div>
              
              {/* Saisie pour le mode de l'appareil */}
              <div>
                <label htmlFor="mode" className="block text-sm font-medium mb-1">Mode</label>
                <select id="mode" name="mode" value={newDevice.mode} onChange={onNewDeviceChange} 
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">
                  <option value="AUTOMATIC">Automatique</option>
                  <option value="MANUAL">Manuel</option>
                  {/* <option value="SCHEDULE">Programmé</option> */}
                </select>
              </div>
              
              {/* Saisie pour selection de type d'appareil */}
              <div className="relative">
                <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                <div className="h-full bg-white dark:bg-gray-700 flex border p-2 dark:border-gray-600 rounded items-center" onClick={() => setIsDeviceTypesDropDownOpen((prev) => !prev)}>
                    {/* Nom du type d'appareil */}
                    <span className="appearance-none outline-none w-full select-none">
                      {selectedDeviceType === null
                        ? "Selectioner un type d'appareil"
                        : selectedDeviceType.name}
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
                { isDeviceTypesDropDownOpen && 
                  <div className="mt-2 p-2 absolute flex flex-col bg-white dark:bg-gray-700 w-full border border-black rounded overflow-y-auto max-h-50">
                    {deviceCategories && deviceCategories.length > 0 && deviceCategories.map((category) => (
                      // Afficher chaque catégorie d'appareil
                      category.devices && category.devices.length > 0 && 
                      <AccordionItem 
                        key={category._id}
                        category={category.name}
                        // Afficher les appareils lié à cette catégorie
                        items={category.devices.map((device) => (
                          <div key={device._id} className="cursor-pointer group" 
                            onClick={(e) => {
                              setSelectedDeviceType(device);
                              setIsDeviceTypesDropDownOpen(false);
                            }} 
                          >
                           <a
                              className={`block p-2 border-transparent border-l-4
                                group-hover:bg-gray-100 dark:group-hover:bg-gray-700 group-hover:border-indigo-600 dark:group-hover:border-indigo-400
                                text-gray-900 dark:text-gray-100
                                transition-colors duration-200`}
                            >
                              {device.name}
                            </a>
                          </div>
                        ))}
                        headerStyle={"w-full h-10 flex flex-row bg-gray-300 text-black p-2"}
                      />
                    ))}
                  </div> }
              </div>
              
              {/* Saisie pour la batterie */}
              <div>
                <label htmlFor="battery" className="block text-sm font-medium mb-1">Batterie (%)</label>
                <input min="0" max="100" id="battery" name="battery" type="number" value={newDevice.battery} onChange={onNewDeviceChange} 
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              
              {/* Saisie pour la WIFI */}
              <div>
                <label htmlFor="wifi" className="block text-sm font-medium mb-1">Signal Connexion Wi-Fi</label>
                <select id="wifi" name="wifi" value={newDevice.wifi} onChange={onNewDeviceChange} 
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">
                  <option value="NONE">Aucun</option>
                  <option value="WEAK">Faible</option>
                  <option value="MODERATE">Moyen</option>
                  <option value="STRONG">Fort</option>
                </select>
              </div>

              {/* Cadre pour les buttons */}
              <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setIsAddNewDeviceVisible(false)} className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400 cursor-pointer">
                    <span>Annuler</span>
                  </button>
                  <div className='flex flex-row px-4 py-2 justify-center bg-indigo-700 border-indigo-700 text-white rounded hover:bg-indigo-800 cursor-pointer'>
                    {!isAddNewDeviceLoading ? (
                      <button type="submit" className="cursor-pointer">
                        <span>Ajouter</span>
                      </button>) : (
                        <img src="/src/assets/loading/90-ring.svg"/>
                    )}
                  </div>

              </div>
            </form>

          </div>
        }/>
    )
  }

  export default addDeviceModal
