import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CategoryChart() {
  const { transactions } = useContext(AppContext);

  const expenseTransactions = transactions.filter(
    t => t.type === "expense"
  );

  const categoryData = Object.values(
    expenseTransactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, value: 0 };
      }
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  // 🎨 Better color palette (works for light + dark)
  const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24"];
  return (
    <div className="space-y-3 " >

      <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
        Spending by Category
      </h3>

      <div className="w-full h-64 ">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              stroke="none" // ❌ removes border
              isAnimationActive={false} // optional: smoother UX
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  style={{ outline: "none" }} // ❌ removes focus box
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "6px",
                color: "#fff"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}