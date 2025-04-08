import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import DropDownItem from "./Dropdown/dropDownItem"

function Nav({ name }) {
  const { isConnected, logout } = useAuth();
  const [isUserProfilDropDownOpened, setIsUserProfilDropDownOpened] = useState(false);
  
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex items-center justify-between bg-[#3c5497] w-full h-[5vw] border-b-black border-b-2">
      <div className="size-full">
      </div>
      <div className="flex justify-center items-center gap-[4vw] size-full font-bold">
        <Link className="hover:scale-125" to="/Accueil">Accueil</Link>
        
        {!isConnected ? (
          <Link className="hover:scale-125" to="/Accueil/Connexion&Inscription">Connexion/Inscription</Link>
        ) : (
          <>
            <Link className="hover:scale-125" to="/Accueil/Profil">Profil</Link>
            <Link className="hover:scale-125" to="/Accueil/Visualisation">Visualisation</Link>
            <Link className="hover:scale-125" to="/" onClick={handleLogout}>Se déconnecter</Link>
          </>
        )}
        
        <Link className="hover:scale-125" to="/Accueil/À Propos">À Propos</Link>
        
      </div>
      <div className="flex size-full justify-end">
        <img className="h-full" src="/src/assets/logoCYhouse.png" alt="Logo de CY-House."/>
      </div>
      
    </nav>
  );
}

export default Nav;