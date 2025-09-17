import React from "react";
import Causa from "../assets/images/causa.jpg";

const InicioSesion: React.FC = () => {
  return (
    <div className="px-4 py-10 md:py-16 flex flex-col items-center">

      {/* Título fuera del recuadro */}
      <h1 className="text-4xl md:text-5xl font-serif text-[#413636] text-center mb-10">
        Inicio de Sesión
      </h1>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Formulario */}
        <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                placeholder="Ingresa un usuario"
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="****************"
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition"
            >
              Continuar
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
