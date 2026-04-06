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
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500">Balance</h3>
          <p className="text-xl font-semibold">₹{balance}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500">Income</h3>
          <p className="text-xl font-semibold text-green-600">₹{income}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-gray-500">Expense</h3>
          <p className="text-xl font-semibold text-red-600">₹{expense}</p>
        </div>

      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  <CategoryChart />
  <TrendChart />
</div>

      {/* Insight Section */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Insights</h3>
        <p className="text-gray-600">
          Highest spending: <span className="font-medium">{highestCategory.name}</span> (₹{highestCategory.value})
        </p>
      </div>

    </div>
  );
}