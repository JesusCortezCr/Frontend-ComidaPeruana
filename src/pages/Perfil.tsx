import React, { useState } from "react";
import perfilImg from "../assets/images/perfil.png";

const Perfil: React.FC = () => {
  const [editando, setEditando] = useState(false);
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

  const toggleEditar = () => setEditando(!editando);

  const handleGuardar = () => {
    setEditando(false);
    alert("Cambios guardados (por ahora solo visual)");
  };

  return (
    <div className="min-h-[80vh] bg-[#dad69b2c] flex justify-center items-center px-6 py-12">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-lg grid md:grid-cols-2 gap-10 p-8 md:p-12">
        {/* Seccion de datos*/}
        <div>
          <h1 className="text-3xl font-bold text-[#413636] text-center mb-8">
            Mi Perfil
          </h1>

          <form className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleChange}
                  disabled={!editando}
                  className={`w-full rounded-xl border px-4 py-2.5 transition ${
                    editando
                      ? "border-[#B23A3A] bg-white focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                      : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={handleChange}
                  disabled={!editando}
                  className={`w-full rounded-xl border px-4 py-2.5 transition ${
                    editando
                      ? "border-[#B23A3A] bg-white focus:outline-none focus:ring-2 focus:ring-[#E56767]"
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
              <label className="block text-sm text-gray-600 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={usuario.telefono}
                onChange={handleChange}
                disabled={!editando}
                className={`w-full rounded-xl border px-4 py-2.5 transition ${
                  editando
                    ? "border-[#B23A3A] bg-white focus:outline-none focus:ring-2 focus:ring-[#E56767]"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>
          </form>

          {/*botenes de guardar y editar*/}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={toggleEditar}
              className="rounded-full bg-[#B23A3A] hover:bg-[#9f3535] text-white px-6 py-2 transition"
            >
              {editando ? "Cancelar" : "Editar"}
            </button>

            {editando && (
              <button
                onClick={handleGuardar}
                className="rounded-full bg-green-600 hover:bg-green-500 text-white px-6 py-2 transition"
              >
                Guardar
              </button>
            )}
          </div>
        </div>

        {/*Referecna a nuestra imagen */}
        <div className="flex justify-center items-center">
          <img
            src={perfilImg}
            alt="Imagen decorativa"
            className="rounded-3xl shadow-md w-100 h-120 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
