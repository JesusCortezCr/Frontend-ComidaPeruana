import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout></Layout>}>
                        <Route index element={<Home></Home>}></Route>
                        <Route path="home" element={<Home></Home>}></Route>
                        <Route path="Login" element={<Login></Home>}></Route>
                        <Route path="Registro" element={<Home></Home>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}
export default AppRoutes;