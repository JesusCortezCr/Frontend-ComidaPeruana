import useCart from "../../hooks/useCart";

type Props = {
    dishId: number;
}

const AddToCartButton = ({ dishId }: Props) => {

    const { addToCart } = useCart();
    return (
        <button onClick={() => addToCart(dishId)}>
            🛒
        </button>
    );
};
export default AddToCartButton;