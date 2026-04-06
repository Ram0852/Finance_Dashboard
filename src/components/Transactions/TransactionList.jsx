import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import AddTransaction from "./AddTransaction";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

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
      <div className="space-y-5">
    
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Transactions
        </h2>
    
        {/* Admin Form */}
        {role === "admin" && <AddTransaction />}
    
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    
          {/* Filters */}
          <div className="flex gap-2">
    
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filter === "all"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              }`}
            >
              All
            </button>
    
            <button
              onClick={() => setFilter("income")}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filter === "income"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:text-white"
              }`}
            >
              Income
            </button>
    
            <button
              onClick={() => setFilter("expense")}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filter === "expense"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:text-white"
              }`}
            >
              Expense
            </button>
    
          </div>
    
          {/* Search */}
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 
                       p-2 rounded-md w-full md:w-64 text-sm
                       bg-white dark:bg-gray-800 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
    
        {/* List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow divide-y">
    
          {filteredTransactions.length === 0 ? (
            <p className="p-5 text-gray-500 dark:text-gray-400 text-center text-sm">
              No transactions found
            </p>
          ) : (
            filteredTransactions.map(t => (
              <div
                key={t.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {t.category}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.date}
                  </p>
                </div>
    
                <p
                  className={`font-semibold flex items-center ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? (
                    <ArrowUpRight size={20} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={20} className="mr-1" />
                  )}
                  ₹{t.amount}
                </p>
              </div>
            ))
          )}
    
        </div>
    
      </div>
    );
}