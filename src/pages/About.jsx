import "../App.css"
import Nav from "../components/nav.jsx"

function About() {
  return (
    <div>
      <Nav name={"ACCUEIL"}/>
      <div className="about">
        <h1 className="text_about">CY-House, à quoi ça sert ?</h1>
      </div>
    </div>
  )
}

export default About
