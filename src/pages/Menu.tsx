import PlatosLista from "../components/menu/PlatosLista";
import { Especialidades } from "../data/Especialidades";
import { PlatosListData } from "../data/PlatosListData";
import { RangosPrecio } from "../data/RangosPrecio";
import { TiposPlato } from "../data/TiposPlato";

const Menu = () => {
    return (
        <div>
            <h1 className="text-center text-[50px]">Menú</h1>
            <h2 className="text-center text-[30px] text-[#2C2F24] my-2.5 ">Elige el plato que desees comer</h2>
            <div className="flex flex-row p-4 justify-around">
                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Tipo de plato</span>
                    <br />
                    <select name="" id="" className="bg-[#D9D9D9] text-[#E56767]">
                        {TiposPlato.map((tipo)=>(
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Especialidad</span>
                    <br />
                    <select name="" id="" className="bg-[#D9D9D9] text-[#E56767]">
                        {Especialidades.map((esp)=>(
                            <option key={esp.id}>{esp.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Rango precio</span>
                    <br />
                    <select name="" id="" className="bg-[#D9D9D9] text-[#E56767]">
                        {RangosPrecio.map((rp)=>(
                            <option key={rp.id}>{rp.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className="bg-[#473B3B] text-amber-50 p-3 rounded-2xl">Eliminar filtro</button>
                </div>
            </div>
            <PlatosLista dishes={PlatosListData}></PlatosLista>
        </div>
    )
}
export default Menu;