import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes, Navigate, useNavigate, RouterProvider } from "react-router"
import Start from "./pages/Start"
import Sign from "./pages/Sign"
import Home from "./pages/Home"
import About from "./pages/About"
import Visualization from "./pages/Visualization"
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Start />} />
      <Route path="/Accueil" element={<Home />} />
      <Route path="/Accueil/Connexion&Inscription" element={<Sign />} />
      <Route path="/Accueil/À Propos" element={<About />} />
      <Route path="/Accueil/Visualisation" element={<Visualization />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>

  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}


export default App
