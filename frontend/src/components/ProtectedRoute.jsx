import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem("token");
  const isAdmin = token && JSON.parse(atob(token.split('.')[1])).isAdmin;

  if (!token) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/user" />;

  return children;
}
