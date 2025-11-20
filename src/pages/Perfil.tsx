import React, { useState } from "react";
import perfilImg from "../assets/images/perfil.png";

const Perfil: React.FC = () => {
  const [editando, setEditando] = useState(false);

  // Datos de ejemplo (más adelante se conectarán al backend)
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = () => {
    setEditando(false);
    alert("Cambios guardados (solo visual)");
  };

  const handleCancelar = () => {
    setEditando(false);
    alert("Cambios cancelados");
  };

  return (
    <div className="w-full min-h-screen bg-[#dad69b2c] p-6 md:p-15">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-9 md:p-16">

        {/* Título animado */}
        <h1 className="text-3xl font-bold text-center text-[#413636] mb-10 opacity-0 translate-y-5 animate-fade-in">
          Mi Perfil
        </h1>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 opacity-0 translate-y-5 animate-fade-in delay-200">

          {/* Sección izquierda: formulario */}
          <div className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                  disabled={!editando}
                  className={`w-full rounded-xl border px-4 py-2.5 transition-all duration-300 ${editando
                    ? "border-[#B23A3A] bg-white focus:ring-2 focus:ring-[#E56767]"
                    : "border-gray-200 bg-gray-100"
                    }`}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={handleChange}
                  disabled={!editando}
                  className={`w-full rounded-xl border px-4 py-2.5 transition-all duration-300 ${editando
                    ? "border-[#B23A3A] bg-white focus:ring-2 focus:ring-[#E56767]"
                    : "border-gray-200 bg-gray-100"
                    }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Correo</label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                disabled
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full rounded-xl border px-4 py-2.5 transition-all duration-300 ${editando
                  ? "border-[#B23A3A] bg-white focus:ring-2 focus:ring-[#E56767]"
                  : "border-gray-200 bg-gray-100"
                  }`}
              />
            </div>

            <div className="flex justify-center gap-5 mt-10">
              {!editando ? (
                <button
                  onClick={() => setEditando(true)}
                  className="rounded-full bg-[#B23A3A] hover:bg-[#9f3535] text-white px-8 py-2 transition-all duration-300 hover:scale-105"
                >
                  Editar
                </button>
              ) : (
                <>
                  <button
                    onClick={handleGuardar}
                    className="rounded-full bg-green-600 hover:bg-green-500 text-white px-8 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancelar}
                    className="rounded-full bg-gray-500 hover:bg-gray-400 text-white px-8 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center opacity-0 translate-y-5 animate-fade-in delay-400">
            <img
              src={perfilImg}
              alt="Imagen decorativa"
              className="rounded-3xl shadow-xl w-80 h-96 object-cover border-4 border-white transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        <p className="text-center text-gray-600 mt-12 opacity-0 translate-y-5 animate-fade-in delay-600">
          En <span className="font-semibold">SoftEat</span> valoramos tu autenticidad.
          Mantén un perfil actualizado para seguir disfrutando de una mejor experiencia gastronomica.
        </p>
      </div>
    </div>
  );
};

export default Perfil;
