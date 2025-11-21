import { Link} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Navegación izquierda */}
          <div className="flex items-center gap-8">
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm"
            >
              Menú
            </Link>
            <Link 
              to="/nosotros" 
              className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm"
            >
              Nosotros
            </Link>
          </div>

          {/* Navegación derecha */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* OPCIONES PARA ADMINISTRADOR */}
                {user?.rol === 'ADMINISTRADOR' && (
                  <Link 
                    to="/admin/platos" 
                    className="bg-[#E56767] text-white px-4 py-2 rounded-lg hover:bg-[#d45656] transition font-medium text-sm shadow-sm"
                  >
                    📊 Panel Admin
                  </Link>
                )}

                {/* OPCIONES PARA CLIENTE */}
                {user?.rol === 'CLIENTE' && (
                  <>
                    <Link 
                      to="/favoritos" 
                      className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm flex items-center gap-1"
                    >
                      ❤️ Favoritos
                    </Link>
                    <Link 
                      to="/carrito" 
                      className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm flex items-center gap-1"
                    >
                      🛒 Carrito
                    </Link>
                  </>
                )}

                {/* Opciones comunes para ambos */}
                <Link 
                  to="/cuenta-personal" 
                  className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm flex items-center gap-1"
                >
                  👤 Mi Cuenta
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm flex items-center gap-1"
                >
                  🚪 Cerrar Sesión
                </button>
              </>
            ) : (
              /* Usuario no autenticado */
              <>
                <Link 
                  to="/inicio-sesion" 
                  className="text-gray-700 hover:text-[#E56767] transition font-medium text-sm"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/registro" 
                  className="bg-[#E56767] text-white px-4 py-2 rounded-lg hover:bg-[#d45656] transition font-medium text-sm shadow-sm"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;