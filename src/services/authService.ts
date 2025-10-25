import axios, { AxiosError } from "axios";
import type {
  AuthResponse,
  ErrorResponse,
  LoginRequest,
  RegisterRequest,
  ServiceResponse,
  User,
} from "../types/auth.types";

// URL base de tu API backend
const API_URL = "http://localhost:8080/api/auth";

// Claves para localStorage
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

/**
 * REGISTRO - Crear nueva cuenta
 */
export const register = async (
  userData: RegisterRequest
): Promise<ServiceResponse<AuthResponse>> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/register`,
      userData
    );

    // Guardar token y usuario en localStorage
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          idUsuario: response.data.idUsuario,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          rol: response.data.rol,
        })
      );
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message || "Error al registrar usuario",
    };
  }
};

/**
 * LOGIN - Iniciar sesión
 */
export const login = async (
  credentials: LoginRequest
): Promise<ServiceResponse<AuthResponse>> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/login`,
      credentials
    );

    // Guardar token y usuario en localStorage
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          idUsuario: response.data.idUsuario,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          rol: response.data.rol,
        })
      );
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return {
      success: false,
      message:
        axiosError.response?.data?.message || "Email o contraseña incorrectos",
    };
  }
};

/**
 * LOGOUT - Cerrar sesión
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Obtener el token guardado
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Obtener el usuario guardado
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Instancia de axios para peticiones protegidas
 */
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor: agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Si el token expiró o es inválido (401), cerrar sesión
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
