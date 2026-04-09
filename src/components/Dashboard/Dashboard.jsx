import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CategoryChart from "./CategoryChart";
import TrendChart from "./TrendChart";

export default function Dashboard() {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // 🔹 Insight: highest expense category
  const expenseTransactions = transactions.filter(t => t.type === "expense");

  const categoryData = Object.values(
    expenseTransactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  const highestCategory =
    categoryData.length > 0
      ? categoryData.reduce((max, curr) =>
          curr.value > max.value ? curr : max
        )
      : { name: "-", value: 0 };

      return (
        <div className="space-y-6">
      
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
      
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
            {/* Balance */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Balance</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ₹{balance}
              </p>
            </div>
      
            {/* Income */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Income</h3>
              <p className="text-2xl font-semibold text-green-600">
                ₹{income}
              </p>
            </div>
      
            {/* Expense */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Expense</h3>
              <p className="text-2xl font-semibold text-red-500">
                ₹{expense}
              </p>
            </div>
      
          </div>
      
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
              <CategoryChart />
            </div>
      
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
              <TrendChart />
            </div>
      
          </div>
      
          {/* Insights */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Insights
            </h3>
      
            <p className="text-gray-600 dark:text-gray-400">
              Highest spending:
              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                {highestCategory.name}
              </span>
              {" "} (₹{highestCategory.value})
            </p>
      
            {/* Extra insight (small upgrade) */}
            <span className="text-xs text-gray-400 mt-2">
              {expense > income
                ? <p>You are spending<span className="text-red-500"> more</span> than you earn.</p>
                : expense == income ? <p>You are spending <span className="text-orange-500"> all</span> of your income</p> 
                : <p>Your spending is under <span className="text-green-500"> control</span></p>}
            </span>
          </div>
      
        </div>
      );
}