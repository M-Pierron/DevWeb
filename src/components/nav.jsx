import { Outlet, Link } from "react-router"
import Logo from "../components/logo.jsx"

function Nav({name}) {
  return (
    <>
        <div className="nav">
            <div className="nav_title">{name}</div>
            <div className="navElements">
                <Link className="navElement" to="/Accueil">Accueil </Link>
                <Link className="navElement" to="/Accueil/Connexion&Inscription">Connexion/Inscription </Link>
                <Link className="navElement" to="/Accueil/Visualisation">Visualisation </Link>
                <Link className="navElement" to="/Accueil/À Propos">À Propos </Link>
                <Logo className="logo_nav"/>
            </div>
        </div>
    </>
  )
}

export default Nav

