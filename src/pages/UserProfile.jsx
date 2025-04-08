<<<<<<< Updated upstream
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
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import avatar1 from '../assets/avatar1.png';

const UserProfile = () => {
  const { logout, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [userData, setUserData] = useState({
    public: {
      pseudonyme: '',
      age: '',
      dateNaissance: '',
      sexe: '',
      email: '',
      photo: avatar1,
      level: ''
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔥 useEffect de UserProfile appelé");
    console.log("Current user from context:", user); // Debugging user from context
    let isMounted = true;
  
    const token = localStorage.getItem("token");
    console.log("🧾 Token dispo dans UserProfile:", token);
  
    if (!token) {
      logout();
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
          logout();
          navigate("/");
        } else {
          console.log("Profile data received:", data); // Debugging profile data
          setUserData(data);
          setIsChecking(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Erreur Fetch profil:", err);
          logout();
          navigate("/");
        }
      });
  
    return () => {
      isMounted = false;
    };
  }, [navigate, logout, user]);

  if (isChecking) {
    return <div>Vérification en cours...</div>;
  }

  const handleLogout = () => {
    console.log("Déconnexion, suppression du token");
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  const handleAdminVerification = () => {
    console.log("Tentative d'accès à la page admin");
    console.log("User level from context:", user?.level);
    console.log("User level from profile:", userData.public.level);
    navigate("/Accueil/Admin"); //
  };

  // Vérifier si l'utilisateur est admin soit depuis le contexte, soit depuis les données du profil
  const isAdmin = user?.level === 'admin' || userData.public.level === 'admin';
  console.log("Is admin?", isAdmin); // Debugging admin status

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
          </div>
        </div>

        {/* Informations publiques */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Pseudonyme</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.pseudonyme}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Âge</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.age}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.dateNaissance}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Sexe / Genre</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.sexe}</p>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Niveau</label>
            <p className="p-2 bg-gray-50 rounded">{userData.public.level || 'user'}</p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/Accueil/Profil/Edit")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Modifier le profil
          </button>

          <button
            onClick={() => navigate("/Accueil")}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Retour à l'Accueil
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Déconnexion
          </button>

          {isAdmin && (
            <button
              onClick={handleAdminVerification}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Admin Panel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
>>>>>>> Stashed changes
