import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes, Navigate, useNavigate, RouterProvider } from "react-router"
import Start from "./pages/Start"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Main from "./components/main"
import Home from "./pages/Home"
import Header from "./pages/Header"
import Visualization from "./pages/Visualization"
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Start />} />
      <Route path="/Accueil" element={<Home />} />
      <Route path="/Accueil/Connexion" element={<SignIn />} />
      <Route path="/Accueil/Inscription" element={<SignUp />} />
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
