import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { ResponsiveContainer } from "recharts";

export default function TrendChart() {
  const { transactions } = useContext(AppContext);

  // 🔹 Step 1: Filter only expenses
  const expenseTransactions = transactions.filter(
    t => t.type === "expense"
  );

  // 🔹 Step 2: Group by month
  const monthlyData = Object.values(
    expenseTransactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short"
      });

      if (!acc[month]) {
        acc[month] = { month, amount: 0 };
      }

      acc[month].amount += t.amount;

      return acc;
    }, {})
  );

  return (
    <div className="space-y-3">
  
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Monthly Expense Trend
      </h3>
  
      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#60a5fa"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  
    </div>
  );
}