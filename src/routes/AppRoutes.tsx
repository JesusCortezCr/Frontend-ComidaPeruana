import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Registro from "../pages/Registro";
import InicioSesion from "../pages/InicioSesion";
import Menu from "../pages/Menu";

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
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default AppRoutes;