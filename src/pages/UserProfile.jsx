import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import avatar1 from '../assets/avatar1.png';
import Nav from "../components/nav";

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

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`; // Format JJ/MM/AAAA
  };

  // Vérifier si l'utilisateur est admin soit depuis le contexte, soit depuis les données du profil
  const isAdmin = user?.level === 'admin' || userData.public.level === 'admin';
  console.log("Is admin?", isAdmin); // Debugging admin status

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 overflow-y-auto">
      <Nav />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center">
        {/* Photo de profil */}
        <img
          src={userData.public.photo || avatar1}
          alt="Profil"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        {/* <input type="file" ref={profilePictureFileRef} onChange={onProfilePictureFileChange} className="hidden" />
        <button
          onClick={onChangeProfilePictureClick}
          className="mt-4 text-sm bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium text-blue-700 shadow"
        >
          Changer la photo
        </button> */}

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
            <p className="p-2 bg-gray-50 rounded">{formatDate(userData.public.dateNaissance)}</p>
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
