import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./logo.jsx";

function Nav({ name }) {
  const { isConnected } = useAuth();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className={`nav-container ${isNavVisible ? '' : 'nav-hidden'}`}>
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
            </>
          )}
          
          <Link className="navElement" to="/Accueil/À Propos">À Propos</Link>
          <Logo className="logo_nav" />
        </div>
      </div>
      <div className="nav-toggle" onClick={toggleNavVisibility}>
        <div className={`nav-arrow ${isNavVisible ? 'arrow-up' : 'arrow-down'}`}>
          {isNavVisible ? '▼' : '▲'}
        </div>
      </div>
    </div>
  );
}

export default Nav;
