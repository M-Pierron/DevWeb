import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider
} from 'react-router-dom';

import './App.css';
import Start from './pages/Start';
import Sign from './pages/Sign';
import Home from './pages/Home';
import About from './pages/About';
import Visualization from './pages/Visualization';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import Verification from './pages/Verification';
import GestionDashboard from './pages/gestionDashboard';
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { isConnected, user } = useAuth();
  
  if (!isConnected) {
    return <Navigate to="/Accueil/Connexion&Inscription" replace />;
  }
  
  if (adminOnly && (!user || user.level !== 'admin')) {
    return <Navigate to="/Accueil" replace />;
  }
  
  return element;
};

function useCheckAuth() {
  const { login, logout, isConnected } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      if (!token) {
        logout();
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        const data = await res.json();
        console.log("✅ Réponse verifyToken :", data);

        if (data.valid && data.user) {
          if (!isConnected) {
            console.log("🧠 Login triggered");
            login(data.user);
          }
        } else {
          console.log("❌ Token invalide, logout");
          logout();
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("💥 Erreur vérif token :", err);
        logout();
        localStorage.removeItem("token");
      } finally {
        console.log("✅ Auth check terminé");
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [login, logout, isConnected]);

  return isLoading;
}

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
        <Route path="/Accueil/Gestion" element={<ProtectedRoute element={<GestionDashboard />} />} />
        <Route path="/Accueil/Profil/Edit" element={<ProtectedRoute element={<EditProfile />} />} />
        <Route path="/Accueil/Verification" element={<ProtectedRoute element={<Verification />} adminOnly={true} />} />
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
