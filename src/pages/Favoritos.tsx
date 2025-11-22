import React, { useState, useEffect } from 'react';
import type { Plato } from '../types/plato.type';
import { useAuth } from '../context/AuthContext';
import PlatosLista from '../components/menu/PlatosLista';

const Favoritos = () => {
    const { isAuthenticated } = useAuth();
    const [favoritos, setFavoritos] = useState<Plato[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar favoritos al montar el componente
    useEffect(() => {
        cargarFavoritos();
    }, []);

    const cargarFavoritos = () => {
        try {
            // Simular carga de favoritos (más adelante conectarás con tu backend)
            const favs: Plato[] = JSON.parse(localStorage.getItem("favoritos") || "[]");
            setFavoritos(favs);
        } catch (error) {
            console.error("Error al cargar favoritos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleFavorito = (idPlato: number) => {
        // Remover de favoritos
        const nuevosFavoritos = favoritos.filter(plato => plato.idPlato !== idPlato);
        setFavoritos(nuevosFavoritos);
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Acceso Denegado
                    </h1>
                    <p className="text-gray-600">
                        Debes iniciar sesión para ver tus favoritos.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-center text-4xl font-bold text-gray-800 mb-2">
                    Mis Favoritos
                </h1>
                <h2 className="text-center text-xl text-gray-600 mb-8">
                    Tu listado de platos favoritos
                </h2>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#E56767]"></div>
                        <p className="text-gray-600 mt-4">Cargando favoritos...</p>
                    </div>
                ) : favoritos.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <div className="text-6xl mb-4">❤️</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No tienes favoritos aún
                        </h3>
                        <p className="text-gray-600">
                            Agrega platos a tus favoritos desde el menú principal
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Mostrando <span className="font-semibold text-[#E56767]">{favoritos.length}</span>{" "}
                                {favoritos.length === 1 ? "plato favorito" : "platos favoritos"}
                            </p>
                        </div>
                        <PlatosLista 
                            platos={favoritos} 
                            onToggleFavorito={handleToggleFavorito}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favoritos;