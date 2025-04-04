import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from '../assets/avatar1.png';

const UserProfile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [userData, setUserData] = useState({
    public: {
      pseudonyme: '',
      age: '',
      sexe: '',
      dateNaissance: '',
      typeMembre: '',
      photo: avatar1
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
            setUser(data);
            setUserData({
              public: data.public,
              private: data.private,
            });
            setIsChecking(false);
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

  if (isChecking) {
    return <div>Vérification en cours...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Profil Utilisateur</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Informations Publiques</h3>

          <div className="mb-4">
            <img
              src={userData.public.photo || avatar1}
              alt="Photo de profil"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Pseudonyme</p>
              <p className="text-lg">{userData.public.pseudonyme || 'Non défini'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Âge</p>
              <p className="text-lg">{userData.public.age || 'Non défini'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Sexe</p>
              <p className="text-lg">{userData.public.sexe || 'Non défini'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Date de naissance</p>
              <p className="text-lg">{userData.public.dateNaissance || 'Non définie'}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Type de membre</p>
              <p className="text-lg">{userData.public.typeMembre || 'Membre'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Modifier le profil
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsAuthenticated(false);
              navigate("/");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;