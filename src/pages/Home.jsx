import Nav from "../components/nav.jsx"
import "../App.css"

function Home() {
  return (
    <div className="flex flex-col w-dvw h-dvh">
      <Nav name={"ACCUEIL"}/>
      
      <div className="flex flex-row size-full bg-[url(src/assets/wallpaperHome.png)] bg-no-repeat bg-center bg-cover h-[80%] p-4">
        <div className="flex flex-col w-full justify-center items-center self-center">
          <img src="src/assets/logoCYHouse.png" className="size-fit mb-4"></img>
          <span className="font-bold text-black text-6xl mb-4">CYHOUSE</span>
        </div>
        <div className="bg-black w-full">
          <div className="bg-red-50 w-[40%] h-[20%]"></div>
        </div>
        
      </div>

      <div className="flex flex-col bg-[#3c5497] w-full h-[20%] border-t-black border-t-2">
        <p className="self-center text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dui dolor. Cras congue sed eros vitae accumsan. Donec porttitor interdum urna, et dignissim velit consectetur sit amet. Aenean at dapibus tellus, blandit scelerisque quam. Curabitur vehicula magna in sapien pellentesque, in cursus augue accumsan. Suspendisse vel elit sit amet elit placerat vehicula. Vivamus sit amet nibh ex. Sed quis tempor risus. Sed maximus sagittis risus in ornare. Sed interdum, nulla id tempus suscipit, velit ipsum scelerisque turpis, vitae tincidunt nisi nunc sed est.</p>
      </div>
    </div>
  )
}

export default Home
