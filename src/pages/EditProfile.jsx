import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from '../assets/avatar1.png';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    public: {
      pseudonyme: '',
      age: '',
      dateNaissance: '',
      sexe: '',
      email: '',
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
    if (!token) {
      navigate("/");
      return;
    }

    // Charger les données du profil
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
          console.warn("Erreur:", data.error);
          navigate("/");
        } else {
          setUserData({
            public: data.public,
            private: data.private,
          });
        }
      })
      .catch((err) => {
        console.error("Erreur:", err);
        navigate("/");
      });
  }, [navigate]);

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

  const handleAgeChange = (e) => {
    let value = e.target.value;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    setUserData({
      ...userData,
      public: {
        ...userData.public,
        age: value
      }
    });
  };

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

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.success) {
        navigate("/Accueil/Profil");
      } else {
        console.error("Erreur lors de la mise à jour:", data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Modifier le Profil</h2>

        {/* Photo de profil */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Photo de Profil</label>
          <div className="flex items-center space-x-4">
            <img src={userData.public.photo} alt="Avatar" className="w-12 h-12 rounded-full" />
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
              className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            min="0"
            max="100"
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            placeholder="JJ/MM/AAAA"
            maxLength="10"
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sexe */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sexe / Genre</label>
          <select
            name="public.sexe"
            value={userData.public.sexe}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="public.email"
            value={userData.public.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Informations Privées */}
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
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enregistrer les modifications
          </button>
          
          <button
            onClick={() => navigate("/Accueil/Profil")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;