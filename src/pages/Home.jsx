import Nav from "../components/nav.jsx"
import Logo from "../components/logo"
import { ArrowDown } from 'lucide-react';
import "../App.css"

function Home() {
  return (
    <>
    <Nav name={"ACCUEIL"}/>
    <div className="home">
    <div className="flex flex-col w-dvw h-dvh">
      
      
      <div className="flex flex-row size-full bg-[url(src/assets/wallpaperHome.png)] bg-no-repeat bg-center bg-cover h-[85%] p-4">
        <div className="flex flex-col w-full justify-center items-center self-center">
          <Logo className="logo_home"/>
          <span className="font-bold text-white text-6xl mt-65 absolute">CYHOUSE</span>
            <div className = "arrows">
              <ArrowDown className="ml-250 mt-145 absolute" size={80}/>
              <ArrowDown className="mr-250 mt-145 absolute" size={80} />
            </div>
            <h3 className="sub_home">Descendez pour plus d'informations.</h3>
          
        </div>
       
        
      </div>

      <div className="flex flex-col bg-[#3c5497] w-full h-[15%] ">
        <div className="self-center text-center ml-10 mr-10 mt-5"> 
          <p>Bienvenue sur CY-House !!! Pour plus d'informations concernant le site web, nous vous invitons à consultet la partie "À Propos" présente dans la barre de navigation en haut de la page. </p> 
          <p>Si vous rencontrez quelquonques problèmes durant votre utilisation de CY-House, contactez notre assistant au 06 95 80 07 46. </p>
          <p>Bonne continuations sur CY-House !!!</p>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Home

