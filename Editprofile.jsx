import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pseudonyme: '',
    age: '',
    sexe: '',
    dateNaissance: '',
    photo: '',
    nom: '',
    prenom: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    // Fetch current user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        
        setFormData({
          pseudonyme: data.public.pseudonyme || '',
          age: data.public.age || '',
          sexe: data.public.sexe || '',
          dateNaissance: data.public.dateNaissance || '',
          photo: data.public.photo || '',
          nom: data.private.nom || '',
          prenom: data.private.prenom || ''
        });
        
        if (data.public.photo) {
          setPreviewImage(data.public.photo);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public: {
            pseudonyme: formData.pseudonyme,
            age: formData.age,
            sexe: formData.sexe,
            dateNaissance: formData.dateNaissance,
            photo: formData.photo
          },
          private: {
            nom: formData.nom,
            prenom: formData.prenom
          }
        })
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        const error = await response.json();
        alert(error.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Une erreur est survenue lors de la mise à jour du profil');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au profil
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6">Modifier le profil</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Photo de profil
            </label>
            <div className="flex items-center space-x-4">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-md flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Choisir une image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Pseudonyme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pseudonyme
            </label>
            <input
              type="text"
              name="pseudonyme"
              value={formData.pseudonyme}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="0"
              max="120"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Sexe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexe
            </label>
            <select
              name="sexe"
              value={formData.sexe}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Sélectionnez</option>
              <option value="masculin">Masculin</option>
              <option value="feminin">Féminin</option>
            </select>
          </div>

          {/* Date de naissance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date de naissance
            </label>
            <input
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;