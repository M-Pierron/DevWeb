import React, { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Sign from './pages/Sign';
import Home from './pages/Home';
import About from './pages/About';
import Visualization from './pages/Visualization';
import UserProfile from './pages/UserProfile';
import { AuthProvider, useAuth } from "./context/AuthContext";

// 🔒 Composant pour les routes protégées
const ProtectedRoute = ({ element }) => {
  const { isConnected } = useAuth();
  console.log("🔐 [ProtectedRoute] isConnected =", isConnected);
  return isConnected ? element : <Navigate to="/Accueil/Connexion&Inscription" replace />;
};

// 🔐 Vérifie le token et connecte l’utilisateur dans le contexte
const useCheckAuth = () => {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/api/auth/verifyToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }
          });
          const data = await res.json();
          console.log("Réponse verifyToken :", data);

          if (data.valid && data.user) {
            login(data.user); // ⬅ login du contexte
          } else {
            logout();
            localStorage.removeItem("token");
          }
        } catch (err) {
          console.error("Erreur vérif token :", err);
          logout();
        } finally {
          setIsLoading(false);
        }
      } else {
        logout();
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [login, logout]);

  return isLoading;
};

function AppRoutes() {
  const isLoading = useCheckAuth();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Start />} />
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Accueil/Connexion&Inscription" element={<Sign />} />
        <Route path="/Accueil/À Propos" element={<About />} />
        <Route path="/Accueil/Visualisation" element={<Visualization />} />
        <Route path="/Accueil/Profil" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
