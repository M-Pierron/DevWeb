import Nav from "../components/nav.jsx"
import "../App.css"

function Home() {
  return (
    <div className="flex flex-col w-dvw h-dvh">
      <Nav name={"ACCUEIL"}/>
      <div className="flex flex-row size-full bg-[url(src/assets/wallpaperHome.png)] bg-no-repeat bg-center bg-cover">
        <div className="flex flex-col w-full justify-center items-center self-center">
          <img src="src/assets/logoCYHouse.png" className="size-fit"></img>
          <span className="font-bold text-black text-xl">CYHOUSE</span>
          <div className="flex flex-row bg-blue-500 size-fit rounded-full p-4 cursor-pointer">
            <span>Aller au Dashboard</span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="bg-red h-[30%]"></div>
    </div>
  )
}

export default Home
