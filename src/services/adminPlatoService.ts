import type { CrearPlatoRequest, Plato } from "../types/plato.type";
import { api } from "./authService";

export const obtenerTodosPlatosAdmin = async (): Promise<Plato[]> => {
  const response = await api.get<Plato[]>("/admin/platos");
  return response.data;
};

/**
 * Obtener un plato por ID
 */
export const obtenerPlatoPorId = async (id: number): Promise<Plato> => {
  const response = await api.get<Plato>(`/admin/platos/${id}`);
  return response.data;
};

/**
 * Crear un nuevo plato
 */
export const crearPlato = async (plato: CrearPlatoRequest): Promise<Plato> => {
  const response = await api.post<Plato>("/admin/platos", plato);
  return response.data;
};

/**
 * Actualizar un plato existente
 */
export const actualizarPlato = async (
  id: number,
  plato: CrearPlatoRequest
): Promise<Plato> => {
  const response = await api.put<Plato>(`/admin/platos/${id}`, plato);
  return response.data;
};

/**
 * Eliminar un plato
 */
export const eliminarPlato = async (id: number): Promise<void> => {
  await api.delete(`/admin/platos/${id}`);
};
