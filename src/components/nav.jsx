import { Outlet, Link } from "react-router"

function Nav({name}) {
  return (
    <>
        <div className="nav">
            <div className="nav_title">{name}</div>
            <div className="navElements">
                <Link className="navElement" to="/">Accueil </Link>
                <Link className="navElement" to="/Accueil/Connexion">Connexion </Link>
                <Link className="navElement" to="/Accueil/Inscription">Inscription </Link>
                <Link className="navElement" to="/Accueil/Visualisation">Visualisation </Link>
                <Link className="navElement" to="/Accueil/À Propos">À Propos </Link>
            </div>
        </div>
    </>
  )
}

export default Nav
