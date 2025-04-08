import React, { useState, useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Sign from './pages/Sign';
import Home from './pages/Home';
import About from './pages/About';
import Visualization from './pages/Visualization';
import UserProfile from './pages/UserProfile';
<<<<<<< Updated upstream

const checkAuth = (setIsAuthenticated, setIsLoading) => {
  const token = localStorage.getItem('token');
  console.log("Token actuel :", token);

  if (token) {
    fetch("http://localhost:5000/api/auth/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Envoi du token avec le préfixe "Bearer"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Réponse de verifyToken :", data);
        if (data.valid) {
          setIsAuthenticated(true); // Si le token est valide, authentifier l'utilisateur
        } else {
          setIsAuthenticated(false); // Token invalide, désauthentifie l'utilisateur
          localStorage.removeItem('token'); // Supprimer le token invalide
        }
      })
      .catch(err => {
        console.error("Erreur vérification token :", err);
        setIsAuthenticated(false); // En cas d'erreur, on considère l'utilisateur comme non authentifié
      })
      .finally(() => {
        setIsLoading(false); // Une fois la vérification terminée, on arrête de charger
      });
  } else {
    setIsAuthenticated(false); // Aucun token, utilisateur non authentifié
    setIsLoading(false); // Fin du chargement
=======
import EditProfile from './pages/EditProfile';
import Verification from './pages/Verification';
import GestionDashboard from './pages/gestionDashboard';
import AdminPanel from "./pages/AdminPanel";
import { AuthProvider, useAuth } from "./context/AuthContext";


const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { isConnected, user } = useAuth();
  
  if (!isConnected) {
    return <Navigate to="/Accueil/Connexion&Inscription" replace />;
>>>>>>> Stashed changes
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement initial

  useEffect(() => {
    checkAuth(setIsAuthenticated, setIsLoading); // Appelle la fonction de vérification du token
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>; // Chargement initial pendant la vérification du token
  }

  // Définir les routes avec redirection pour les utilisateurs non authentifiés
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Start />} />
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Accueil/Connexion&Inscription" element={<Sign setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Accueil/À Propos" element={<About />} />
        <Route path="/Accueil/Visualisation" element={<Visualization />} />
<<<<<<< Updated upstream
        {/* Route protégée pour le profil */}
        <Route
          path="/profile"
          element={isAuthenticated ? <UserProfile setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/Accueil/Connexion&Inscription" />}
        />
        {/* Redirection pour les pages non définies */}
=======
        <Route path="/Accueil/Profil" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/Accueil/Gestion" element={<ProtectedRoute element={<GestionDashboard />} />} />
        <Route path="/Accueil/Profil/Edit" element={<ProtectedRoute element={<EditProfile />} />} />
        <Route path="/Accueil/Admin" element={<AdminPanel />} />
>>>>>>> Stashed changes
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )
  );

  return <RouterProvider router={router} />; // Utilisez RouterProvider ici
}

export default App;
