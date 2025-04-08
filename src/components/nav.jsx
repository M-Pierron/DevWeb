import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.jsx";
import { useAuth } from "../context/AuthContext";

function Nav({ name }) {
  const { isConnected, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="nav">
      <div className="nav_title">{name}</div>
      <div className="navElements">
        <Link className="navElement" to="/Accueil">Accueil</Link>
        
        {!isConnected ? (
          <Link className="navElement" to="/Accueil/Connexion&Inscription">Connexion/Inscription</Link>
        ) : (
          <>
            <Link className="navElement" to="/Accueil/Profil">Profil</Link>
            <Link className="navElement" to="/Accueil/Visualisation">Visualisation</Link>
            <Link className="navElement" to="/" onClick={handleLogout}>Se déconnecter</Link>
          </>
        )}
        
        <Link className="navElement" to="/Accueil/À Propos">À Propos</Link>
        <Logo className="logo_nav" />
      </div>
    </div>
  );
}

export default Nav;