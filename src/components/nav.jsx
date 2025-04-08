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
    <nav className="flex items-center justify-between bg-[#3c5497] w-full h-[5vw]">
      <img className="h-full ml-[4vw]" src="/src/assets/logoCYhouse.png" alt="Logo de CY-House."/>
      <div className="flex items-center gap-[4vw] h-full font-bold">
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
      <div className="relative h-[60%] mr-[6vw]" onClick={() => setIsUserProfilDropDownOpened((prev) => !prev)}>
        <label className="size-full">
          <img className="w-full h-full" src="/src/assets/userProfil.svg"/>
        </label>
        {isUserProfilDropDownOpened && <div className="flex flex-col absolute bg-black h-fit w-full">
          <DropDownItem className={"text-white"} itemName={"Profil"}/>
          <span>Test</span>
          <span>Test</span>
          <span>Test</span>
          <span>Test</span>
        </div>}
      </div>
    </nav>
  );
}

export default Nav;