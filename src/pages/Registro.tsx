import React from "react";
import Chef from "../assets/images/chef.png";


const Registro: React.FC = () => {
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

          <form className="space-y-5">
            {/* Nombre + Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                  placeholder="Tus apellidos"
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Correo</label>
              <input
                type="email"
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                placeholder="••••••••••"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full rounded-full bg-[#B23A3A] hover:bg-[#9f3535] text-white py-3 mt-4 transition">
              Registrar
            </button>
          </form>
        </div>

        {/* Imagen */}
        <div className="rounded-3xl overflow-hidden h-110">
          <img src={Chef} alt="Causa peruana" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Registro;
