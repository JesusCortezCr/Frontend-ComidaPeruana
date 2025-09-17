import { Link } from "react-router";

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                </ul>
            </nav>
        </>
    )

}
export default NavBar;