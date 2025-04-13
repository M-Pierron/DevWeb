import Nav from "../components/nav.jsx"
import Logo from "../components/logo"
import { ArrowDown } from 'lucide-react';
import "../App.css"

function Home() {
  return (
    <>
      <Nav name={"ACCUEIL"}/>
      <div className="home">
        <div className="flex flex-col w-full h-full min-h-screen">
          
          <div className="flex flex-col relative bg-[url(src/assets/wallpaperHome.png)] bg-no-repeat bg-center bg-cover h-screen p-4">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <div className="relative flex flex-col items-center">
                <Logo className="logo_home" />
                <h1 className="font-bold text-white text-4xl md:text-5xl mt-4 text-center">CYHOUSE</h1>
                <div className="arrows mt-16">
                  <ArrowDown className="text-white mx-80" size={80} />
                  <ArrowDown className="text-white mx-80" size={80} />
                </div>
                <h3 className="text-white text-xl mt-8 animate-pulse">Descendez pour plus d'informations.</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-[#3c5497] w-full p-4 text-white">
            <div className="self-center text-center max-w-4xl"> 
              <p className="mb-2">Bienvenue sur CY-House !!! Pour plus d'informations concernant le site web, nous vous invitons à consulter la partie "À Propos" présente dans la barre de navigation en haut de la page.</p> 
              <p className="mb-2">Si vous rencontrez quelconques problèmes durant votre utilisation de CY-House, contactez notre assistant au 06 95 80 07 46.</p>
              <p className="mb-2">Bonne continuation sur CY-House !!!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

