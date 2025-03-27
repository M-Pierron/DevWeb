import { Outlet, Link } from "react-router";

const nav = () => {
  return (
    <>
        <div className="flex items-center justify-between p-10 lg:flex-row bg-indigo-700">
            <div>CyHouse</div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/visualization">Vizualization</Link>
            </div>
        </div>
    </>
  )
}

export default nav