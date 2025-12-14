import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/admin" element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } />

  <Route path="/user" element={
    <ProtectedRoute role="user">
      <UserDashboard />
    </ProtectedRoute>
  } />
  <Route path="/cart" element={
  <ProtectedRoute role="user">
    <Cart />
  </ProtectedRoute>
} />
<Route path="/orders" element={
  <ProtectedRoute role="user">
    <Orders />
  </ProtectedRoute>
} />


</Routes>

    </BrowserRouter>
  );
}
