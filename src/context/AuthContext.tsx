// ============================================
// PASO 3: AuthContext
// Archivo: src/context/AuthContext.tsx
// ============================================


import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LoginRequest, RegisterRequest, User } from "../types/auth.types";
import { 
  login as loginService, 
  register as registerService, 
  logout as logoutService,
  getCurrentUser 
} from "../services/authService";

/**
 * Tipo del contexto de autenticación
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterRequest) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

/**
 * Context de autenticación
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props del Provider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Cargar usuario al iniciar la app
   */
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Función de login
   */
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginService(credentials);

      if (response.success && response.data) {
        // Extraer solo los datos del usuario (sin el token)
        const userData: User = {
          idUsuario: response.data.idUsuario,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          rol: response.data.rol
        };
        
        setUser(userData);
        return { success: true };
      }

      return {
        success: false,
        message: response.message || 'Error al iniciar sesión'
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Error inesperado al iniciar sesión'
      };
    }
  };

  /**
   * Función de registro
   */
  const register = async (userData: RegisterRequest) => {
    try {
      const response = await registerService(userData);

      if (response.success && response.data) {
        // Extraer solo los datos del usuario
        const newUser: User = {
          idUsuario: response.data.idUsuario,
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          email: response.data.email,
          rol: response.data.rol
        };
        
        setUser(newUser);
        return { success: true };
      }

      return {
        success: false,
        message: response.message || 'Error al registrar usuario'
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Error inesperado al registrar usuario'
      };
    }
  };

  /**
   * Función de logout
   */
  const logout = () => {
    logoutService();
    setUser(null);
  };

  /**
   * Valor del contexto
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  // Mostrar loading mientras carga el usuario
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook personalizado para usar el contexto
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth  = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};