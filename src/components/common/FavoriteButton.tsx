import type { Dish } from "../../types/dish";
import useFavorites from "../../hooks/useFavorites";

type Props = { dish: Dish };

const FavoriteButton = ({ dish }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <button
      className="w-28 p-1.5 m-2 rounded-2xl border-1 bg-[#ffff] hover:bg-[#E56767]"
      onClick={() => toggleFavorite(dish)}
    >
      {isFavorite(dish.id_plato) ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;
