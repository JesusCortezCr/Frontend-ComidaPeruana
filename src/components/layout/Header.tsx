import { useState } from "react";
import { Search, Menu } from "lucide-react";

const Header = () => {
  const [active, setActive] = useState("Inicio");

  const navItems = ["Inicio", "Menú", "Favoritos", "Nosotros", "Carrito"];

  return (
    <header className="w-full">
      {/* Barra superior marron */}
      <div className="bg-[#3B2E2E] text-white text-sm flex justify-between items-center px-6 py-2">
        <div className="flex space-x-6">
          <span>📞 (01) 456 - 0107</span>
          <span>✉️ gastronomia-peruana@hotmail.com</span>
        </div>
        <div className="flex space-x-4">
          <a href="#"><img src="/public/facebook.png" className="w-4 h-4" /></a>
          <a href="#"><img src="/public/instagram.png" className="w-4 h-4" /></a>
        </div>
      </div>

      {/* Barra de navegación */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        {/* Menú centrado */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  active === item
                    ? "bg-[#3B2E2E] text-white"
                    : "text-gray-800 hover:bg-[#3B2E2E] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Buscador + menú hamburguesa */}
        <div className="flex space-x-4 items-center">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#3B2E2E]" />
          <Menu className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#3B2E2E]" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
