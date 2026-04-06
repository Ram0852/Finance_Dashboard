import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function CategoryChart() {
  const { transactions } = useContext(AppContext);

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

  const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24"];

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-6">
      <h3 className="font-bold mb-4">Spending by Category</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
        >
          {categoryData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}