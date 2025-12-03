// src/types/plato.types.ts (CREAR O ACTUALIZAR)

// ✅ Mantén tu tipo Dish si lo usas en otros lados, pero agrega el nuevo
export interface Dish {
  id_plato: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  disponible: boolean;
  es_destacado: boolean;
  tiempo_preparacion: number;
  rango_precio: "ECONOMICO" | "MEDIO" | "PREMIUM";
  id_categoria: number;
  nombre_categoria: string;
  id_especialidad: number;
  nombre_especialidad: string;
  es_favorito: boolean;
}

// ✅ O usa el nuevo formato (recomendado para coincidir con backend)
export interface Plato {
  idPlato: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  disponible: boolean;
  esDestacado: boolean;
  tiempoPreparacion: number;
  rangoPrecio: "ECONOMICO" | "MEDIO" | "PREMIUM";
  idCategoria: number;
  nombreCategoria: string;
  idEspecialidad: number;
  nombreEspecialidad: string;
  esFavorito: boolean;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
}

export interface Especialidad {
  idEspecialidad: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
}

export interface FiltrosPlatos {
  idCategoria: number | null;
  idEspecialidad: number | null;
  rangoPrecio: string;
}

// ✅ Función helper para convertir entre formatos si usas ambos
export const convertirPlatoADish = (plato: Plato): Dish => ({
  id_plato: plato.idPlato,
  nombre: plato.nombre,
  descripcion: plato.descripcion,
  precio: plato.precio,
  imagenUrl: plato.imagenUrl,
  disponible: plato.disponible,
  es_destacado: plato.esDestacado,
  tiempo_preparacion: plato.tiempoPreparacion,
  rango_precio: plato.rangoPrecio,
  id_categoria: plato.idCategoria,
  nombre_categoria: plato.nombreCategoria,
  id_especialidad: plato.idEspecialidad,
  nombre_especialidad: plato.nombreEspecialidad,
  es_favorito: plato.esFavorito,
});

// src/types/plato.types.ts (AGREGAR)

// En src/types/plato.type.ts - actualiza la interfaz
export interface CrearPlatoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  idCategoria: number;
  idEspecialidad: number;
  imagenUrl: string;
  disponible: boolean;
  esDestacado: boolean;
  tiempoPreparacion: number;
  rangoPrecio: "ECONOMICO" | "MEDIO" | "PREMIUM";
}