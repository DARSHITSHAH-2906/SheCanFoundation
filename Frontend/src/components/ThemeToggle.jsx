import { useThemeStore } from "../store";
import { FaSun, FaMoon } from "react-icons/fa"; // Import the icons you want to use

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-full transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          darkMode
            ? "bg-gray-700 text-yellow-300 hover:bg-gray-600 focus:ring-white"
            : "bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-900"
        }
      `}
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <FaSun className="text-xl" /> // Sun icon for dark mode
      ) : (
        <FaMoon className="text-xl" /> // Moon icon for light mode
      )}
    </button>
  );
};

export default ThemeToggle;