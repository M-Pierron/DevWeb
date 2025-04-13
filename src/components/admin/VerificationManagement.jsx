import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';
import { admin } from '../../api';

const VerificationManagement = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await admin.getPendingUsers();
      setPendingUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching pending users:', err);
      setError('Erreur lors de la récupération des utilisateurs en attente');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (userId, action) => {
    try {
      setLoading(true);
      await API.post('/verify-user', { userId, action });
      await fetchPendingUsers();
      setError(null);
    } catch (err) {
      console.error('Error verifying user:', err);
      setError('Erreur lors de la vérification de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  if (loading && pendingUsers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Vérification des Utilisateurs</h2>
        </div>
        {pendingUsers.length > 0 && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            {pendingUsers.length} en attente
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {pendingUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun utilisateur en attente de vérification
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pendingUsers.map((user) => (
            <div key={user.userId} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium text-black">{user.prenom} {user.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pseudonyme</p>
                  <p className="font-medium text-black">{user.pseudonyme}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-black">{user.email}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => handleVerification(user.userId, 'accept')}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Accepter
                </button>
                <button
                  onClick={() => handleVerification(user.userId, 'reject')}
                  disabled={loading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationManagement;