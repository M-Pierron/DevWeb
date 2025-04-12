import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Verification = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [userLevel, setUserLevel] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      logout();
      navigate('/');
      return;
    }

    // 🔍 Récupérer les infos utilisateur depuis le profil complet
    const fetchUserLevel = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (data?.public?.level === 'admin') {
          setUserLevel('admin');
          fetchPendingUsers(token); // ✅ On ne fetch les users que si admin
        } else {
          navigate('/Accueil'); // ❌ Pas admin = redirection
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du profil:", err);
        logout();
        navigate('/');
      } finally {
        setIsChecking(false);
      }
    };

    fetchUserLevel();
  }, [navigate, logout]);

  const fetchPendingUsers = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/pending-users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPendingUsers(data);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const handleVerification = async (userId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, action })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchPendingUsers(token);
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  if (isChecking) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Vérification des Utilisateurs</h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/Accueil/Profil")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Retour au Profil
            </button>
            <button
              onClick={() => navigate("/Accueil")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Retour à l'Accueil
            </button>
          </div>
        </div>
        
        {pendingUsers.length === 0 ? (
          <p className="text-gray-600">Aucun utilisateur en attente de vérification</p>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((user) => (
              <div key={user.userId} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Nom complet:</p>
                    <p>{user.prenom} {user.nom}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Pseudonyme:</p>
                    <p>{user.pseudonyme}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleVerification(user.userId, 'accept')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleVerification(user.userId, 'reject')}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verification;
