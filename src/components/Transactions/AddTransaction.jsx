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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="font-bold mb-2">Add Transaction</h3>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mr-2"
        required
      />

      <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 mr-2 rounded-lg">
        <option value="expense" className="rounded-md">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mr-2"
        required
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Add
      </button>
    </form>
  );
}