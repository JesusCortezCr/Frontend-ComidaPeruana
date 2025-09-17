import { Outlet } from "react-router";
import Header from "./Header";
{/*import NavBar from "./Navbar";>*/}
import Footer from "./Footer";

const Layout=()=>{
    return(
        <div>
            <header>
            <Header></Header>
            {/*<NavBar></NavBar> >*/}
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )

}
export default Layout;