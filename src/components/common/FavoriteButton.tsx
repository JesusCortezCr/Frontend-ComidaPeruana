import useFavorites from "../../hooks/useFavorites";

type Props = { dishId: number }

const FavoriteButton = ({ dishId }: Props) => {

    const { isFavorite, toogleFavorite } = useFavorites();

    return (
        <button className="w-28 p-1.5 m-2 rounded-2xl border-1 bg-[#ffff] hover:bg-[#E56767]" onClick={() => toogleFavorite(dishId)}>
            {isFavorite(dishId) ? "❤️" : "🤍"}
        </button>
    )
}
export default FavoriteButton;
