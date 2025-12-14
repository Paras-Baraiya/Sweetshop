import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) return;

    await api.post("/orders", {
      items: cart.map(item => ({
        sweetId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      totalAmount: total
    });

    clearCart();
    navigate("/orders");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-xl">Your cart is empty</p>
          <p>Add some delicious sweets 🍬</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-pink-100 rounded flex items-center justify-center text-3xl">
                    🍰
                  </div>

                  <div>
                    <p className="font-bold text-lg">
                      {item.name}
                    </p>
                    <p className="text-gray-600">
                      ₹{item.price} × {item.qty}
                    </p>
                    <p className="font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: BILL SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">
              Bill Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Items Total</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-full text-lg hover:bg-pink-700 transition"
            >
              Place Order
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
