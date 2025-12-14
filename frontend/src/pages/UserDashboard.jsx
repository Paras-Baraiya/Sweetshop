import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const { cart, addToCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/sweets").then(res => {
      const withQty = res.data.map(s => ({ ...s, qty: 0 }));
      setSweets(withQty);
    });
  }, []);

  const updateQty = (id, value) => {
    setSweets(prev =>
      prev.map(s =>
        s._id === id ? { ...s, qty: Math.max(0, value) } : s
      )
    );
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    await api.post("/orders", {
      items: cart.map(item => ({
        sweetId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      totalAmount: cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      )
    });

    clearCart();
    navigate("/orders");
  };

  const filtered = sweets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6 relative">
      {/* ✅ GO TO CART BUTTON */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed top-6 right-6 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-pink-700 transition z-50"
      >
        🛒 Go to Cart ({cart.length})
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Our Fresh Sweets 🍩
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search sweets..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6 w-full md:w-1/3 px-4 py-2 border rounded-full shadow-sm focus:outline-none"
      />

      {/* Sweet Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(sweet => (
          <div
            key={sweet._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <div className="h-36 bg-pink-100 rounded mb-3 flex items-center justify-center text-5xl">
            <h2 className="font-bold text-lg">{sweet.name}</h2>
            </div>

            {/* <h2 className="font-bold text-lg">{sweet.name}</h2> */}
            <p className="text-gray-600">₹{sweet.price} / kg</p>
            <p className="text-sm text-gray-500">Stock: {sweet.stock}</p>

            {sweet.stock > 0 && (
              <>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => updateQty(sweet._id, sweet.qty - 1)}
                    className="px-3 py-1 border rounded-full text-lg"
                  >
                    −
                  </button>
                  <span className="font-semibold">{sweet.qty}</span>
                  <button
                    onClick={() => updateQty(sweet._id, sweet.qty + 1)}
                    className="px-3 py-1 border rounded-full text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => sweet.qty > 0 && addToCart(sweet)}
                  className="mt-4 bg-pink-600 text-white py-2 rounded-full hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* PLACE ORDER BUTTON (if cart > 0) */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-4">
          <p className="font-semibold">Total: ₹{cart.reduce((sum, i) => sum + i.price * i.qty, 0)}</p>
          <button
            onClick={placeOrder}
            className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
