import { useState, useEffect } from 'react';
import type { Plato } from '../types/plato.type';
import { useAuth } from '../context/AuthContext';
import PlatosLista from '../components/menu/PlatosLista';
import PedidoModal from '../components/menu/PedidoModal';

const Favoritos = () => {

    const { isAuthenticated } = useAuth();
    const [favoritos, setFavoritos] = useState<Plato[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalPlato, setModalPlato] = useState<Plato | null>(null);

    // Abrir modal con plato seleccionado
    const openModal = (plato: Plato) => setModalPlato(plato);

    // Cargar favoritos al montar
    useEffect(() => {
        cargarFavoritos();
    }, []);

    const cargarFavoritos = () => {
        try {
            const favs = JSON.parse(localStorage.getItem("favoritos") || "[]") as Plato[];
            setFavoritos(favs);
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const agregarCarrito = (detalle: { idPlato: number; cantidad: number; total: number }) => {
        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
        carrito.push(detalle);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log("🛒 Plato agregado al carrito:", detalle);
    };

    const handleToggleFavorito = (idPlato: number) => {
        const nuevos = favoritos.filter(p => p.idPlato !== idPlato);
        setFavoritos(nuevos);
        localStorage.setItem("favoritos", JSON.stringify(nuevos));
    };

    // Si no está logueado
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center bg-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso denegado</h1>
                    <p className="text-gray-600">Inicia sesión para ver tus favoritos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-center text-4xl font-bold text-gray-800 mb-2">Mis Favoritos</h1>
                <h2 className="text-center text-lg text-gray-600 mb-8">Tu lista de platos guardados</h2>

                {/* Loading */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-[#E56767] rounded-full mx-auto"></div>
                        <p className="text-gray-600 mt-4">Cargando...</p>
                    </div>
                )}

                {!isLoading && favoritos.length === 0 && (
                    <div className="text-center bg-white p-10 rounded-lg shadow">
                        <div className="text-6xl mb-2">❤️</div>
                        <p className="font-semibold text-gray-800 text-lg">No tienes favoritos aún</p>
                        <span className="text-gray-600">Agrega platos desde el menú</span>
                    </div>
                )}

                {/* Lista */}
                {favoritos.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <p className="mb-4 text-gray-600">
                            Mostrando <b className="text-[#E56767]">{favoritos.length}</b> favoritos
                        </p>

                        <PlatosLista 
                            platos={favoritos} 
                            onToggleFavorito={handleToggleFavorito}
                            onPedirPlato={openModal}
                        />
                    </div>
                )}
            </div>

            {/* Modal con carrito */}
            {modalPlato && (
                <PedidoModal 
                    plato={modalPlato} 
                    onClose={() => setModalPlato(null)}
                    onAddCarrito={agregarCarrito}
                />
            )}
        </div>
    );
};

export default Favoritos;
