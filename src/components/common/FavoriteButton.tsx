import useFavorites from "../../hooks/useFavorites";

type Props = { dishId: number }

const FavoriteButton = ({ dishId }: Props) => {

    const { isFavorite, toogleFavorite } = useFavorites();

    return (
        <button onClick={() => toogleFavorite(dishId)}>
            {isFavorite(dishId) ? "❤️" : "🤍"}
        </button>
    )
}
export default FavoriteButton;
