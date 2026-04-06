import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import AddTransaction from "./AddTransaction";

export default function TransactionList() {
  const { transactions, role } = useContext(AppContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 🔹 Combined filtering + search
  const filteredTransactions = transactions
    .filter(t => filter === "all" || t.type === filter)
    .filter(t =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-4">

      {/* Header */}
      <h2 className="text-xl font-bold">Transactions</h2>

      {/* 🔹 Admin Add Form */}
      {role === "admin" && <AddTransaction />}

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        {/* Filter Buttons */}
        <div className="space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`px-3 py-1 rounded ${
              filter === "income" ? "bg-green-600 text-white" : "bg-green-200"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`px-3 py-1 rounded ${
              filter === "expense" ? "bg-red-600 text-white" : "bg-red-200"
            }`}
          >
            Expense
          </button>
        </div>

        {/* 🔹 Search */}
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-xl w-full md:w-64"
        />
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow divide-y">

        {filteredTransactions.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">
            No transactions found
          </p>
        ) : (
          filteredTransactions.map(t => (
            <div key={t.id} className="flex justify-between p-4">
              <div>
                <p className="font-medium">{t.category}</p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
              <p
                className={
                  t.type === "income"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                ₹{t.amount}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
}