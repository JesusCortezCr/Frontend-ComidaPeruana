import type { Dish } from "../../types/dish";
import AddToCartButton from "../common/AddToCartButton";
import FavoriteButton from "../common/FavoriteButton";

type Props={
    dish:Dish;
}

const PlatoCard=({dish}:Props)=>{
    return(
        <>
        <div className="w-[375px] rounded-2xl p-4 gap-2 my-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-2">
            <img src={dish.imagen_url} alt={dish.nombre} className="w-full h-[200px] object-cover rounded-lg" />
            <h3 className="text-3xl py-1.5">{dish.nombre}</h3>
            <p className="text-2xl py-1.5">S/{dish.precio}</p>
            <div className="flex flex-row flex-wrap justify-center">
                <FavoriteButton dishId={dish.id_plato}></FavoriteButton>
                <AddToCartButton dishId={dish.id_plato}></AddToCartButton>
            </div>
        </div>
        </>
    )

}
export default PlatoCard;