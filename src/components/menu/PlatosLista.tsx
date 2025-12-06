// src/components/menu/PlatosLista.tsx

import type { Plato } from "../../types/plato.type";
import PlatoCard from "./PlatoCard";

type Props = {
  platos: Plato[];
  onToggleFavorito?: (idPlato: number) => void;
  onPedirPlato?: (plato: Plato) => void;  // 🆕 Agregar para que permita pedir
};

const PlatosLista = ({ platos, onToggleFavorito, onPedirPlato }: Props) => {
  if (platos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No se encontraron platos
        </h3>
        <p className="text-gray-600">
          Intenta ajustar los filtros para ver más opciones
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-around gap-2 my-10">
      {platos.map((plato) => (
        <PlatoCard
          key={plato.idPlato}
          plato={plato}
          onToggleFavorito={onToggleFavorito}
          onPedirPlato={onPedirPlato} //este pasa la funcion al card
        />
      ))}
    </div>
  );
};

export default PlatosLista;