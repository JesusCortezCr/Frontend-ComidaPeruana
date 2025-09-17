import { useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const isFavorite = (dishId: number) => favorites.includes(dishId);

  const toogleFavorite = (dishId: number) => {
    setFavorites((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  return { favorites, isFavorite, toogleFavorite };
};
export default useFavorites;
