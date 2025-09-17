import { useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (dishId: number) => {
    setCart((prev) => (prev.includes(dishId) ? prev : [...prev, dishId]));
  };

  const removeFromCart = (dishId: number) => {
    setCart((prev) => prev.filter((id) => id !== dishId));
  };

  const isInCart = (dishId: number) => cart.includes(dishId);

  return { cart, addToCart, removeFromCart, isInCart };
};

export default useCart;
