import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/my")
      .then(res => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-xl">No orders yet</p>
          <p>Order some sweets to see them here 🍬</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-xl m-2 p-2 w-150 shadow hover:shadow-lg transition p-5"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>
                  <p className="font-semibold">
                    {order._id}
                  </p>
                </div>

                <span className="px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-700"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <p className="text-lg font-bold">
                  Total: ₹{order.totalAmount}
                </p>

                <a
                  href={`http://localhost:5000/api/orders/${order._id}/invoice`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
                >
                  Download Invoice
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
