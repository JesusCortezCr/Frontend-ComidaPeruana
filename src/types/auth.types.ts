/**
 * Datos para el registro
 */
export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
}

/**
 * Datos para el login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Respuesta de autenticación (login/register)
 */
export interface AuthResponse {
  token: string;
  tipo: string;
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: "CLIENTE" | "ADMINISTRADOR";
}

/**
 * Usuario actual (guardado en el contexto)
 */
export interface User {
  idUsuario: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: "CLIENTE" | "ADMINISTRADOR";
}

/**
 * Respuesta de error de la API
 */
export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

/**
 * Respuesta genérica del servicio
 */
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
