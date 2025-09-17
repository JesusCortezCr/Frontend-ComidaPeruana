import type { Dish } from "../../types/dish";
import PlatoCard from "./PlatoCard";

type Props={dishes:Dish[]};

const PlatosLista=({dishes}:Props)=>{

    return(
        <div>
            {dishes.map((dish)=>(
                <PlatoCard key={dish.id_plato} dish={dish}></PlatoCard>
            ))}
        </div>
    )
}
export default PlatosLista;