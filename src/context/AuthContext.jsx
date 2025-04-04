import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte d'authentification
export const AuthContext = createContext(null);

// Hook personnalisé pour accéder facilement au contexte d'authentification
export const useAuth = () => useContext(AuthContext);

// Provider du contexte d'authentification
export const AuthProvider = ({ children }) => {
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = useState(null);
  // État pour suivre si l'utilisateur est connecté
  const [isConnected, setIsConnected] = useState(false);

  // Au chargement initial, vérifier si l'utilisateur est déjà connecté (localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsConnected(true);
    }
  }, []);

  // Fonction pour connecter un utilisateur
  const login = (userData) => {
    // Stocker les données de l'utilisateur connecté
    setUser(userData);
    setIsConnected(true);
    // Sauvegarder dans localStorage pour persister la connexion
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fonction pour inscrire un nouvel utilisateur
  const register = (userData) => {
    // Simulation d'inscription réussie - on connecte directement l'utilisateur
    setUser(userData);
    setIsConnected(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return true; // Indication que l'inscription a réussi
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null);
    setIsConnected(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');  // Supprime aussi le token lors de la déconnexion
  };

  // Valeurs et fonctions exposées par le contexte
  const value = {
    user,
    isConnected,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
