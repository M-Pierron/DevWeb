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
    console.log("Current user from context:", user); 
    let isMounted = true;

    // -- Récupe le token coté client --
    const token = localStorage.getItem("token");
    console.log("🧾 Token dispo dans UserProfile:", token);
  
    // -- Si le token n'existe pas, cela veut dire que l'utilisateur n'existe pas/son token a expiré --
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
          console.log("Profile data received:", data); 
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

  const handleLogout = () => {
    // -- Supprimer le token --
    console.log("Déconnexion, suppression du token");
    localStorage.removeItem("token");
    // 
    logout();
    navigate("/");
  };

  const handleAdminVerification = () => {
    console.log("Tentative d'accès à la page admin");
    console.log("User level from context:", user?.level);
    console.log("User level from profile:", userData.public.level);
    navigate("/Accueil/Admin"); //
  };

  const onProfilePictureFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
     
    }
  };

  const onChangeProfilePictureClick = () => {
    profilePictureFileRef.current.click();
  };

  // -- Vérifier si l'utilisateur est admin soit depuis le contexte, soit depuis les données du profil --
  const isAdmin = user?.level === 'admin' || userData.public.level === 'admin';
  console.log("Is admin?", isAdmin); // Debugging admin status

  return (
    <>
    <Nav name="PROFIL" />
    <div className="profil">
    <div className="flex flex-col h-screen">
      
      <div className="flex flex-col grow items-center justify-center">
        <div className="flex flex-row h-[80%] w-[50%] rounded-lg">
          {/* Left side */}
          <div className="w-[50%] h-full flex flex-col items-center mr-2">
            {/* Profile picture frame */}
            <div className="bg-white w-full h-[80%] flex flex-col p-4 border-2 border-[#3c5497] mb-2 rounded-lg">
              <div className="h-[90%] border-2 border-[#3c5497] w-full mb-2">
                <img 
                  src="/src/assets/placeholderpfp.jpg" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Cacher cette input pour l'utiliser dans le div */}
              <input type="file" ref={profilePictureFileRef} onChange={onProfilePictureFileChange} className="hidden"/>
              <div onClick={onChangeProfilePictureClick} className="flex flex-row items-center justify-center text-black border-2 border-black w-full cursor-pointer bg-gray-300"> 
                <span>Changer photo de profile</span>
              </div>
            </div>

            {/* Level frame */}
            <div className="bg-white size-full flex flex-col">
              <div className="flex flex-row items-center justify-center bg-gray-400 text-black border-2 border-[#3c5497] border-b-0 rounded-t-lg">
                <span className="font-bold">Niveau</span>
              </div>
              <div className="h-full border-2 border-[#3c5497] rounded-b-lg">

              </div>
            </div>

          </div>

          {/* Right side */}
          <div className="bg-white w-[50%] h-full flex flex-col p-4 border-2 border-[#3c5497] rounded-lg">
            {/* Form frame */}
            <div className="flex flex-col h-[80%] justify-between mb-4 text-black">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Pseudonyme</label>
                <p className="p-2 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.pseudonyme}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Âge</label>
                <p className="p-2 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.age}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
                <p className="p-2 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.dateNaissance}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Sexe / Genre</label>
                <p className="p-2 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.sexe}</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <p className="p-2 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.email}</p>
              </div>
            </div>

            {/* Buttons frame */}
            <div className="flex flex-row gap-4 h-[20%]">
              <button
                onClick={() => navigate("/Accueil/Profil/Edit")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-size- py-2 px-4 rounded"
              >
                Modifier le profil
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
      </div>
    </div>
    </div>
    </>
  );
};

export default UserProfile;
