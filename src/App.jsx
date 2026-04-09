import { useContext } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionList from "./components/Transactions/TransactionList";
import RoleSwitcher from "./components/RoleSwitcher";
import { AppContext } from "./context/AppContext";

function App() {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      
      {/* Page Background */}
      <div className="min-h-screen font-[Poppins] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        {/* Top Bar */}
        <div className="sticky top-0 z-10 backdrop-blur shadow-md shadow-green-200 dark:shadow-md dark:shadow-blue-500  bg-white/65 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Finance Dashboard
            </h1>

            <RoleSwitcher />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <Dashboard />
          <TransactionList />
        </div>

      </div>
    </div>
  );
}

export default App;