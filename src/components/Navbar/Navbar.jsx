import { NavLink } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="nav">
        <ul>
            <li><NavLink to = "/home" >Home</NavLink></li>
            <li><NavLink to = "/about" >About</NavLink></li>
            <li><NavLink to = "/skils" >Skills</NavLink></li>
            <li><NavLink to = "/experience" >Experience</NavLink></li>
            <li><NavLink to = "/projetcs" >Projects</NavLink></li>
            {/* <li><NavLink to = "/notfound" >NotFound</NavLink></li> */}
        </ul>
    </nav>
  )
}

export default Navbar
