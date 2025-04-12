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

  const profilePictureFileRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
      console.log("🔥 useEffect de UserProfile appelé");
      console.log("Current user from context:", user); // Debugging user from context
      let isMounted = true;

      // Récuper le token coté client
      const token = localStorage.getItem("token");
      console.log("🧾 Token dispo dans UserProfile:", token);
    
      // Si le token n'existe pas, cela veut dire que l'utilisateur n'existe pas/son token a expiré
      // Donc le faire deconnecter
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

    useEffect(() => {
      console.log("🔁 userData mis à jour:", userData);
    }, [userData]);

    if (isChecking) {
      return <div>Vérification en cours...</div>;
    }

    // Event lorsque l'utiliseur se déconnecte
    const handleLogout = () => {
      // Supprimer le token
      console.log("Déconnexion, suppression du token");
      localStorage.removeItem("token");
      // 
      logout();
      navigate("/");
    };

    const handleAdminVerification = () => {
      console.log("Tentative d'accès à la page de vérification");
      console.log("User level from context:", user?.level);
      console.log("User level from profile:", userData.public.level);
      navigate("/Accueil/Verification");
    };

    const onProfilePictureFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file);
        // You can handle the file upload or preview here
      }
    };

    const onChangeProfilePictureClick = () => {
      profilePictureFileRef.current.click();
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

        {/* Niveau */}
        <div className="text-center mt-6">
          <span className="text-sm font-semibold text-gray-600">Niveau</span>
          <p className="text-xl font-bold text-blue-600 mt-1">{userData.public.level || "N/A"}</p>
        </div>

        {/* Informations utilisateur */}
        <div className="w-full mt-8 flex flex-col gap-4 text-black">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Pseudonyme</label>
            <p className="p-3 bg-white rounded-xl border border-gray-300 shadow-sm">{userData.public.pseudonyme}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Âge</label>
            <p className="p-3 bg-white rounded-xl border border-gray-300 shadow-sm">{userData.public.age}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Date de naissance</label>
            <p className="p-3 bg-white rounded-xl border border-gray-300 shadow-sm">{userData.public.dateNaissance}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Sexe / Genre</label>
            <p className="p-3 bg-white rounded-xl border border-gray-300 shadow-sm">{userData.public.sexe}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <p className="p-3 bg-white rounded-xl border border-gray-300 shadow-sm">{userData.public.email}</p>
          </div>
        </div>

        {/* Boutons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 w-full">
          <button
            onClick={() => navigate("/Accueil/Profil/Edit")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow w-full"
          >
            Modifier le profil
          </button>
          <button
            onClick={() => navigate("/Accueil")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-3 rounded-xl font-semibold shadow w-full"
          >
            Retour à l'accueil
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-xl font-semibold shadow w-full"
          >
            Déconnexion
          </button>
          {isAdmin && (
            <button
              onClick={handleAdminVerification}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow w-full"
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
