import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    if (res.data.user.role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 px-4">
  <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm">
    
    {/* Header */}
    <div className="text-center mb-6">
      <div className="text-5xl mb-2">🍬</div>
      <h2 className="text-3xl font-extrabold text-pink-600">
        SweetMart Login
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Welcome back! Please login
      </p>
    </div>

    {/* Email */}
    <input
      className="border border-gray-300 w-full px-4 py-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      placeholder="Email"
      onChange={e => setEmail(e.target.value)}
    />

    {/* Password */}
    <input
      type="password"
      className="border border-gray-300 w-full px-4 py-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      placeholder="Password"
      onChange={e => setPassword(e.target.value)}
    />

    {/* Button */}
    <button
      className="bg-pink-600 text-white w-full py-3 rounded-xl font-bold tracking-wide hover:bg-pink-700 active:scale-[0.98] transition-all shadow-lg"
      onClick={login}
    >
      Login
    </button>
  </div>
</div>

  );
}
