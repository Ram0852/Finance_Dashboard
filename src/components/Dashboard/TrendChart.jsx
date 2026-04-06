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
    <div className="bg-white mt-3 py-4 rounded-2xl shadow-md">
      <h3 className="font-semibold mb-4">Monthly Expense Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
  
      <LineChart width={500} height={300} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" />
      </LineChart>
        </ResponsiveContainer>
    </div>
  );
}