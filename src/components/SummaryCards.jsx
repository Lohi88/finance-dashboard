import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SummaryCards = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Balance" value={income - expense} />
       <Card title="Income" value={income} />
      <Card title="Expense" value={expense} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3>{title}</h3>
    <p className="text-xl font-bold">₹{value}</p>
  </div>
);

export default SummaryCards;
