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
        <>
            <h1 className="text-center">Mi Cuenta</h1>
            <hr />
            <h2>!Bienvenido {isAuthenticated && (<><span>{user?.nombre}</span> </>)} </h2>
            <span>Nombre completo :  {`${user?.nombre} , ${user?.apellido}`} </span>

            <div className="p-2 border-2 w-[850px] m-5">
                <h3>Editar Informacion personal</h3>
                {/* Formulario para actualizar informacion personal */}
                <form onSubmit={enviarActualizacionDatos}>
                    <label htmlFor="">Nombres: </label>
                    <input type="text" name="nombre" value={formActualizarData.nombre} onChange={asignarValoresFormulario} className="border-1" />
                    <label htmlFor="">Apellidos: </label>
                    <input type="text" name="apellido" value={formActualizarData.apellido} className="border-1" onChange={asignarValoresFormulario} />
                    <label htmlFor="">Mi correo: </label>
                    <input type="email" value={user?.email} disabled className="border-1" />
                    <button type="submit" className="bg-blue-600 hover:bg-red-600">{isLoading ? "Actualizando..." : "Actualizar"}</button>
                </form>
            </div>
            <div className="p-2 border-2 w-[850px] m-5">
                <h3>Editar Contraseña</h3>
                <form onSubmit={enviarPasswordActualizacionData}>
                    <label htmlFor="">Contraseña actual:</label>
                    <input
                        type="password"
                        name="passwordActual"  // ✅ Debe tener este name
                        value={formPasswordData.passwordActual}
                        onChange={asignarValoresPassword}
                        className="border-1"
                        required
                    />
                    <label htmlFor="">Escriba su nueva contraseña</label>
                    <input
                        type="password"
                        name="passwordNuevo"  // ✅ Debe tener este name
                        value={formPasswordData.passwordNuevo}
                        onChange={asignarValoresPassword}
                        className="border-1"
                        required
                        minLength={6}
                    />
                    <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-red-600">{isLoading ? "Cambiando..." : "Cambiar contraseña"}</button>
                </form>
            </div>
        </>
    )
}

export default PersonalPage;