import { createContext, useContext, useState } from "react";

export type ItemCarrito = {
  id: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
  total: number;
};

type CarritoContextType = {
  carrito: ItemCarrito[];
  agregarCarrito: (item: ItemCarrito) => void;
  limpiarCarrito: () => void;
  eliminarItem: (id: number) => void;
  setCarrito: React.Dispatch<React.SetStateAction<ItemCarrito[]>>;
};

const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarCarrito: () => {},
  limpiarCarrito: () => {},
  eliminarItem: () => {},
  setCarrito: () => {},
});

export const CarritoProvider = ({ children }: { children: React.ReactNode }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarCarrito = (item: ItemCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === item.id);

      if (existe) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                cantidad: p.cantidad + item.cantidad,
                total: (p.cantidad + item.cantidad) * p.precio,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const eliminarItem = (id: number) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const limpiarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarCarrito, eliminarItem, limpiarCarrito, setCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCarrito = () => useContext(CarritoContext);
