import Dashboard from "./components/Dashboard/Dashboard";
import TransactionList from "./components/Transactions/TransactionList";
import RoleSwitcher from "./components/RoleSwitcher";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top Bar */}
      <div className="bg-white shadow-sm">
        <RoleSwitcher />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Dashboard />
        <TransactionList />
      </div>

    </div>
  );
}

export default App;