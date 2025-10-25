// ============================================
// components/ProtectedRoute.tsx
// ============================================

import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";



interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'CLIENTE' | 'ADMINISTRADOR';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, mostrar el componente
  return <>{children}</>;
};