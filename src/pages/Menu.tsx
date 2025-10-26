import { useState } from "react";
import PlatosLista from "../components/menu/PlatosLista";
import { Especialidades } from "../data/Especialidades";
import { PlatosListData } from "../data/PlatosListData";
import { RangosPrecio } from "../data/RangosPrecio";
import { TiposPlato } from "../data/TiposPlato";

const Menu = () => {
    // Estados para los filtros
    const [tipoPlato, setTipoPlato] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [rangoPrecio, setRangoPrecio] = useState("");

    // Filtrado de platos según selección
    const platosFiltrados = PlatosListData.filter((plato) => {
        return (
            (tipoPlato === "" || plato.id_tipo_plato === Number(tipoPlato)) &&
            (especialidad === "" || plato.id_especialidad === Number(especialidad)) &&
            (rangoPrecio === "" || plato.id_rango_precio === Number(rangoPrecio))
        );
    });

    return (
        <div className="opacity-0 translate-y-5 animate-fade-in">
            <h1 className="text-center text-[50px] opacity-0 translate-y-5 animate-fade-in">
                Menú
            </h1>
            <h2 className="text-center text-[30px] text-[#2C2F24] my-2.5 opacity-0 translate-y-5 animate-fade-in delay-100">
                Elige el plato que desees comer
            </h2>

            <div className="flex flex-row p-4 justify-around flex-wrap gap-2 opacity-0 translate-y-5 animate-fade-in delay-200">
                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Tipo de plato</span>
                    <br />
                    <select
                        value={tipoPlato}
                        onChange={(e) => setTipoPlato(e.target.value)}
                        className="bg-[#D9D9D9] text-[#E56767]"
                    >
                        <option value="">Todos</option>
                        {TiposPlato.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Especialidad</span>
                    <br />
                    <select
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        className="bg-[#D9D9D9] text-[#E56767]"
                    >
                        <option value="">Todas</option>
                        {Especialidades.map((esp) => (
                            <option key={esp.id} value={esp.id}>
                                {esp.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="bg-[#E56767] p-3 border-1 w-[175px] text-center text-[#FFFFFF] rounded-2xl">
                    <span>Rango precio</span>
                    <br />
                    <select
                        value={rangoPrecio}
                        onChange={(e) => setRangoPrecio(e.target.value)}
                        className="bg-[#D9D9D9] text-[#E56767]"
                    >
                        <option value="">Todos</option>
                        {RangosPrecio.map((rp) => (
                            <option key={rp.id} value={rp.id}>
                                {rp.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="opacity-0 translate-y-5 animate-fade-in delay-300">
                    <button
                        onClick={() => {
                            setTipoPlato("");
                            setEspecialidad("");
                            setRangoPrecio("");
                        }}
                        className="bg-[#473B3B] text-amber-50 p-3 rounded-2xl hover:bg-amber-800"
                    >
                        Eliminar filtro
                    </button>
                </div>
            </div>

            <div className="opacity-0 translate-y-5 animate-fade-in delay-400">
                <PlatosLista dishes={platosFiltrados}></PlatosLista>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Menu;
