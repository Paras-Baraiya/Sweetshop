import { useEffect, useState } from "react";
import api from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [newSweet, setNewSweet] = useState({ name: "", price: 0, stock: 0 });
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProfit: 0 });

  // Fetch all sweets
  const fetchSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  // Fetch dashboard stats
  const fetchStats = async () => {
    const res = await api.get("/dashboard/stats");
    // Assuming profit = 20% of totalRevenue
    const profit = res.data.totalRevenue * 0.2;
    setStats({ ...res.data, totalProfit: profit });
  };

  useEffect(() => {
    fetchSweets();
    fetchStats();
  }, []);

  // Add new sweet
  const addSweet = async () => {
    if (!newSweet.name || newSweet.price <= 0 || newSweet.stock < 0) {
      alert("Please fill all fields correctly");
      return;
    }
    await api.post("/sweets", newSweet);
    setNewSweet({ name: "", price: 0, stock: 0 });
    fetchSweets();
  };

  // Update sweet
  const updateSweet = async (id) => {
    await api.put(`/sweets/${id}`, form);
    setEditing(null);
    setForm({});
    fetchSweets();
  };

  // Delete sweet
  const deleteSweet = async (id) => {
    if (confirm("Are you sure to delete this sweet?")) {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    }
  };

  const chartData = [
    { name: "Revenue", value: stats.totalRevenue },
    { name: "Profit", value: stats.totalProfit },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Manage Sweets</h1>

      {/* Add New Sweet */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Add New Sweet</h2>
        <input
          type="text"
          placeholder="sweet name"
          className="border p-1 mr-2  border rounded-full shadow-sm focus:outline-none"
          value={newSweet.name}
          onChange={e => setNewSweet({ ...newSweet, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="price"
          className="border p-1 mr-2  border rounded-full shadow-sm focus:outline-none"
          value={newSweet.price}
          onChange={e => setNewSweet({ ...newSweet, price: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-1 mr-2  border rounded-full shadow-sm focus:outline-none"
          value={newSweet.stock}
          onChange={e => setNewSweet({ ...newSweet, stock: Number(e.target.value) })}
        />
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={addSweet}
        >
          Add Sweet
        </button>
      </div>

      {/* Sweet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sweets.map(s => (
          <div key={s._id} className="border p-4 rounded relative ">
            <h2 className="font-semibold">{s.name}</h2>
            <p>Price: ₹{s.price}</p>
            <p>Stock: {s.stock}</p>

            {editing === s._id ? (
              <div className="mt-2 space-y-2  bg-pink-100 rounded  flex items-center justify-center text-5xl">
                <input
                  type="number"
                  placeholder="Price"
                  className="border p-1 w-full"
                  onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  className="border p-1 w-full"
                  onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                />
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  onClick={() => updateSweet(s._id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-2 space-x-2">
                <button
                  className="bg-blue-400 text-white px-3 py-1 rounded"
                  onClick={() => setEditing(s._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteSweet(s._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Revenue & Profit Chart</h2>
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
