import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center">
          🍬 SweetMart Register
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-pink-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
