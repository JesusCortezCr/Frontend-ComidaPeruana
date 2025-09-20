import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import InicioSesion from "../pages/InicioSesion";
import Menu from "../pages/Menu";
import Carrito from "../pages/Carrito";
import Nosotros from "../pages/Nosotros";
import Favoritos from "../pages/Favoritos";

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout></Layout>}>
                        <Route index element={<Home></Home>}></Route>
                        <Route path="home" element={<Home></Home>}></Route>
                        <Route path="registro" element={<Registro></Registro>}></Route>
                        <Route path="inicio-sesion" element={<InicioSesion></InicioSesion>}></Route>
                        <Route path="menu" element={<Menu></Menu>}></Route>
                        <Route path="carrito" element={<Carrito></Carrito>}></Route>
                        <Route path="nosotros" element={<Nosotros></Nosotros>}></Route>
                        <Route path="favoritos" element={<Favoritos></Favoritos>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default AppRoutes;