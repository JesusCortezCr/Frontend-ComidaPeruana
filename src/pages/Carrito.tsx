import { useState } from "react";
import { PlatosListData } from "../data/PlatosListData";

const Carrito = () => {
  
  const [productos] = useState(
   PlatosListData.slice(0, 5).map((plato) => ({
      id: plato.id_plato,
      nombre: plato.nombre,
      precio: plato.precio,
      cantidad: 5, 
      imagen: plato.imagen_url, 
    }))
  );


  const total = productos.reduce((acc,p) => acc + p.precio *p.cantidad,0);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Responsivo */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Carrito de compras */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Carrito de compras
          </h1>

          <div className="space-y-5">
            {productos.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-3 gap-5 items-center rounded-2xl p-4 shadow-md hover:shadow-lg transition">
              
              {/* Carta más nombre */}
              <div className="flex flex-col items-center">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-60 h-40 object-cover rounded-lg"
                />
                <p className="font-medium text-center mt-2">{p.nombre}</p> 
              </div>

              {/* Precio */}
              <div className="flex flex-col items-center"> Precio
                <p className="text-gray-700">S/ {p.precio}.00</p>
                <p className="text-sm text-gray-500 mt-8">
                  Subtotal: S/{p.precio * p.cantidad}.00
                </p>
              </div>

              {/* Cantidad */}
              <div className="flex flex-col items-center"> Cantidad
                <p className="text-gray-700">{p.cantidad}</p>
              </div>  
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de compra */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col ">
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Resumen de compra
            </h2>
            <div className="space-y-5">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between text-sm text-gray-700">
                  <span>
                    {p.nombre} x{p.cantidad}
                  </span>
                  <span>S/ {p.precio * p.cantidad}.00</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t pt-5 flex justify-between font-bold text-lg text-gray-800">
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

export default Carrito;   // 👈 ahora sí
