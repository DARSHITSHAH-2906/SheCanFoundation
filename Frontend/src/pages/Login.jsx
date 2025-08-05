import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useThemeStore } from "../store";
import { useUserStore } from "../store";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { darkMode } = useThemeStore();
  const { login, setUserData } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      toast.success("Login successful!");
      login(response.data.user);
      setUserData(response.data.user);
      navigate("/dashboard");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        setError("No response from server. Please check your network connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Axios request setup error:", err.message);
      }
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Intern Login</h2>
          <ThemeToggle />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              placeholder="intern@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full py-2 rounded font-semibold ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
