import { useState, useEffect } from "react";
import type { Dish } from "../types/dish";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Dish[]>([]);

  useEffect(() => {
    const favs: Dish[] = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavorites(favs);
  }, []);

  const isFavorite = (dishId: number) => {
    return favorites.some((p) => p.id_plato === dishId);
  };

  const toggleFavorite = (dish: Dish) => {
    let nuevosFavoritos: Dish[];
    if (isFavorite(dish.id_plato)) {
      nuevosFavoritos = favorites.filter((p) => p.id_plato !== dish.id_plato);
    } else {
      nuevosFavoritos = [...favorites, dish];
    }
    setFavorites(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return { favorites, isFavorite, toggleFavorite };
};

export default useFavorites;
