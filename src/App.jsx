import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Main from "./components/main"
import Home from "./pages/Home"
import Header from "./pages/Header"
import Visualization from "./pages/Visualization"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="visualization" element={<Visualization />} />
    </Route>
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
