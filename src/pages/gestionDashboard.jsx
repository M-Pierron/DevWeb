import React, { useState } from "react";
import Battery from "../components/DashBoard/battery";
import Wifi from "../components/DashBoard/wifi";
import Temperature from "../components/DashBoard/temperature";

const GestionDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [configMode, setConfigMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [objets, setObjets] = useState([
    {
      id: 1,
      name: "Thermostat Salon",
      description: "Thermostat du salon pour réguler la température.",
      status: "actif",
      zone: "Salon",
      batterie: 67,
      temperature: 21,
      wifi: "fort"
    },
    {
      id: 2,
      name: "Caméra Entrée",
      description: "Caméra de sécurité à l'entrée principale.",
      status: "inactif",
      zone: "Entrée",
      batterie: 42,
      temperature: null,
      wifi: "moyen"
    }
  ]);

  const [newObjet, setNewObjet] = useState({
    name: "",
    description: "",
    status: "actif",
    zone: "",
    temperature: "",
    batterie: "",
    wifi: "fort"
  });

  const handleAjouterObjet = () => {
    setEditMode(false);
    setConfigMode(false);
    setShowModal(true);
  };

  const handleModifier = (objet) => {
    setEditMode(true);
    setConfigMode(false);
    setEditingId(objet.id);
    setNewObjet({
      name: objet.name,
      description: objet.description || "",
      status: objet.status,
      zone: objet.zone,
      temperature: objet.temperature || "",
      batterie: objet.batterie,
      wifi: objet.wifi
    });
    setShowModal(true);
  };

  const handleConfigurer = (objet) => {
    setEditMode(false);
    setConfigMode(true);
    setEditingId(objet.id);
    setNewObjet({
      name: objet.name,
      description: objet.description || "",
      status: objet.status,
      zone: objet.zone,
      temperature: objet.temperature || "",
      batterie: objet.batterie,
      wifi: objet.wifi
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setConfigMode(false);
    setEditingId(null);
    setNewObjet({ name: "", description: "", status: "actif", zone: "", temperature: "", batterie: "", wifi: "fort" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObjet({ ...newObjet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode || configMode) {
      const updated = objets.map(obj =>
        obj.id === editingId ? {
          ...obj,
          ...(editMode && {
            name: newObjet.name,
            description: newObjet.description,
            status: newObjet.status,
          }),
          ...(configMode && {
            zone: newObjet.zone,
            temperature: newObjet.temperature ? parseFloat(newObjet.temperature) : null,
            batterie: parseInt(newObjet.batterie),
            wifi: newObjet.wifi
          })
          
        } : obj
      );
      setObjets(updated);
    } else {
      const id = objets.length + 1;
      const objetAjoute = {
        id,
        ...newObjet,
        temperature: newObjet.temperature ? parseFloat(newObjet.temperature) : null,
        batterie: parseInt(newObjet.batterie)
      };
      setObjets([...objets, objetAjoute]);
    }
    handleCloseModal();
  };

  const handleSupprimer = (id) => {
    const filtered = objets.filter(obj => obj.id !== id);
    setObjets(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Gestion des Objets Connectés</h1>

      <div className="mb-6">
        <button
          onClick={handleAjouterObjet}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          + Ajouter un objet
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-black">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Modifier les informations" : configMode ? "Configurer l'objet" : "Ajouter un nouvel objet"}
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {editMode && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l’objet</label>
                    <input id="name" name="name" value={newObjet.name} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <input id="description" name="description" value={newObjet.description} onChange={handleChange} className="border p-2 rounded w-full text-black" />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">Statut</label>
                    <select id="status" name="status" value={newObjet.status} onChange={handleChange} className="border p-2 rounded w-full text-black">
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                  </div>
                </>
              )}

              {configMode && (
                <>
                  <div>
                    <label htmlFor="zone" className="block text-sm font-medium mb-1">Zone / Pièce</label>
                    <input id="zone" name="zone" value={newObjet.zone} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                  </div>
                  <div>
                    <label htmlFor="temperature" className="block text-sm font-medium mb-1">Température (°C)</label>
                    <input id="temperature" name="temperature" type="number" value={newObjet.temperature} onChange={handleChange} className="border p-2 rounded w-full text-black" />
                  </div>
                  <div>
                    <label htmlFor="batterie" className="block text-sm font-medium mb-1">Batterie (%)</label>
                    <input id="batterie" name="batterie" type="number" value={newObjet.batterie} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                  </div>
                  <div>
                    <label htmlFor="wifi" className="block text-sm font-medium mb-1">Connexion Wi-Fi</label>
                    <select id="wifi" name="wifi" value={newObjet.wifi} onChange={handleChange} className="border p-2 rounded w-full text-black">
                      <option value="fort">Wi-Fi Fort</option>
                      <option value="moyen">Wi-Fi Moyen</option>
                      <option value="faible">Wi-Fi Faible</option>
                    </select>
                  </div>
                </>
              )}

                {!editMode && !configMode && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nom de l’objet</label>
                      <input id="name" name="name" value={newObjet.name} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                      <input id="description" name="description" value={newObjet.description} onChange={handleChange} className="border p-2 rounded w-full text-black" />
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-1">Statut</label>
                      <select id="status" name="status" value={newObjet.status} onChange={handleChange} className="border p-2 rounded w-full text-black">
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zone" className="block text-sm font-medium mb-1">Zone / Pièce</label>
                      <input id="zone" name="zone" value={newObjet.zone} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                    </div>
                    <div>
                      <label htmlFor="temperature" className="block text-sm font-medium mb-1">Température (°C)</label>
                      <input id="temperature" name="temperature" type="number" value={newObjet.temperature} onChange={handleChange} className="border p-2 rounded w-full text-black" />
                    </div>
                    <div>
                      <label htmlFor="batterie" className="block text-sm font-medium mb-1">Batterie (%)</label>
                      <input id="batterie" name="batterie" type="number" value={newObjet.batterie} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                    </div>
                    <div>
                      <label htmlFor="wifi" className="block text-sm font-medium mb-1">Connexion Wi-Fi</label>
                      <select id="wifi" name="wifi" value={newObjet.wifi} onChange={handleChange} className="border p-2 rounded w-full text-black">
                        <option value="fort">Wi-Fi Fort</option>
                        <option value="moyen">Wi-Fi Moyen</option>
                        <option value="faible">Wi-Fi Faible</option>
                      </select>
                    </div>
                  </>
                )}


              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded text-black">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  {editMode ? "Enregistrer" : configMode ? "Appliquer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objets.map((objet) => (
          <div key={objet.id} className="border p-4 rounded-2xl shadow-md bg-gray-50">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{objet.name}</h2>
            <p className="text-sm text-gray-700"><strong>Description:</strong> {objet.description}</p>
            <p className="text-sm text-gray-700"><strong>Statut:</strong> {objet.status}</p>
            <p className="text-sm text-gray-700"><strong>Zone:</strong> {objet.zone}</p>
            <div className="flex gap-4 my-2">
              {objet.temperature !== null && <Temperature value={objet.temperature} />}
              <Battery level={objet.batterie} />
              <Wifi strength={objet.wifi} />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleModifier(objet)} className="bg-blue-500 text-white px-3 py-1 rounded-xl">Modifier</button>
              <button onClick={() => handleSupprimer(objet.id)} className="bg-red-500 text-white px-3 py-1 rounded-xl">Supprimer</button>
              <button onClick={() => handleConfigurer(objet)} className="bg-green-500 text-white px-3 py-1 rounded-xl">Configurer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GestionDashboard;
