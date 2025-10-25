import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Chef from "../assets/images/chef.png";

const Registro: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validaciones básicas
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      setError("Por favor, completa todos los campos obligatorios");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      // Llamar al servicio de registro
      const result = await register(formData);

      if (result.success) {
        // Registro exitoso - redirigir al menú
        navigate("/menu");
      } else {
        // Mostrar error del servidor
        setError(result.message || "Error al registrar usuario");
      }
    } catch (err) {
      setError("Error inesperado. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] max-w-6xl mx-auto px-6 py-8 md:py-12">
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-serif text-[#413636] text-center mb-8">
        Registro
      </h1>

      {/* Contenido */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Tarjeta formulario */}
        <div className="bg-gray-50 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-gray-600 text-center mb-6">
            Datos Personales
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Mostrar error si existe */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Nombre + Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767] disabled:bg-gray-200 disabled:cursor-not-allowed"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Apellidos *
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767] disabled:bg-gray-200 disabled:cursor-not-allowed"
                  placeholder="Tus apellidos"
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Correo *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767] disabled:bg-gray-200 disabled:cursor-not-allowed"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            {/* Teléfono (opcional) */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Teléfono (opcional)
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767] disabled:bg-gray-200 disabled:cursor-not-allowed"
                placeholder="987654321"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767] disabled:bg-gray-200 disabled:cursor-not-allowed"
                placeholder="••••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#B23A3A] hover:bg-[#9f3535] text-white py-3 mt-4 transition disabled:bg-[#d08080] disabled:cursor-not-allowed"
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-700">
            ¿Ya tienes una cuenta?{" "}
            <a href="/inicio-sesion" className="font-semibold hover:underline">
              Inicia sesión aquí.
            </a>
          </p>
        </div>

        {/* Imagen */}
        <div className="rounded-3xl overflow-hidden h-110">
          <img src={Chef} alt="Chef peruano" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Registro;