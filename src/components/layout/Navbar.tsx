import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir al inicio
  };

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

        {/* Mostrar solo si está autenticado */}
        {isAuthenticated && (
          <>
            <li>
              <Link to="/favoritos" className="text-[#413636] hover:text-[#E56767] transition">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/carrito" className="text-[#413636] hover:text-[#E56767] transition">
                Carrito
              </Link>
            </li>
          </>
        )}

        <li>
          <Link to="/nosotros" className="text-[#413636] hover:text-[#E56767] transition">
            Nosotros
          </Link>
        </li>

        {/* Mostrar solo si NO está autenticado */}
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/registro" className="text-[#413636] hover:text-[#E56767] transition">
                Registro
              </Link>
            </li>
            <li>
              <Link to="/inicio-sesion" className="text-[#413636] hover:text-[#E56767] transition">
                Inicio sesión
              </Link>
            </li>
          </>
        )}

        {/* Mostrar solo si está autenticado */}
        {isAuthenticated && (
          <>
            <li className="text-[#413636] font-medium">
              Hola, {user?.nombre}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-[#413636] hover:text-red-600 transition font-medium"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;