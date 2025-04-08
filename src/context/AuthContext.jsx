import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsConnected(true);
        console.log("🔄 Rechargement user depuis localStorage:", parsedUser);
      } catch (err) {
        console.error("❌ Erreur parsing user:", err);
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => {
    // Vérifier que le niveau est bien défini (admin ou autre)
    const userWithLevel = {
      ...userData,
      level: userData.level || 'user', // par défaut si level non fourni
    };

    setUser(userWithLevel);
    setIsConnected(true);
    localStorage.setItem('user', JSON.stringify(userWithLevel));

    console.log("✅ Utilisateur connecté:", userWithLevel);
  };

  const register = (userData) => {
    const userWithLevel = {
      ...userData,
      level: userData.level || 'user',
    };

    setUser(userWithLevel);
    setIsConnected(true);
    localStorage.setItem('user', JSON.stringify(userWithLevel));
    console.log("📝 Utilisateur inscrit:", userWithLevel);

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsConnected(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log("👋 Déconnexion effectuée");
  };

  const value = {
    user,
    isConnected,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
