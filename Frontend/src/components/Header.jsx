import ThemeToggle from "./ThemeToggle";
import { useUserStore } from "../store";
import { useThemeStore } from "../store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const { darkMode } = useThemeStore();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <header
      className={`shadow-lg py-4 px-6 flex justify-between items-center ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-700"
          : "bg-gradient-to-r from-blue-600 to-purple-600"
      }`}
    >
      <h1
        className={`text-3xl font-extrabold tracking-wide ${
          darkMode ? "text-white" : "text-white"
        }`}
      >
        Intern Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className={`px-4 py-2 text-base font-semibold rounded-full transition transform hover:scale-105 duration-300 ease-in-out ${
            darkMode
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-red-200 text-red-800 hover:bg-red-300"
          }`}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;