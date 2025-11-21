import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import InicioSesion from "../pages/InicioSesion";
import Menu from "../pages/Menu";
import Carrito from "../pages/Carrito";
import Nosotros from "../pages/Nosotros";
import Favoritos from "../pages/Favoritos";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PersonalPage from "../pages/PersonalPage";
import CrearPlatoPage from "../pages/admin/CrearPlatoPage";
import AdminPlatosPage from "../pages/admin/AdminPlatosPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Rutas públicas */}
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="registro" element={<Registro />} />
                    <Route path="inicio-sesion" element={<InicioSesion />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="nosotros" element={<Nosotros />} />

                    {/* Rutas protegidas (requieren login) */}
                    <Route
                        path="carrito"
                        element={
                            <ProtectedRoute requiredRole="CLIENTE">
                                <Carrito />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="favoritos"
                        element={
                            <ProtectedRoute requiredRole="CLIENTE">
                                <Favoritos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="cuenta-personal"
                        element={
                            <ProtectedRoute>
                                <PersonalPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Rutas de administración */}
                    <Route
                        path="admin/platos"
                        element={
                            <ProtectedRoute requiredRole="ADMINISTRADOR">
                                <AdminPlatosPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admin/platos/nuevo"
                        element={
                            <ProtectedRoute requiredRole="ADMINISTRADOR">
                                <CrearPlatoPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="admin/platos/editar/:id"
                        element={
                            <ProtectedRoute requiredRole="ADMINISTRADOR">
                                <div>Página de editar plato (por implementar)</div>
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;