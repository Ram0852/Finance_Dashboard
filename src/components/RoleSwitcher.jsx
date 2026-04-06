import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole, user, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between w-full">

      {/* Greeting */}
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {role === "admin" ? (
          <span>Welcome, <span className="font-medium text-gray-800 dark:text-white">{user}</span></span>
        ) : (
          <span>Viewing as Guest</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">

        {/* Role Selector */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-gray-300 
                     bg-white text-sm 
                     dark:bg-gray-800 dark:text-white dark:border-gray-600
                     focus:outline-none"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1.5 rounded-md text-sm 
                    bg-gray-200 hover:bg-gray-300
                    dark:bg-gray-700 dark:hover:bg-gray-600 
                    dark:text-white transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>

      </div>
    </div>
  );
}