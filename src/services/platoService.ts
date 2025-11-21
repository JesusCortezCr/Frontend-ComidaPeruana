// src/services/platoService.ts

import axios from "axios";
import type { Categoria, CrearPlatoRequest, Especialidad, FiltrosPlatos, Plato } from "../types/plato.type";
import { api } from "./authService";

/**
 * Obtener platos con filtros
 */
export const obtenerPlatosConFiltros = async (
  filtros: FiltrosPlatos
): Promise<Plato[]> => {
  const params = new URLSearchParams();

  if (filtros.idCategoria) {
    params.append("idCategoria", filtros.idCategoria.toString());
  }
  if (filtros.idEspecialidad) {
    params.append("idEspecialidad", filtros.idEspecialidad.toString());
  }
  if (filtros.rangoPrecio) {
    params.append("rangoPrecio", filtros.rangoPrecio);
  }

  const response = await api.get<Plato[]>(`/platos?${params.toString()}`);
  return response.data;
};

/**
 * Obtener categorías (Tipos de Plato)
 */
export const obtenerCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get<Categoria[]>("/platos/categorias");
  return response.data;
};

/**
 * Obtener especialidades
 */
export const obtenerEspecialidades = async (): Promise<Especialidad[]> => {
  const response = await api.get<Especialidad[]>("/platos/especialidades");
  return response.data;
};

/**
 * Obtener platos destacados
 */
export const obtenerPlatosDestacados = async (): Promise<Plato[]> => {
  const response = await api.get<Plato[]>("/platos/destacados");
  return response.data;
};

export const crearPlato = async (platoData: CrearPlatoRequest): Promise<Plato> => {
  const response = await api.post<Plato>("/admin/platos", platoData);
  return response.data;
};



const publicApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

/**
 * Obtener platos públicos (sin autenticación)
 */
export const obtenerPlatosPublicos = async (filtros: FiltrosPlatos): Promise<Plato[]> => {
  const params = new URLSearchParams();

  if (filtros.idCategoria) {
    params.append("idCategoria", filtros.idCategoria.toString());
  }
  if (filtros.idEspecialidad) {
    params.append("idEspecialidad", filtros.idEspecialidad.toString());
  }
  if (filtros.rangoPrecio) {
    params.append("rangoPrecio", filtros.rangoPrecio);
  }

  const response = await publicApi.get<Plato[]>(`/platos?${params.toString()}`);
  return response.data;
};

/**
 * Obtener categorías públicas
 */
export const obtenerCategoriasPublicas = async (): Promise<Categoria[]> => {
  const response = await publicApi.get<Categoria[]>("/platos/categorias");
  return response.data;
};

/**
 * Obtener especialidades públicas
 */
export const obtenerEspecialidadesPublicas = async (): Promise<Especialidad[]> => {
  const response = await publicApi.get<Especialidad[]>("/platos/especialidades");
  return response.data;
};
export const subirImagen = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ fileUrl: string }>('/admin/platos/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.fileUrl;
};