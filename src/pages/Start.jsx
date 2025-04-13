import { useState, useRef, useEffect } from 'react';
import Logo from "../components/logo.jsx";
import { useNavigate } from 'react-router';
import "../App.css";

function Start({ setIsAuthenticated }) {
  const [animating, setAnimating] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // -- Supprime le token du localStorage lorsque le composant est monté --
    localStorage.removeItem("token");
    if (setIsAuthenticated) {
      setIsAuthenticated(false); 
    }
  }, [setIsAuthenticated]);

  const handleClick = (e) => {
    if (!animating) {
      const rect = menuRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setClickPosition({ x, y });
      setAnimating(true);

      setTimeout(() => {
        navigate("/Accueil");
      }, 1000);
    }
  };

  return (
    <>
      <div
        ref={menuRef}
        className={`start_menu ${animating ? 'fading' : ''}`}
        onClick={handleClick}
      >
        <Logo className="logo_start" />
        <div className="content">
          <h1 className="start_title">BIENVENUE SUR CY-HOUSE !</h1>
          <h3 className="sub_start">Cliquer pour continuer.</h3>
        </div>
        {animating && (
          <div
            className="shockwave"
            style={{
              left: clickPosition.x,
              top: clickPosition.y
            }}
          ></div>
        )}
      </div>
    </>
  );
}

export default Start;
