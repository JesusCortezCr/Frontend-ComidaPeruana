import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-[#413636] hover:text-[#E56767] transition">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/menu" className="text-[#413636] hover:text-[#E56767] transition">
            Menú
          </Link>
        </li>
        <li>
          <Link to="/favoritos" className="text-[#413636] hover:text-[#E56767] transition">
            Favoritos
          </Link>
        </li>
        <li>
          <Link to="/nosotros" className="text-[#413636] hover:text-[#E56767] transition">
            Nosotros
          </Link>
        </li>
        <li>
          <Link to="/carrito" className="text-[#413636] hover:text-[#E56767] transition">
            Carrito
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
