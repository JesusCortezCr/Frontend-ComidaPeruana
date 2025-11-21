// src/pages/Menu.tsx (ACTUALIZAR)

import { useEffect, useState } from "react";
import PlatosLista from "../components/menu/PlatosLista";
import {
  obtenerPlatosConFiltros,
  obtenerCategorias,
  obtenerEspecialidades,
  obtenerCategoriasPublicas,
  obtenerEspecialidadesPublicas,
  obtenerPlatosPublicos,
} from "../services/platoService";
import { useAuth } from "../context/AuthContext";
import type { Categoria, Especialidad, FiltrosPlatos, Plato } from "../types/plato.type";

const Menu: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Estados para los datos
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Estados para los filtros
  const [filtros, setFiltros] = useState<FiltrosPlatos>({
    idCategoria: null,
    idEspecialidad: null,
    rangoPrecio: "",
  });

  // Cargar categorías y especialidades al montar
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  // Cargar platos cuando cambien los filtros
  useEffect(() => {
    cargarPlatos();
  }, [filtros]);

  const cargarDatosIniciales = async () => {
    try {
      const [categoriasData, especialidadesData] = await Promise.all([
        // Usar servicios públicos si no está autenticado
        isAuthenticated ? obtenerCategorias() : obtenerCategoriasPublicas(),
        isAuthenticated ? obtenerEspecialidades() : obtenerEspecialidadesPublicas()
      ]);
      setCategorias(categoriasData);
      setEspecialidades(especialidadesData);
    } catch (err) {
      console.error("Error al cargar datos iniciales:", err);
      setError("Error al cargar las opciones de filtro");
    }
  };

  const cargarPlatos = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Usar servicio público si no está autenticado
      const data = isAuthenticated
        ? await obtenerPlatosConFiltros(filtros)
        : await obtenerPlatosPublicos(filtros);
      setPlatos(data);
    } catch (err) {
      console.error("Error al cargar platos:", err);
      setError("Error al cargar los platos. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltroChange = (campo: keyof FiltrosPlatos, valor: any) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      idCategoria: null,
      idEspecialidad: null,
      rangoPrecio: "",
    });
  };

  const handleToggleFavorito = async (idPlato: number) => {
    // TODO: Implementar lógica de favoritos
    console.log("Toggle favorito:", idPlato);
  };

  return (
    <div className="opacity-0 translate-y-5 animate-fade-in">
      <h1 className="text-center text-[50px] opacity-0 translate-y-5 animate-fade-in">
        Menú
      </h1>

      {/* Solo mostrar este subtítulo para clientes */}
      {user?.rol === 'CLIENTE' && (
        <h2 className="text-center text-[30px] text-[#2C2F24] my-2.5 opacity-0 translate-y-5 animate-fade-in delay-100">
          Elige el plato que desees comer
        </h2>
      )}

      {/* Mostrar mensaje para admin */}
      {user?.rol === 'ADMINISTRADOR' && (
        <h2 className="text-center text-[20px] text-[#2C2F24] my-2.5 opacity-0 translate-y-5 animate-fade-in delay-100">
          Vista previa del menú - Ve al Panel Admin para gestionar platos
        </h2>
      )}

      {/* Sección de filtros */}
      <div className="flex flex-row p-4 justify-around flex-wrap gap-2 opacity-0 translate-y-5 animate-fade-in delay-200">
        {/* Filtro: Tipo de Plato */}
        <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
          <span>Tipo de plato</span>
          <br />
          <select
            value={filtros.idCategoria || ""}
            onChange={(e) =>
              handleFiltroChange(
                "idCategoria",
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="bg-[#D9D9D9] text-[#E56767] rounded px-2 py-1 mt-1"
          >
            <option value="">Todos</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro: Especialidad */}
        <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
          <span>Especialidad</span>
          <br />
          <select
            value={filtros.idEspecialidad || ""}
            onChange={(e) =>
              handleFiltroChange(
                "idEspecialidad",
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="bg-[#D9D9D9] text-[#E56767] rounded px-2 py-1 mt-1"
          >
            <option value="">Todas</option>
            {especialidades.map((esp) => (
              <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                {esp.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro: Rango de Precio */}
        <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
          <span>Rango precio</span>
          <br />
          <select
            value={filtros.rangoPrecio}
            onChange={(e) => handleFiltroChange("rangoPrecio", e.target.value)}
            className="bg-[#D9D9D9] text-[#E56767] rounded px-2 py-1 mt-1"
          >
            <option value="">Todos</option>
            <option value="ECONOMICO">Económico</option>
            <option value="MEDIO">Medio</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </div>

        {/* Botón limpiar filtros */}
        <div className="opacity-0 translate-y-5 animate-fade-in delay-300">
          <button
            onClick={limpiarFiltros}
            className="bg-[#473B3B] text-amber-50 p-3 rounded-2xl hover:bg-amber-800 transition"
          >
            Eliminar filtro
          </button>
        </div>
      </div>

      {/* Mostrar errores */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#E56767]"></div>
          <p className="text-gray-600 mt-4">Cargando platos...</p>
        </div>
      )}

      {/* Contador de resultados */}
      {!isLoading && platos.length > 0 && (
        <div className="text-center mb-4 opacity-0 translate-y-5 animate-fade-in delay-300">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-[#E56767]">{platos.length}</span>{" "}
            {platos.length === 1 ? "plato" : "platos"}
          </p>
        </div>
      )}

      {/* Lista de platos */}
      {!isLoading && (
        <div className="opacity-0 translate-y-5 animate-fade-in delay-400">
          <PlatosLista
            platos={platos}
            // Solo pasar onToggleFavorito si es cliente
            onToggleFavorito={user?.rol === 'CLIENTE' ? handleToggleFavorito : undefined}
          />
        </div>
      )}

      <br />
      <br />
    </div>
  );
};

export default Menu;