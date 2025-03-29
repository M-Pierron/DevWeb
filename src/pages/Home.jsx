import Logo from "../components/logo.jsx"
import Nav from "../components/nav.jsx"
import "../App.css"

function Home() {
  return (
    <div className = "home">
        <Logo className="logo_home"/>
        <Nav name={"ACCUEIL"}/>
    </div>
  )
}

export default Home
