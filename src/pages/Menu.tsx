import PlatosLista from "../components/menu/PlatosLista";
import { PlatosListData } from "../data/PlatosListData";

const Menu=()=>{
return(
    <div>
        <h1>Menu</h1>
        <PlatosLista dishes={PlatosListData}></PlatosLista>
    </div>
)
}
export default Menu;