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

  const isOverspending = expense > income;
  const isEqual = expense === income;

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
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
                        border border-gray-400/80 dark:border-gray-700/60
                        p-5 rounded-2xl 
                        shadow-[0_4px_20px_rgba(0,0,0,0.10)] 
                        hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]
                        transition">

          <h3 className="text-sm text-gray-500 dark:text-gray-400">Balance</h3>

          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ₹{balance}
          </p>
        </div>

        {/* Income */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
                        border border-green-400/50 dark:border-green-700/40
                        p-5 rounded-2xl 
                        shadow-[0_4px_20px_rgba(34,197,94,0.10)] 
                        hover:shadow-[0_6px_25px_rgba(34,197,94,0.12)]
                        transition">

          <h3 className="text-sm text-gray-500 dark:text-gray-400">Income</h3>

          <p className="text-2xl font-semibold text-green-600">
            ₹{income}
          </p>
        </div>

        {/* Expense */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
                        border border-red-400/50 dark:border-red-700/40
                        p-5 rounded-2xl 
                        shadow-[0_4px_20px_rgba(239,68,68,0.10)] 
                        hover:shadow-[0_6px_25px_rgba(239,68,68,0.12)]
                        transition">

          <h3 className="text-sm text-gray-500 dark:text-gray-400">Expense</h3>

          <p className="text-2xl font-semibold text-red-500">
            ₹{expense}
          </p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl 
        shadow-[0_4px_20px_rgba(56,189,248,0.10)]  border border-blue-300/20">
          <CategoryChart />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl 
        shadow-[0_4px_20px_rgba(56,189,248,0.10)] border border-blue-300/20">
          <TrendChart />
        </div>

      </div>

      {/* Insights */}
      <div
        className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
                    p-5 rounded-2xl border
                    ${
                      isOverspending
                        ? "border-red-200 dark:border-red-700"
                        : isEqual
                        ? "border-yellow-200 dark:border-yellow-700"
                        : "border-green-200 dark:border-green-700"
                    }
                    ${
                      isOverspending
                        ? "shadow-[0_4px_20px_rgba(239,68,68,0.08)]"
                        : isEqual
                        ? "shadow-[0_4px_20px_rgba(245,158,11,0.08)]"
                        : "shadow-[0_4px_20px_rgba(34,197,94,0.08)]"
                    }
                    transition`}
      >

        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Insights
        </h3>

        <p className="text-gray-600 dark:text-gray-400">
          Highest spending:
          <span className="ml-1 font-semibold text-gray-900 dark:text-white font-[Poppins]">
  {highestCategory.name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}
</span>{" "}
          (₹{highestCategory.value})
        </p>

        <p
          className={`text-sm mt-2 ${
            isOverspending
              ? "text-red-500"
              : isEqual
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {isOverspending
            ? "You are spending more than you earn."
            : isEqual
            ? "You spent all of your income."
            : "Your spending is under control."}
        </p>

      </div>

    </div>
  );
}