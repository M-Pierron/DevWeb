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
      level: '' // Ajoutez le niveau ici
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔥 useEffect de UserProfile appelé");
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
          logout();
          navigate("/");
        }
      });
  
    return () => {
      isMounted = false;
    };
  }, [navigate, logout]);

  if (isChecking) {
    return <div>Vérification en cours...</div>;
  }

  const handleLogout = () => {
    console.log("Déconnexion, suppression du token");
    localStorage.removeItem("token");
    logout();
    navigate("/");
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

          {(userData.public.level === 'admin' || user?.level === 'admin') && (
            <button
              onClick={() => navigate("/Accueil/Verification")}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Vérification Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;