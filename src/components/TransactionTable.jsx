import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const TransactionTable = () => {
  const { transactions, search, setSearch, role, setTransactions } =
    useContext(AppContext);

  // 🔥 Modal state
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("expense");

  // 🔍 Filter
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add Transaction
  const addTransaction = () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type,
    };

    setTransactions((prev) => [...prev, newTx]);

    // reset
    setAmount("");
    setCategory("Food");
    setType("expense");
    setShowModal(false);
  };

  // ❌ Delete
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      {/* 🔝 Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
        
        {/* 🔍 Search */}
        <input
          placeholder="Search by category..."
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ➕ Add Button */}
        {role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* 📋 Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No transactions found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Type</th>
                {role === "admin" && (
                  <th className="p-3 text-left">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3 font-medium">₹{t.amount}</td>

                  <td
                    className={`p-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type}
                  </td>

                  {/* ❌ Delete */}
                  {role === "admin" && (
                    <td className="p-3">
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 space-y-4">
            <h2 className="text-lg font-semibold">Add Transaction</h2>

            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full rounded"
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option>Food</option>
              <option>Shopping</option>
              <option>Transport</option>
              <option>Groceries</option>
              <option>Entertainment</option>
            </select>

            {/* Type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 w-full rounded"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={addTransaction}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;