import { useState } from "react";
import { useCarrito } from "../../context/CarritoContext";

interface PedidoModalProps {
    plato: { idPlato: number; nombre: string; precio: number; imagen?: string; descripcion?: string; };
    onClose: () => void;
    onAddCarrito: (detalle: { idPlato: number; cantidad: number; total: number }) => void;
}

const PedidoModal = ({ plato, onClose }: PedidoModalProps) => {
    const [cantidad, setCantidad] = useState(1);

    //incorporamos el contexto del carrito sus campos
    const { agregarCarrito } = useCarrito();

    const handleAdd = () => {
        agregarCarrito({
            id: plato.idPlato,
            nombre: plato.nombre,
            precio: plato.precio,
            imagen: plato.imagen,
            cantidad,
            total: cantidad * plato.precio
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

            <div className="bg-white rounded-2xl shadow-xl p-7 w-[90%] max-w-md animate-[fadeIn_.3s_ease]">
                
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    🛍 Pedir {plato.nombre}
                </h2>

                {plato.imagen && (
                    <img src={plato.imagen} className="w-full h-40 object-cover rounded-xl mt-4" />
                )}

                <p className="text-gray-600 mt-2">{plato.descripcion}</p>

                <p className="text-xl font-semibold text-[#E56767] mt-4">
                    S/ {plato.precio.toFixed(2)}
                </p>

                <div className="flex justify-between items-center mt-5">
                    <span className="font-medium text-gray-700">Cantidad</span>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setCantidad(c => Math.max(1, c-1))}
                            className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 font-bold"
                        >−</button>
                        
                        <span className="text-lg font-bold">{cantidad}</span>

                        <button 
                            onClick={() => setCantidad(c => c+1)}
                            className="px-3 py-1 bg-[#E56767] text-white rounded-full hover:bg-[#c55353] font-bold"
                        >+</button>
                    </div>
                </div>

                <p className="mt-4 text-lg font-semibold text-gray-800 text-right">
                    Total: <span className="text-[#E56767]">S/ {(cantidad*plato.precio).toFixed(2)}</span>
                </p>

                <div className="mt-7 flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
                    >Cancelar</button>

                    <button 
                        onClick={handleAdd}
                        className="flex-1 bg-[#E56767] hover:bg-[#c55353] text-white font-bold py-2 rounded-lg"
                    >Agregar al carrito</button>
                </div>

            </div>
        </div>
    );
};

export default PedidoModal;
