import React, { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { api } from "../services/authService";

export const PersonalPage = () => {
    const [error, setError] = useState<string>("");
    const { user, isAuthenticated, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>("");
    const [formActualizarData, setFormActualizarData] = useState({
        nombre: user?.nombre || "",
        apellido: user?.apellido || ""
    })
    const [formPasswordData, setFormPasswordData] = useState({
        passwordActual: "",
        passwordNuevo: ""
    })

    const asignarValoresFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormActualizarData({
            ...formActualizarData,
            [e.target.name]: e.target.value
        });
    }
    const asignarValoresPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormPasswordData({
            ...formPasswordData,
            [e.target.name]: e.target.value
        })
    }

    async function enviarActualizacionDatos(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const { data } = await api.put(`/usuarios/${user?.idUsuario}`, formActualizarData);
            //actualizar el contexto con los nuevos datos
            updateUser({
                nombre: formActualizarData.nombre,
                apellido: formActualizarData.apellido
            });
            setMensaje("Datos actualizados correctamente");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMensaje("Error al actualizar datos " + error.response);
            }
        } finally {
            setIsLoading(false);
        }
    }

    async function enviarPasswordActualizacionData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setMensaje("");
        setIsLoading(true);
        console.log("Datos a enviar:", formPasswordData);
        console.log("URL:", `/usuarios/${user?.idUsuario}/cambiar-contrasenia`);
        try {
            const { data } = await api.put(`/usuarios/${user?.idUsuario}/cambiar-contrasenia`, formPasswordData);
            setMensaje("Contraseña actualizada correctamente");
            setFormPasswordData({
                passwordActual: "",
                passwordNuevo: ""
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error completo:", error.response);
                setError(error.response?.data?.message || error.response?.data || "Error al cambiar contraseña");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h1 className="text-3xl font-bold text-center mb-2">Mi Cuenta</h1>
            <p className="text-center text-gray-600 mb-6">
                ¡Bienvenido <span className="font-semibold">{user?.nombre}</span>!
            </p>

            <div className="mb-8">
                <span className="text-gray-700 text-lg">
                    Nombre completo:{" "}
                    <strong>{user?.nombre} {user?.apellido}</strong>
                </span>
            </div>

            {/* Mensajes globales */}
            {mensaje && (
                <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">
                    {mensaje}
                </p>
            )}
            {error && (
                <p className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
                    {error}
                </p>
            )}

            {/* Sección de datos personales */}
            <div className="p-6 border border-gray-200 rounded-lg mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Editar información personal</h3>

                <form onSubmit={enviarActualizacionDatos} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nombres</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formActualizarData.nombre}
                            onChange={asignarValoresFormulario}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Apellidos</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formActualizarData.apellido}
                            onChange={asignarValoresFormulario}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Correo</label>
                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        {isLoading ? "Guardando..." : "Actualizar datos"}
                    </button>
                </form>
            </div>

            {/* Sección de cambiar contraseña */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cambiar contraseña</h3>

                <form onSubmit={enviarPasswordActualizacionData} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña actual</label>
                        <input
                            type="password"
                            name="passwordActual"
                            value={formPasswordData.passwordActual}
                            onChange={asignarValoresPassword}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nueva contraseña</label>
                        <input
                            type="password"
                            name="passwordNuevo"
                            value={formPasswordData.passwordNuevo}
                            onChange={asignarValoresPassword}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
                    >
                        {isLoading ? "Guardando..." : "Actualizar contraseña"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PersonalPage;