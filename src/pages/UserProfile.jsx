import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from '../assets/avatar1.png'; // Importer l'image

const handleDateInput = (e) => {
  let value = e.target.value;
  if (value.length <= 10) {
      setUserData({
          ...userData,
          public: {
              ...userData.public,
              dateNaissance: value
          }
      });
  }
};

const UserProfile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    public: {
      pseudonyme: '',
      age: '',
      sexe: '',
      dateNaissance: '',
      typeMembre: '',
      photo: avatar1 // Photo par défaut
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        fetch("http://localhost:5000/api/auth/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert("Erreur: " + data.error);
                setIsAuthenticated(false);
                navigate("/");
            } else {
                setUser(data); // Affiche les données du profil
                setUserData({
                    public: data.public,
                    private: data.private,
                });
                setIsChecking(false); // La vérification est terminée
            }
        })
        .catch((err) => {
            console.error("Erreur Fetch profil:", err);
            setIsAuthenticated(false);
            navigate("/");
        });
    } else {
        setIsAuthenticated(false);
        navigate("/");
    }
  }, [navigate, setIsAuthenticated]);

  // Si la vérification est encore en cours, afficher un message d'attente
  if (isChecking) {
    return <div>Vérification en cours...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');
    setUserData({
      ...userData,
      [section]: {
        ...userData[section],
        [field]: value
      }
    });
  };

  // Fonction pour limiter l'âge à 100 ans
  const handleAgeChange = (e) => {
    let value = e.target.value;
    if (value > 100) value = 100; // Limite à 100 ans
    if (value < 0) value = 0; // Empêche les valeurs négatives
    setUserData({
      ...userData,
      public: {
        ...userData.public,
        age: value
      }
    });
  };

  const handleSave = () => {
    console.log('Données sauvegardées', userData);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Profil Utilisateur</h2>

        {/* Partie Publique */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Informations Publiques</h3>

          {/* Pseudonyme */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pseudonyme</label>
            <input
              type="text"
              name="public.pseudonyme"
              value={userData.public.pseudonyme}
              onChange={handleInputChange}
              readOnly={!editing}
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-transparent"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Âge</label>
            <input
              type="number"
              name="public.age"
              value={userData.public.age}
              onChange={handleAgeChange}
              readOnly={!editing}
              min="0"
              max="100"
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Genre/Sexe */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Sexe / Genre</label>
            {editing ? (
              <select
                name="public.sexe"
                value={userData.public.sexe}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Sélectionnez</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            ) : (
              <div className="p-2 border border-gray-300 rounded shadow-sm text-black">{userData.public.sexe}</div>
            )}
          </div>

          {/* Date de Naissance */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
            <input
              type="text"
              name="public.dateNaissance"
              value={userData.public.dateNaissance}
              onChange={handleDateInput}
              readOnly={!editing}
              placeholder="JJ/MM/AAAA"
              maxLength="10"
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Type de Membre */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Type de Membre</label>
            <input
              type="text"
              name="public.typeMembre"
              value={userData.public.typeMembre}
              onChange={handleInputChange}
              readOnly={!editing}
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-transparent"
            />
          </div>

          {/* Photo de profil */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Photo de Profil</label>
            <div className="flex items-center space-x-4">
              <img src={userData.public.photo} alt="Avatar" className="w-12 h-12 rounded-full" />
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  name="public.photo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setUserData({
                          ...userData,
                          public: {
                            ...userData.public,
                            photo: reader.result
                          }
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              )}
            </div>
          </div>
        </div>

        {/* Partie Privée */}
        {editing && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Informations Privées</h3>

            {/* Nom */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
              <input
                type="text"
                name="private.nom"
                value={userData.private.nom}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* Prénom */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
              <input
                type="text"
                name="private.prenom"
                value={userData.private.prenom}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>
        )}

        {/* Boutons Modifier / Enregistrer */}
        {editing ? (
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enregistrer
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Modifier
          </button>
        )}

        <button onClick={() => {
          console.log("Déconnexion, suppression du token");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/");
        }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
