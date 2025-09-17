import useCart from "../../hooks/useCart";

type Props = {
    dishId: number;
}

const AddToCartButton = ({ dishId }: Props) => {

    const { addToCart } = useCart();
    return (
        <button className="w-28 p-1.5 m-2 rounded-2xl border-1 bg-[#ffff] hover:bg-[#E56767]" onClick={() => addToCart(dishId)}>
            🛒
        </button>
    );
};
export default AddToCartButton;