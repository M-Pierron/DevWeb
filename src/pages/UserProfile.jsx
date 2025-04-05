import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from '../assets/avatar1.png'; // Importer l'image

const UserProfile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    public: {
      pseudonyme: '',
      age: '',
      dateNaissance: '',
      sexe: '',
      email: '',
      photo: avatar1 // Photo par défaut
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  
  const navigate = useNavigate();

  // Vérification du token au chargement du composant
  useEffect(() => {
    console.log("🔥 useEffect de UserProfile appelé");
    let isMounted = true;
  
    const token = localStorage.getItem("token");
    console.log("🧾 Token dispo dans UserProfile:", token);
  
    if (!token) {
      setIsAuthenticated(false);
      navigate("/");
      return;
    }
  
    fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.error) {
          console.warn("Erreur côté API:", data.error);
          setIsAuthenticated(false);
          navigate("/");
        } else {
          setUser(data);
          setUserData({
            public: data.public,
            private: data.private,
          });
          setIsChecking(false);
          console.log("Profile data fetched:", data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Erreur Fetch profil:", err);
          setIsAuthenticated(false);
          navigate("/");
        }
      });
  
    return () => {
      isMounted = false;
    };
  }, []); // 🚨 exécuter une seule fois au montage
  

  // Si la vérification est encore en cours, afficher un message d'attente
  if (isChecking) {
    return <div>Vérification en cours...</div>;
  }

  // Gérer les changements de champs d'entrée
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

  // Limiter l'âge à 100 ans
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

  // Gérer la date de naissance
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

  // Sauvegarder les modifications
  const handleSave = () => {
    console.log('Données sauvegardées', userData);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Profil Utilisateur</h2>

        {/* Photo de profil */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Photo de Profil</label>
          <div className="flex items-center space-x-4">
            {userData.public.photo ? (
              <img src={userData.public.photo} alt="Avatar" className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Photo</span>
              </div>
            )}
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

        {/* Âge */}
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

        {/* Date de naissance */}
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

        {/* Sexe */}
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

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="public.email"
            value={userData.public.email}
            onChange={handleInputChange}
            readOnly={!editing}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-transparent"
          />
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

        {/* Bouton Déconnexion */}
        <button onClick={() => {
          console.log("Déconnexion, suppression du token");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          navigate("/");
        }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Déconnexion
        </button>

        {/* Bouton Retour à l'Accueil */}
        <button onClick={() => navigate("/Accueil")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4">
          Retour à l'Accueil
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
