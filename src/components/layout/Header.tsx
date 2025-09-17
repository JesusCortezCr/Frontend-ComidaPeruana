import { Link } from "react-router-dom";
import NavBar from "../layout/Navbar";
import { Phone, Mail, Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* ── Barra superior (oscura) ───────────────────────────── */}
      <div className="bg-[#413636] text-gray-200 text-xs">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* Izquierda: teléfono + email */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (01) 857 - 0107
            </span>
            <a
              href="mailto:gastronomiaperuana@peru.com"
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="w-4 h-4" />
              gastronomiaperuana@peru.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Barra principal (blanca) ──────────────────────────── */}
      <div className="bg-white text-[#413636]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Nombre */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            <span className="text-[#E56767]">Gastronomía</span> Peruana
          </Link>

          {/* Menú (NavBar) */}
          <NavBar />

        </div>
      </div>
    </header>
  );
};

export default Header;
