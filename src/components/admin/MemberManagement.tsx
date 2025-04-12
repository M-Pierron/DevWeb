import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, UserPlus, Search } from 'lucide-react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const calculateAge = (dateNaissance: string): number | null => {
  if (!dateNaissance) return null;
  
  const birthDate = new Date(dateNaissance);
  if (isNaN(birthDate.getTime())) return null;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  
  if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

interface User {
  _id: string;
  pseudonyme: string;
  email: string;
  level: string;
  userId: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  age: number | null;
}

interface JWTPayload {
  level: string;
  exp: number;
}

const API_URL = 'http://localhost:5000/api/auth';

const MemberManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    pseudonyme: '',
    email: '',
    password: '',
    level: 'user',
    prenom: '',
    nom: '',
    dateNaissance: ''
  });

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return token;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  };

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Non authentifié');
      }
  
      const response = await axiosInstance.get('/users');
      const usersWithAge = response.data.map((user: User) => ({
        ...user,
        age: calculateAge(user.dateNaissance)
      }));
      setUsers(usersWithAge);
      setTotalUsers(usersWithAge.length);
      setError(null);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError('Accès non autorisé. Vous devez être administrateur.');
        } else if (error.response?.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
        } else {
          setError('Erreur lors du chargement des utilisateurs');
        }
      } else {
        setError('Erreur lors du chargement des utilisateurs');
      }
      setUsers([]);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      pseudonyme: '',
      email: '',
      password: '',
      level: 'user',
      prenom: '',
      nom: '',
      dateNaissance: ''
    });
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      pseudonyme: user.pseudonyme,
      email: user.email,
      password: '',
      level: user.level,
      prenom: user.prenom || '',
      nom: user.nom || '',
      dateNaissance: user.dateNaissance ? formatDate(user.dateNaissance) : ''
    });
    setShowModal(true);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dateValue = event.target.value.replace(/\D/g, '');
    if (dateValue.length >= 5) {
      dateValue = dateValue.slice(0, 2) + '/' + dateValue.slice(2, 4) + '/' + dateValue.slice(4, 8);
    } else if (dateValue.length >= 3) {
      dateValue = dateValue.slice(0, 2) + '/' + dateValue.slice(2);
    }
    dateValue = dateValue.slice(0, 10);
    setFormData({ ...formData, dateNaissance: dateValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let formattedDate = formData.dateNaissance;
    const [day, month, year] = formattedDate.split('/');
    formattedDate = `${year}-${month}-${day}`;
  
    const age = calculateAge(formattedDate);
  
    try {
      if (editingUser) {
        await axiosInstance.put(`/users/${editingUser._id}`, {
          pseudonyme: formData.pseudonyme,
          level: formData.level,
          prenom: formData.prenom,
          nom: formData.nom,
          dateNaissance: formattedDate,
          age: age
        });
      } else {
        await axiosInstance.post('/users', {
          pseudonyme: formData.pseudonyme,
          email: formData.email,
          password: formData.password,
          level: formData.level,
          prenom: formData.prenom,
          nom: formData.nom,
          dateNaissance: formattedDate,
          age: age
        });
      }
  
      await fetchUsers();
      setShowModal(false);
      setError(null);
    } catch (error) {
      console.error('Error saving user:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Erreur lors de la sauvegarde');
      } else {
        setError('Erreur lors de la sauvegarde');
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        await fetchUsers();
        setError(null);
      } catch (error) {
        console.error('Error deleting user:', error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || 'Erreur lors de la suppression');
        } else {
          setError('Erreur lors de la suppression');
        }
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.pseudonyme.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Gestion des Membres</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {totalUsers} membres
          </span>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Ajouter un membre
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Âge</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.pseudonyme}</div>
                  <div className="text-sm text-gray-500">{user.prenom} {user.nom}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.age !== null ? String(user.age) : '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.level === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900 mr-4">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              {editingUser ? 'Modifier un membre' : 'Ajouter un membre'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pseudonyme</label>
                <input
                  type="text"
                  value={formData.pseudonyme}
                  onChange={(e) => setFormData({ ...formData, pseudonyme: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Niveau</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                <input
                  type="text"
                  value={formData.dateNaissance}
                  onChange={handleDateChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={10}
                  placeholder="JJ/MM/AAAA"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingUser ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;