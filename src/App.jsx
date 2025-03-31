import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Auth from './Auth'; 
import Profile from './Profile'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement initial

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    console.log("Token actuel :", token);

    if (token) {
      fetch("http://localhost:5000/auth/verifyToken", {
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
            setIsAuthenticated(true); // Si le token est valide, on authentifie l'utilisateur
          } else {
            setIsAuthenticated(false); // Si le token est invalide, on met l'état à false
            localStorage.removeItem('token'); // On supprime le token invalide
          }
        })
        .catch(err => {
          console.error("Erreur vérification token :", err);
          setIsAuthenticated(false); // En cas d'erreur, on considère l'utilisateur comme non authentifié
        })
        .finally(() => {
          setIsLoading(false); // Lorsque la vérification est terminée, on arrête de charger
        });
    } else {
      setIsAuthenticated(false); // Si aucun token, utilisateur non authentifié
      setIsLoading(false); // Fin du chargement
    }
  };

  useEffect(() => {
    checkAuth(); // On vérifie l'authentification une seule fois au démarrage
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois lors du montage du composant

  if (isLoading) {
    return <div>Chargement...</div>; // Chargement initial pendant que la vérification du token se fait
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={isAuthenticated ? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
