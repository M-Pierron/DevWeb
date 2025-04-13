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
      points: 0 // <- On part sur un nombre
    },
    private: {
      nom: '',
      prenom: ''
    }
  });
  
  const navigate = useNavigate();

  const getUserLevel = (points) => {
    if (points >= 100) return "Expert";
    if (points >= 60) return "Avancé";
    if (points >= 30) return "Intermédiaire";
    return "Débutant";
  };

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
          console.log("✅ Profile data received:", data); 
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
    console.log("📊 Points actuels:", userData.public.points);
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
      <div className="profil mt-20">
        <div className="flex flex-col h-screen">
          <div className="flex flex-col grow items-center justify-center">
            <div className="flex flex-row h-[80%] w-[50%] rounded-lg">
              {/* Left side */}
              <div className="w-[50%] h-full flex flex-col mr-2 space-y-2">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 
                  dark:border-gray-600 flex-grow flex flex-col p-4 rounded-lg">
                  <div className="flex-grow border border-gray-200 
                  dark:border-gray-600 mb-4">
                    <img 
                      src={userData.public.photo || '/src/assets/placeholderpfp.jpg'} 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Level display */}
                  <div className="">
                    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-700 
                  border border-gray-200 dark:border-gray-600  text-black border-b-0 rounded-t-lg py-2">
                      <span className="font-bold ">Niveau</span>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-600 rounded-b-lg p-4 text-center">
                      <div className="text-2xl font-bold">
                        {getUserLevel(Number(userData.public.points))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {Number(userData.public.points)} Points
                      </div>
                    </div>
                  </div>

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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 
                  dark:border-gray-600 w-[50%] h-full flex flex-col p-6 rounded-lg">
                {/*  */}
                <div className="flex flex-col h-full justify-between text-black dark:text-white">
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Pseudonyme</label>
                    <p className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 ">{userData.public.pseudonyme}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Âge</label>
                    <p className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">{userData.public.age}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Date de naissance</label>
                    <p className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">{userData.public.dateNaissance}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Sexe / Genre</label>
                    <p className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">{userData.public.sexe}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-900 dark:text-white">Email</label>
                    <p className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600">{userData.public.email}</p>
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
