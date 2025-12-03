import React, { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { api } from "../services/authService";

export const PersonalPage = () => {
    const [error, setError] = useState<string>("");
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>("");

    const [formActualizarData, setFormActualizarData] = useState({
        nombre: user?.nombre || "",
        apellido: user?.apellido || ""
    });

    const [formPasswordData, setFormPasswordData] = useState({
        passwordActual: "",
        passwordNuevo: ""
    });

    const asignarValoresFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormActualizarData({
            ...formActualizarData,
            [e.target.name]: e.target.value
        });
    };

    const asignarValoresPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormPasswordData({
            ...formPasswordData,
            [e.target.name]: e.target.value
        });
    };

    async function enviarActualizacionDatos(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await api.put(`/usuarios/${user?.idUsuario}`, formActualizarData);

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

        try {
            await api.put(`/usuarios/${user?.idUsuario}/cambiar-contrasenia`, formPasswordData);
            setMensaje("Contraseña actualizada correctamente");
            setFormPasswordData({ passwordActual: "", passwordNuevo: "" });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Error al cambiar contraseña");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h1 className="text-4xl font-extrabold text-center mb-2 text-[#E56767]">
                Mi Cuenta
            </h1>

            <p className="text-center text-gray-600 mb-6">
                Bienvenido <span className="font-semibold">{user?.nombre}</span>
            </p>

            <div className="mb-8 text-center text-gray-700">
                <strong className="text-lg">
                    {user?.nombre} {user?.apellido}
                </strong>
            </div>

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

            {/* DATOS PERSONALES */}
            <div className="p-6 border border-gray-200 rounded-xl mb-8 shadow-sm bg-gray-50">
                <h3 className="text-xl font-bold text-[#E56767] mb-4">
                    Editar información personal
                </h3>

                <form onSubmit={enviarActualizacionDatos} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nombres</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formActualizarData.nombre}
                            onChange={asignarValoresFormulario}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#E56767]/40"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Apellidos</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formActualizarData.apellido}
                            onChange={asignarValoresFormulario}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#E56767]/40"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Correo</label>
                        <input
                            type="email"
                            value={user?.email}
                            disabled
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-lg text-white font-semibold bg-[#E56767] hover:bg-[#c95555] transition"
                    >
                        {isLoading ? "Guardando..." : "Actualizar datos"}
                    </button>
                </form>
            </div>

            {/* CAMBIAR CONTRASEÑA */}
            <div className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-xl font-bold text-[#E56767] mb-4">
                    Cambiar contraseña
                </h3>

                <form onSubmit={enviarPasswordActualizacionData} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña actual</label>
                        <input
                            type="password"
                            name="passwordActual"
                            value={formPasswordData.passwordActual}
                            onChange={asignarValoresPassword}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#E56767]/40"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Nueva contraseña</label>
                        <input
                            type="password"
                            name="passwordNuevo"
                            value={formPasswordData.passwordNuevo}
                            onChange={asignarValoresPassword}
                            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-[#E56767]/40"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 rounded-lg text-white font-semibold bg-[#E56767] hover:bg-[#c95555] transition"
                    >
                        {isLoading ? "Guardando..." : "Actualizar contraseña"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PersonalPage;
