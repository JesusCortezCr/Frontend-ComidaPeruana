import type { Dish } from "../../types/dish";
import AddToCartButton from "../common/AddToCartButton";
import FavoriteButton from "../common/FavoriteButton";

type Props={
    dish:Dish;
}

const PlatoCard=({dish}:Props)=>{
    return(
        <>
        <div>
            <img src={dish.imagen_url} alt={dish.nombre} />
            <h3>{dish.nombre}</h3>
            <p>S/{dish.precio}</p>
            <div>
                <FavoriteButton dishId={dish.id_plato}></FavoriteButton>
                <AddToCartButton dishId={dish.id_plato}></AddToCartButton>
            </div>
        </div>
        </>
    )

}
export default PlatoCard;