import { useNavigate } from 'react-router-dom'; // Removido React
import type { Plato } from '../../types/plato.type';
import { useAuth } from '../../context/AuthContext';

type Props = {
    plato: Plato;
    onToggleFavorito?: (idPlato: number) => void;
    onPedirPlato?: (plato: Plato) => void; // mantenemos
};

const PlatoCard = ({ plato, onToggleFavorito, onPedirPlato }: Props) => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const getRangoPrecioLabel = (rango: string) => {
        switch (rango) {
            case "ECONOMICO": return "Económico";
            case "MEDIO": return "Medio";
            case "PREMIUM": return "Premium";
            default: return rango;
        }
    };

    const getRangoPrecioColor = (rango: string) => {
        switch (rango) {
            case "ECONOMICO": return "bg-green-100 text-green-800";
            case "MEDIO": return "bg-blue-100 text-blue-800";
            case "PREMIUM": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const handleFavoritoClick = () => {
        if (!isAuthenticated) {
            alert('Por favor, inicia sesión para agregar a favoritos');
            navigate('/inicio-sesion');
            return;
        }
        if (onToggleFavorito) onToggleFavorito(plato.idPlato);
    };

    // 🔥 Nuevo handler para pedir
    const handlePedir = () => {
        if (!isAuthenticated) {
            alert("Inicia sesión para realizar un pedido");
            navigate("/inicio-sesion");
            return;
        }
        if (user?.rol === "ADMINISTRADOR") return;

        if (onPedirPlato) onPedirPlato(plato);
        else alert(`🛒 Pedido: ${plato.nombre} - S/ ${plato.precio}`);
    };

    return (
        <div className="w-[375px] rounded-2xl p-2 gap-2 my-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-2 bg-white">

            {/* Imagen con badges */}
            <div className="relative">
                <img
                    src={plato.idPlato === 2? "/public/ceviche.png" : plato.imagenUrl || "/placeholder-food.jpg"}
                    alt={plato.nombre}
                    className="w-full h-48 object-cover rounded-2xl"
                />

                {/* Badge destacado */}
                {plato.esDestacado && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full shadow">
                        ⭐ Destacado
                    </span>
                )}

                {/* Badge rango de precio */}
                <span
                    className={`absolute bottom-2 right-2 text-xs font-semibold px-2 py-1 rounded-full shadow ${getRangoPrecioColor(plato.rangoPrecio)}`}
                >
                    {getRangoPrecioLabel(plato.rangoPrecio)}
                </span>
            </div>

            <h3 className="text-3xl py-1.5 font-semibold text-gray-800">{plato.nombre}</h3>

            <div className="flex gap-2 mb-2 flex-wrap">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{plato.nombreCategoria}</span>
                <span className="text-xs bg-[#E56767]/10 text-[#B23A3A] px-2 py-1 rounded-full">{plato.nombreEspecialidad}</span>
            </div>

            <p className="text-2xl py-1.5 font-bold text-[#B23A3A]">S/ {plato.precio.toFixed(2)}</p>

            {plato.descripcion && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{plato.descripcion}</p>
            )}

            <div className="flex justify-between items-center mb-2 text-sm">
                {plato.disponible ? (
                    <span className="text-green-600 font-medium">✓ Disponible</span>
                ) : (
                    <span className="text-red-600 font-medium">✗ No disponible</span>
                )}

                {plato.tiempoPreparacion && (
                    <span className="text-gray-500">⏱️ {plato.tiempoPreparacion} min</span>
                )}
            </div>

            {/* Botones de acción - SOLO FAVORITOS */}
            <div className="flex flex-row flex-wrap justify-center gap-2">
                {/* Botón de favorito para TODOS los usuarios autenticados */}
                {isAuthenticated && onToggleFavorito && (
                    <button
                        className="w-full p-1.5 rounded-2xl border-1 bg-white hover:bg-[#E56767] transition"
                        onClick={handleFavoritoClick}
                        title={plato.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        {plato.esFavorito ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
                    </button>
                )}

                {/*boton para usuarios no registrados*/}
                {!isAuthenticated && (
                    <button
                        className="w-full p-1.5 rounded-2xl border-1 bg-white hover:bg-[#E56767] transition"
                        onClick={handleFavoritoClick}
                        title="Inicia sesión para agregar a favoritos"
                    >
                        🤍 Inicia sesión para favoritos
                    </button>
                )}

                {/*botton de pedidos*/}
                {user?.rol !== "ADMINISTRADOR" && (
                    <button
                        onClick={handlePedir}
                        className="w-full p-1.5 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition"
                    >
                        🍽 Pedir
                    </button>
                )}

                {user?.rol === 'ADMINISTRADOR' && (
                    <div className="text-center text-sm text-gray-500 py-2 w-full">
                        Modo vista previa - Ve al Panel Admin para gestionar
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlatoCard;
