import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Causa from "../assets/images/causa.jpg";

const InicioSesion: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      setIsLoading(false);
      return;
    }

    try {
      // Llamar al servicio de login
      const result = await login({ email, password });

      if (result.success) {
        // Login exitoso - redirigir al menú
        navigate("/menu");
      } else {
        // Mostrar error del servidor
        setError(result.message || "Error al iniciar sesión");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Error inesperado. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:py-16 flex flex-col items-center">
      {/* Título fuera del recuadro */}
      <h1 className="text-4xl md:text-5xl font-serif text-[#413636] text-center mb-10">
        Inicio de Sesión
      </h1>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Formulario */}
        <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mostrar error si existe */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-400 focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="****************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-400 focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Iniciando sesión..." : "Continuar"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-700">
            ¿No tienes una cuenta?{" "}
            <a href="/registro" className="font-semibold hover:underline">
              Regístrate aquí.
            </a>
          </p>
        </div>

        {/* Imagen */}
        <div className="rounded-3xl overflow-hidden h-72 md:h-96">
          <img
            src={Causa}
            alt="Causa con camarones"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;