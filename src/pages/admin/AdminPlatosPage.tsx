// src/pages/admin/AdminPlatosPage.tsx (CREAR)

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import {
  obtenerTodosPlatosAdmin,
  eliminarPlato,
} from "../../services/adminPlatoService";
import { obtenerCategorias, obtenerEspecialidades } from "../../services/platoService";
import { useNavigate } from "react-router-dom";
import type { Categoria, Especialidad, Plato } from "../../types/plato.type";

const AdminPlatosPage: React.FC = () => {
  const navigate = useNavigate();
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Filtros
  const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setIsLoading(true);
    try {
      const [platosData, categoriasData, especialidadesData] = await Promise.all([
        obtenerTodosPlatosAdmin(),
        obtenerCategorias(),
        obtenerEspecialidades(),
      ]);
      setPlatos(platosData);
      setCategorias(categoriasData);
      setEspecialidades(especialidadesData);
    } catch (err) {
      setError("Error al cargar los datos");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminar = async (id: number, nombre: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el plato "${nombre}"?`)) {
      try {
        await eliminarPlato(id);
        setPlatos(platos.filter((p) => p.idPlato !== id));
        alert("Plato eliminado correctamente");
      } catch (err) {
        alert("Error al eliminar el plato");
        console.error(err);
      }
    }
  };

  // Filtrar platos
  const platosFiltrados = platos.filter((plato) => {
    const cumpleBusqueda = plato.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const cumpleCategoria =
      filtroCategoria === null || plato.idCategoria === filtroCategoria;
    const cumpleEspecialidad =
      filtroEspecialidad === null || plato.idEspecialidad === filtroEspecialidad;

    return cumpleBusqueda && cumpleCategoria && cumpleEspecialidad;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Gestión de Platos
            </h1>
            <p className="text-gray-600 mt-2">
              Administra el menú de tu restaurante
            </p>
          </div>
          // En AdminPlatosPage.tsx - el botón ya existe, solo verifica que funcione
          <button
            onClick={() => navigate("/admin/platos/nuevo")}
            className="bg-[#B23A3A] hover:bg-[#9f3535] text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Nuevo Plato
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por nombre
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre del plato..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
              />
            </div>

            {/* Filtro categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={filtroCategoria || ""}
                onChange={(e) =>
                  setFiltroCategoria(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
              >
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro especialidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialidad
              </label>
              <select
                value={filtroEspecialidad || ""}
                onChange={(e) =>
                  setFiltroEspecialidad(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
              >
                <option value="">Todas</option>
                {especialidades.map((esp) => (
                  <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#B23A3A]"></div>
            <p className="text-gray-600 mt-4">Cargando platos...</p>
          </div>
        )}

        {/* Tabla de platos */}
        {!isLoading && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Imagen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Especialidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {platosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No se encontraron platos
                      </td>
                    </tr>
                  ) : (
                    platosFiltrados.map((plato) => (
                      <tr key={plato.idPlato} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img
                            src={plato.imagenUrl || "/placeholder-food.jpg"}
                            alt={plato.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">
                              {plato.nombre}
                            </span>
                            {plato.esDestacado && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                ⭐ Destacado
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {plato.nombreCategoria}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {plato.nombreEspecialidad}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          S/ {plato.precio.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {plato.disponible ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Disponible
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              No disponible
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => navigate(`/admin/platos/${plato.idPlato}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Ver detalles"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/admin/platos/editar/${plato.idPlato}`)
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleEliminar(plato.idPlato, plato.nombre)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contador */}
        {!isLoading && platosFiltrados.length > 0 && (
          <div className="mt-4 text-center text-gray-600">
            Mostrando {platosFiltrados.length} de {platos.length} platos
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPlatosPage;