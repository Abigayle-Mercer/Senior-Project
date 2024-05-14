import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuth/useAuth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
