import { createBrowserRouter, createRoutesFromElements, Route, Navigate, RouterProvider } from "react-router-dom";
import Start from "./pages/Start";
import Sign from "./pages/Sign";
import Home from "./pages/Home";
import About from "./pages/About";
import UserProfil from "./pages/UserProfil";
import Visualization from "./pages/Visualization";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import './App.css';

// Composant pour les routes protégées
const ProtectedRoute = ({ element }) => {
  const { isConnected } = useAuth();
  return isConnected ? element : <Navigate to="/Accueil/Connexion&Inscription" replace />;
};

// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Start />} />
      <Route path="/Accueil" element={<Home />} />
      <Route path="/Accueil/Connexion&Inscription" element={<Sign />} />
      <Route path="/Accueil/À Propos" element={<About />} />
      <Route 
        path="/Accueil/Profil" 
        element={<ProtectedRoute element={<UserProfil />} />} 
      />
      <Route path="/Accueil/Visualisation" element={<Visualization />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;