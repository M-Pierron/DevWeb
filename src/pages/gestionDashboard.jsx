import React, { useState,useEffect } from "react";
import Battery from "../components/DashBoard/battery";
import Wifi from "../components/DashBoard/wifi";
import Temperature from "../components/DashBoard/temperature";
import Conso from "../components/DashBoard/conso.jsx"
import { UNSAFE_ViewTransitionContext } from "react-router-dom";
import Nav from "../components/nav"

const GestionDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [configMode, setConfigMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [visibleNav, setVisibleNav] = useState(true);
  const [objets, setObjets] = useState([
    {
      id: 1,
      name: "Thermostat Salon",
      description: "Thermostat du salon pour réguler la température.",
      status: "actif",
      zone: "Salon",
      batterie: 67,
      temperature: 21,
      wifi: "faible",
      heureDebut: "08:00",
      heureFin: "22:00",
      historiqueUtilisation: [
        { date: "2025-04-01", consommation: 2.3 },
        { date: "2025-04-02", consommation: 1.9 },
        { date: "2025-04-03", consommation: 3.0 },
        { date: "2025-04-04", consommation: 2.5 }
      ]
    },
    {
      id: 2,
      name: "Caméra Entrée",
      description: "Caméra de sécurité à l'entrée principale.",
      status: "inactif",
      zone: "Entrée",
      batterie: 42,
      temperature: null,
      wifi: "moyen",
      heureDebut: "00:00",
      heureFin: "00:00",
      historiqueUtilisation: [
        { date: "2025-04-01", consommation: 1.2 },
        { date: "2025-04-02", consommation: 1.3 },
        { date: "2025-04-03", consommation: 0.9 }
      ]
    }
  ]);

  const [newObjet, setNewObjet] = useState({
    name: "",
    description: "",
    status: "actif",
    zone: "",
    temperature: "",
    batterie: "",
    wifi: "fort",
    heureDebut: "",
    heureFin: ""
  });

  const [showStats, setShowStats] = useState(false);


  const calculateConsommation = () => {
    //la consommation est influencée par la température et la batterie
    let consommation = 0;
    if (newObjet.temperature > 20) {
      consommation += 2; // Plus chaud, plus de consommation
    }
    if (newObjet.batterie < 30) {
      consommation += 1.5; // Batterie faible => Consommation plus élevée
    }
    return consommation;
  };

  const verifEfficacite = (objet) => {
    const seuilBatterie = 20;
    const seuilConsommation = 2.5;
    const seuilTemp = 30;
  
    let messages = [];
  
    if (objet.batterie < seuilBatterie) {
      messages.push('⚠️ Batterie faible');
    }
  
    if (objet.wifi === "faible") {
      messages.push('⚠️ Signal Wi-Fi faible');
    }
  
    if (objet.consommation > seuilConsommation) {
      messages.push('⚠️ Consommation énergétique élevée');
    }
  
    if (objet.temperature > seuilTemp) {
      messages.push('⚠️ Température trop élevée');
    }
  
    return messages.length > 0 ? messages.join(" • ") : null;
  };
  
  
  const handleAjouterObjet = () => {
    setVisibleNav(false);
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
      wifi: objet.wifi,
      heureDebut: objet.heureDebut || "",
      heureFin: objet.heureFin || ""
      
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
      wifi: objet.wifi,
      heureDebut: objet.heureDebut || "",
      heureFin: objet.heureFin || ""
      
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setVisibleNav(true);
    setShowModal(false);
    setEditMode(false);
    setConfigMode(false);
    setEditingId(null);
    setNewObjet({ name: "", description: "", status: "actif", zone: "", temperature: "", batterie: "", wifi: "fort",heureDebut:"",heureFin:"" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObjet({ ...newObjet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const date = new Date().toISOString().split('T')[0];
    const newConsommation = calculateConsommation();
  
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
            wifi: newObjet.wifi,
            heureDebut: newObjet.heureDebut,
            heureFin: newObjet.heureFin,
          }),
          // Met à jour directement l'historique ici
          historiqueUtilisation: [
            ...obj.historiqueUtilisation,
            { date, consommation: newConsommation }
          ]
        } : obj
      );
      setObjets(updated);
    } else {
      const id = objets.length + 1;
      const objetAjoute = {
        id,
        ...newObjet,
        temperature: newObjet.temperature ? parseFloat(newObjet.temperature) : null,
        batterie: parseInt(newObjet.batterie),
        historiqueUtilisation: [{ date, consommation: newConsommation }]
      };
      setObjets([...objets, objetAjoute]);
    }
    handleCloseModal();
  };
  

  const handleSupprimer = (id) => {
    const confirmer = window.confirm("Voulez-vous envoyer une demande de suppression à l'administrateur ?");
    if (confirmer) {
      // Simuler la demande envoyée à l'administrateur
      alert("✔️ Demande de suppression envoyée à l’administrateur.");
    }
  };

  const handleShowStats = () => {
    setShowStats(true);
    setVisibleNav(false);
  }

  const handleNoStats = () => {
    setShowStats(false);
    setVisibleNav(true);
  }

  return (
    <>
    {visibleNav && (
      <Nav name="GESTION"/>
    )}
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Gestion des Objets Connectés</h1>

      <div className="mb-6 flex gap-3">
        <button
          onClick={handleAjouterObjet}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          + Ajouter un objet
        </button>
        <button
    onClick={handleShowStats}
    className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
  >
    📊 Stat
  </button>
      </div>

      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-xl text-black max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">📈 Rapports Statistiques</h2>

            <p><strong>Total d’objets :</strong> {objets.length}</p>
            <p><strong>Objets actifs :</strong> {objets.filter(o => o.status === 'actif').length}</p>
            <p><strong>Objets inactifs :</strong> {objets.filter(o => o.status === 'inactif').length}</p>
            <p><strong>Consommation moyenne par objet :</strong> {
              (
                objets.reduce((total, obj) => total + obj.historiqueUtilisation.reduce((sum, h) => sum + h.consommation, 0), 0)
                / objets.length
              ).toFixed(2)
            } kWh</p>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">📅 Historique de consommation :</h3>
              {objets.map(obj => (
                <div key={obj.id} className="mb-4">
                  <h4 className="font-bold">{obj.name}</h4>
                  <ul className="text-sm list-disc pl-5">
                    {obj.historiqueUtilisation.map((entry, index) => (
                      <li key={index}>{entry.date} : {entry.consommation} kWh</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleNoStats}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl text-black max-h-[90vh] overflow-y-auto">
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
                    <input id="batterie" name="batterie" type="number" min="0" max="100" value={newObjet.batterie} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                  </div>
                  <div>
                    <label htmlFor="wifi" className="block text-sm font-medium mb-1">Connexion Wi-Fi</label>
                    <select id="wifi" name="wifi" value={newObjet.wifi} onChange={handleChange} className="border p-2 rounded w-full text-black">
                      <option value="fort">Wi-Fi Fort</option>
                      <option value="moyen">Wi-Fi Moyen</option>
                      <option value="faible">Wi-Fi Faible</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="heureDebut" className="block text-sm font-medium mb-1">Heure de début</label>
                    <input id="heureDebut" name="heureDebut" type="time" value={newObjet.heureDebut} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
                </div>
                <div>
                    <label htmlFor="heureFin" className="block text-sm font-medium mb-1">Heure de fin</label>
                    <input id="heureFin" name="heureFin" type="time" value={newObjet.heureFin} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
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
              <div>
                <label htmlFor="heureDebut" className="block text-sm font-medium mb-1">Heure de début</label>
                <input id="heureDebut" name="heureDebut" type="time" value={newObjet.heureDebut} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
              </div>
              <div>
                <label htmlFor="heureFin" className="block text-sm font-medium mb-1">Heure de fin</label>
                <input id="heureFin" name="heureFin" type="time" value={newObjet.heureFin} onChange={handleChange} className="border p-2 rounded w-full text-black" required />
              </div>
            </>
          )}          



              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 text-indigo-700 bg-indigo-700 border-indigo-700 text-white rounded hover:bg-indigo-800">
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
          <p className="text-sm text-gray-700"><strong>Horaires:</strong> {objet.heureDebut} - {objet.heureFin}</p>
          <p className="text-sm text-red-600 font-bold">{verifEfficacite(objet)}</p>

         
          <p className="text-sm text-gray-700"><strong>Consommation:</strong> {objet.consommation} kWh</p>

          <div className="flex gap-4 my-2">
            {objet.temperature !== null && <Temperature value={objet.temperature} />}
            <Battery level={objet.batterie} />
            <Wifi strength={objet.wifi} />
          </div>

        
          <Conso data={objet.historiqueUtilisation} />

          <div className="flex gap-2 mt-10">
            <button onClick={() => handleModifier(objet)} className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-700">Modifier</button>
            <button onClick={() => handleSupprimer(objet.id)} className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-900">Supprimer</button>
            <button onClick={() => handleConfigurer(objet)} className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600">Configurer</button>
          </div>
        </div>
      ))}

      </div>
    </div>
    </>
  );
};

export default GestionDashboard;
