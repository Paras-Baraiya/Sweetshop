import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-pink-600">
          🍬 SweetMart
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/dashboard" className="hover:text-pink-600">
            Sweets
          </Link>

          <Link to="/orders" className="hover:text-pink-600">
            Orders
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
