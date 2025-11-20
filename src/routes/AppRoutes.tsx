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
                            <ProtectedRoute>
                                <Carrito />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="favoritos"
                        element={
                            <ProtectedRoute>
                                <Favoritos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="cuenta-personal"
                        element={<ProtectedRoute><PersonalPage /></ProtectedRoute>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;