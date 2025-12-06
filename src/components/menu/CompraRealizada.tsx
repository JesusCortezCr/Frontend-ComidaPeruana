
import React from "react";

type Props = {
  carrito: { idPlato: number; nombre: string; cantidad: number; total: number }[];
  total: number;
  onVolverMenu: () => void;
};

const CompraExitosa: React.FC<Props> = ({ carrito, total, onVolverMenu }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-fade-in">
        <div className="text-6xl mb-4 text-green-500">✅</div>
        <h2 className="text-2xl font-bold mb-2">¡Compra completada!</h2>
        <p className="text-gray-600 mb-6">Gracias por tu pedido. Aquí está tu resumen:</p>

        <div className="text-left mb-6">
          {carrito.map((item) => (
            <div
              key={item.idPlato}
              className="flex justify-between py-2 border-b border-gray-200"
            >
              <span>{item.nombre} x{item.cantidad}</span>
              <span>S/ {item.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3 mb-6">
          <span>Total:</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={onVolverMenu}
          className="bg-[#E56767] text-white px-6 py-3 rounded-full hover:bg-red-600 transition"
        >
          Volver al menú..
        </button>
      </div>
    </div>
  );
};

export default CompraExitosa;
