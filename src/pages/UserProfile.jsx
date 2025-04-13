import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
      photo: '',
      points: 0
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔥 useEffect de UserProfile appelé");
    console.log("Current user from context:", user); 
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
    console.log("Déconnexion, suppression du token");
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  const handleAdminVerification = () => {
    console.log("Tentative d'accès à la page admin");
    console.log("User level from context:", user?.level);
    console.log("User level from profile:", userData.public.level);
    navigate("/Accueil/Admin");
  };

  const isAdmin = user?.level === 'admin' || userData.public.level === 'admin';
  console.log("Is admin?", isAdmin);

  return (
    <>
      <Nav name="PROFIL" />
      <div className="profil">
        <div className="flex flex-col h-screen">
          <div className="flex flex-col grow items-center justify-center">
            <div className="flex flex-row h-[80%] w-[50%] rounded-lg">
              {/* Left side */}
              <div className="w-[50%] h-full flex flex-col mr-2 space-y-2">
                {/* Profile picture frame */}
                <div className="bg-white flex-grow flex flex-col p-4 border-2 border-[#3c5497] rounded-lg">
                  <div className="flex-grow border-2 border-[#3c5497] mb-4">
                    <img 
                      src={userData.public.photo || '/src/assets/placeholderpfp.jpg'} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Points display */}
                  <div className="bg-white">
                    <div className="flex items-center justify-center bg-gray-400 text-black border-2 border-[#3c5497] border-b-0 rounded-t-lg py-2">
                      <span className="font-bold">Points</span>
                    </div>
                    <div className="border-2 border-[#3c5497] rounded-b-lg p-4 text-center text-2xl font-bold">
                      {userData.public.points || 0}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <button
                      onClick={() => navigate("/Accueil/Profil/Edit")}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                      Modifier le profil
                    </button>

                    {isAdmin && (
                      <button
                        onClick={handleAdminVerification}
                        className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors"
                      >
                        Admin Panel
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="bg-white w-[50%] h-full flex flex-col p-6 border-2 border-[#3c5497] rounded-lg">
                <div className="flex flex-col h-full justify-between text-black space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Pseudonyme</label>
                    <p className="p-3 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.pseudonyme}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Âge</label>
                    <p className="p-3 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.age}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
                    <p className="p-3 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.dateNaissance}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Sexe / Genre</label>
                    <p className="p-3 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.sexe}</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <p className="p-3 bg-gray-50 rounded border-2 border-[#3c5497]">{userData.public.email}</p>
                  </div>
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