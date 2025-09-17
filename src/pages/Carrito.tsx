import { useState } from "react";
import { PlatosListData } from "../data/PlatosListData";

const Menu = () => {
  // Estado de productos
  const [productos] = useState(
   PlatosListData.slice(0, 3).map((plato) => ({
      id: plato.id_plato,
      nombre: plato.nombre,
      precio: plato.precio,
      cantidad: 1, 
      imagen: plato.imagen_url, 
    }))
  );

  // Calcular total
  const total = productos.reduce((acc,p) => acc + p.precio *p.cantidad,0);

  return (
  <div className="w-full h-screen bg-gray-50 p-6 md:p-10">

    {/* Contenedor principal responsivo */}
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Carrito de compras */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Carrito de compras
        </h1>

        <div className="space-y-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-8 border rounded-xl p-4 hover:shadow transition"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-lg">{p.nombre}</p>
                <p className="text-sm text-gray-600">Precio: S/ {p.precio}.00</p>
                <p className="text-sm text-gray-600">Cantidad: {p.cantidad}</p>
              </div>
              <p className="font-semibold text-gray-800">
                S/ {p.precio * p.cantidad}.00
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de compra */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Resumen de compra
          </h2>

          <div className="space-y-3">
            {productos.map((p) => (
              <div
                key={p.id}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {p.nombre} x{p.cantidad}
                </span>
                <span>S/ {p.precio * p.cantidad}.00</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>S/ {total}.00</span>
        </div>

        <button className="mt-6 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition">
          Pagar
        </button>
      </div>
    </div>
  </div>
);
};

export default Menu;