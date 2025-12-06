import { useState } from "react";
import { useCarrito, type ItemCarrito } from "../context/CarritoContext";
import CompraExitosa from "../components/menu/CompraRealizada";

const Carrito = () => {
  const { carrito, setCarrito } = useCarrito();
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [compraDatos, setCompraDatos] = useState<ItemCarrito[]>([]);


  const total = carrito.reduce((acc, p) => acc + p.total, 0);

  const handlePagar = () => {
    if (carrito.length === 0) return;
    setCompraDatos([...carrito]); 
    setCompraConfirmada(true);


    setCarrito([]); // Limpiar carrito tras la compra
  };

  const handleVolverMenu = () => {
    setCompraConfirmada(false);
  };

  if (compraConfirmada) {
    const carritoFormateado = compraDatos.map(item => ({
      idPlato: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      total: item.total
    }));

    const totalCompra = carritoFormateado.reduce((acc, p) => acc + p.total, 0);

    return <CompraExitosa carrito={carritoFormateado} total={totalCompra} onVolverMenu={handleVolverMenu} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {/*Detalle de productos */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Carrito de compras 🛍
          </h1>

          {carrito.length === 0 ? (
            <p className="text-gray-500 text-center py-20">No hay productos aún 🤷‍♂️</p>
          ) : (
            <div className="space-y-5">
              {carrito.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-3 gap-5 items-center rounded-2xl p-4 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center">
                    <img src={p.imagen} alt={p.nombre} className="w-40 h-28 object-cover rounded-lg" />
                    <p className="font-medium text-center mt-2">{p.nombre}</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-medium">Precio</span>
                    <p className="text-gray-700">S/ {p.precio}.00</p>
                    <p className="text-sm text-gray-500 mt-4">
                      Subtotal: <b>S/{p.total}.00</b>
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-medium">Cantidad</span>
                    <p className="text-gray-700 text-lg font-semibold">{p.cantidad}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*resumen*/}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Resumen de compra 🧾
          </h2>

          <div className="space-y-4">
            {carrito.map((p) => (
              <div key={p.id} className="flex justify-between text-sm text-gray-700">
                <span>{p.nombre} x{p.cantidad}</span>
                <span>S/ {p.total}.00</span>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-5 flex justify-between font-bold text-lg text-gray-800">
            <span>Total:</span>
            <span>S/ {total}.00</span>
          </div>

          <button
            onClick={handlePagar}
            disabled={carrito.length === 0}
            className={`mt-6 py-3 rounded-xl text-lg font-semibold transition ${
              carrito.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#E56767] text-white hover:bg-[#c55353]"
            }`}
          >
            Pagar ahora 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
