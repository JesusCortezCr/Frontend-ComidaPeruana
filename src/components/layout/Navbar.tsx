import { Link } from "react-router";

const NavBar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/"></Link></li>
                    <li><Link to="/carrito"></Link></li>
                </ul>
            </nav>
        </>
    )

}
export default NavBar;