import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function AddTransaction() {
  const { transactions, setTransactions } = useContext(AppContext);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      type,
      category
    };

    setTransactions([...transactions, newTransaction]);

    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow space-y-4"
    >
      <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">
        Add Transaction
      </h3>
  
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
  
        {/* Amount */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 
                    p-2 rounded-md text-sm
                    bg-white dark:bg-gray-700 dark:text-white
                    focus:outline-none"
          required
      />
  
        {/* Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 
                     p-2 rounded-md text-sm
                     bg-white dark:bg-gray-700 dark:text-white
                     focus:outline-none"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
  
        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 
                     p-2 rounded-md text-sm
                     bg-white dark:bg-gray-700 dark:text-white
                     focus:outline-none"
          required
        />
  
        {/* Button */}
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm rounded-md 
                     hover:bg-black transition py-3
                     dark:bg-white dark:text-black"
        >
          Add
        </button>
  
      </div>
    </form>
  );
}