import React, { useState } from "react";
import Nav from "../components/nav";

const GestionDashboard = () => {
  const [search, setSearch] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    zone: "",
    wifi: "",
  });
  
  const [visibleNav, setVisibleNav] = useState(true);

  const [objets, setObjets] = useState([
    {
      id: 1,
      name: "Thermostat Salon",
      description: "Régule la température du salon.",
      status: "actif",
      zone: "Salon",
      batterie: 67,
      temperature: 23,
      wifi: "faible",
      heureDebut: "08:00",
      heureFin: "22:00",
    },
    {
      id: 2,
      name: "Caméra Entrée",
      description: "Caméra à l'entrée principale.",
      status: "inactif",
      zone: "Entrée",
      batterie: 42,
      temperature: null,
      wifi: "moyen",
      heureDebut: "00:00",
      heureFin: "00:00",
    },
  ]);

  const [newObjet, setNewObjet] = useState(null);

  const zonesDisponibles = [...new Set(objets.map(o => o.zone))];
  const filtrerObjets = () => {
    return objets.filter(objet => {
      const matchNom = objet.name.toLowerCase().includes(search.toLowerCase());
      const matchStatut = !filters.status || objet.status === filters.status;
      const matchZone = !filters.zone || objet.zone === filters.zone;
      const matchWifi = !filters.wifi || objet.wifi === filters.wifi;        
      return matchNom && matchStatut && matchZone && matchWifi;
    });
  };

  const objetsInefficaces = objets.map(obj => {
    const problemes = [];

    if (obj.batterie < 30) problemes.push("🔋 Batterie faible");
    if (obj.wifi === "faible") problemes.push("📶 Connexion Wi-Fi faible");
    if (obj.temperature > 30) problemes.push("🌡️ Température élevée");
    return problemes.length > 0 ? { ...obj, problemes } : null;
  })
  .filter(Boolean);

  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAjouter = () => {
    setVisibleNav(false);
    setNewObjet({ name: "", description: "", status: "actif", zone: "", batterie: null, wifi: "fort", temperature: null, heureDebut: "", heureFin: "" });
  };

  const handleModifier = (objet) => {
    setVisibleNav(false);
    setNewObjet({ ...objet });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewObjet({ ...newObjet, [name]: value });
  };

  const handleSubmit = () => {
    if (newObjet.id) {
      setObjets(objets.map(o => (o.id === newObjet.id ? newObjet : o)));
    } else {
      const id = objets.length + 1;
      setObjets([...objets, { ...newObjet, id }]);
    }
    setNewObjet(null);
    setVisibleNav(true);
  };

  const handleSupprimer = (id) => {
    if (confirm("Demande de suppression envoyée à l’administrateur.")) {
      alert("✔️ Demande de suppression envoyée à l’administrateur.");
    }
  };

  return (
    <div>
      {visibleNav && <Nav />}
      <div className="flex p-4 gap-4 text-black">
  <div className="w-1/3 p-4 bg-gray-100 rounded-xl">
    <input
      type="text"
      placeholder="🔍 Rechercher..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 rounded border mb-4"
    />
    <div className="space-y-4">
        <div>
          <label className="block font-semibold">Statut :</label>
          <select name="status" value={filters.status} onChange={handleFilterChange} className="w-full p-2 border rounded">
            <option value="">Tous</option>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Zone :</label>
          <select name="zone" value={filters.zone} onChange={handleFilterChange} className="w-full p-2 border rounded">
            <option value="">Toutes</option>
            {zonesDisponibles.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Wi-Fi :</label>
          <select name="wifi" value={filters.wifi} onChange={handleFilterChange} className="w-full p-2 border rounded">
            <option value="">Tous</option>
            <option value="fort">fort</option>
            <option value="moyen">moyen</option>
            <option value="faible">faible</option>
          </select>
        </div>
      </div>
    </div>

  <div className="w-2/3 space-y-4">
  <div className="flex gap-2">
  <button onClick={handleAjouter} className="bg-indigo-600 text-white px-4 py-2 rounded-xl">+ Ajouter un objet</button>
  <button onClick={() => setShowStats(true)} className="bg-emerald-600 text-white px-4 py-2 rounded-xl">Stats</button>
</div>

{objetsInefficaces.length > 0 && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl space-y-2">
    ⚠️ <strong>{objetsInefficaces.length} objet(s) nécessitent une attention :</strong>
    <ul className="list-disc ml-6 text-sm space-y-1">
      {objetsInefficaces.map(obj => (
        <li key={obj.id}>
          <strong>{obj.name}</strong> :
          <ul className="list-none ml-4 mt-1">
            {obj.problemes.map((p, index) => (
              <li key={index}>• {p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
)}

  <div className="grid grid-cols-2 gap-4">
    {filtrerObjets().map(obj => (
  <div key={obj.id} className="grid grid-cols-2 gap-4 border p-4 rounded-xl bg-white shadow items-start">
    <div>
      <h2 className="text-xl font-bold">{obj.name}</h2>
      <p className="text-gray-600">{obj.description}</p>
      <p className="mt-2"><strong>Zone :</strong> {obj.zone}</p>
      <p><strong>Status :</strong> {obj.status === "actif" ? "🟢 Actif" : "🔴 Inactif"}</p>
    </div>
    <div className="text-right space-y-1">
      <p><strong>📶 Wi-Fi :</strong> {obj.wifi}</p>
      <p><strong>🔋 Batterie :</strong> {obj.batterie}%</p>
      <p><strong>🌡️ Température :</strong> {obj.temperature ?? "N/A"}°C</p>
      <p><strong>⏰ Horaires :</strong> {obj.heureDebut} - {obj.heureFin}</p>
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={() => handleModifier(obj)} className="bg-blue-500 text-white px-3 py-1 rounded-xl">Modifier</button>
        <button onClick={() => handleSupprimer(obj.id)} className="bg-red-500 text-white px-3 py-1 rounded-xl">Supprimer</button>
      </div>
    </div>
  </div>
))}
</div>
    {newObjet && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">{newObjet.id ? "Modifier" : "Ajouter un objet"}</h2>
          <div className="flex flex-col gap-3">
            <input name="name" placeholder="Nom" value={newObjet.name} onChange={handleChange} className="border p-2 rounded" />
            <input name="description" placeholder="Description" value={newObjet.description} onChange={handleChange} className="border p-2 rounded" />
            <select name="status" value={newObjet.status} onChange={handleChange} className="border p-2 rounded">
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
            <input name="zone" placeholder="Zone" value={newObjet.zone} onChange={handleChange} className="border p-2 rounded" />
            <input name="temperature" placeholder="Température" value={newObjet.temperature ?? ''} onChange={handleChange} className="border p-2 rounded" />
            <input name="batterie" placeholder="Batterie" value={newObjet.batterie} onChange={handleChange} className="border p-2 rounded" />
            <select name="wifi" value={newObjet.wifi} onChange={handleChange} className="border p-2 rounded">
              <option value="fort">Wi-Fi fort</option>
              <option value="moyen">Wi-Fi moyen</option>
              <option value="faible">Wi-Fi faible</option>
            </select>
            <input name="heureDebut" type="time" value={newObjet.heureDebut} onChange={handleChange} className="border p-2 rounded" />
            <input name="heureFin" type="time" value={newObjet.heureFin} onChange={handleChange} className="border p-2 rounded" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => { setNewObjet(null); setVisibleNav(true); }} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Valider</button>
          </div>
        </div>
      </div>
      
    )}
  </div>
  {showStats && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">📊 Statistiques générales</h2>
      <ul className="space-y-2">
        <li><strong>Objets totaux :</strong> {objets.length}</li>
        <li><strong>Objets actifs :</strong> {objets.filter(o => o.status === "actif").length}</li>
        <li><strong>Objets inactifs :</strong> {objets.filter(o => o.status === "inactif").length}</li>
        <li><strong>Moyenne batterie :</strong> {
          (objets.reduce((sum, o) => sum + (o.batterie ?? 0), 0) / objets.length).toFixed(1)
        }%</li>
      </ul>

      <div className="flex justify-between mt-6">
        <button onClick={() => alert("📂 Fonction Historique à intégrer ici (graphiques, logs, etc.)")} className="bg-indigo-600 text-white px-4 py-2 rounded">
          📂 Voir les historiques
        </button>
        <button onClick={() => setShowStats(false)} className="bg-gray-300 px-4 py-2 rounded">Fermer</button>
      </div>
    </div>
  </div>
)}


</div>
</div>
  );
};

export default GestionDashboard;
