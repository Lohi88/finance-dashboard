import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(
  JSON.parse(localStorage.getItem("transactions")) || [
    { id: 1, date: "2024-01-05", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2024-01-10", amount: 2000, category: "Shopping", type: "expense" },
    { id: 3, date: "2024-01-15", amount: 800, category: "Food", type: "expense" },
    { id: 4, date: "2024-02-01", amount: 6000, category: "Freelance", type: "income" },
    { id: 5, date: "2024-02-05", amount: 1500, category: "Transport", type: "expense" },
    { id: 6, date: "2024-02-12", amount: 1200, category: "Groceries", type: "expense" },
    { id: 7, date: "2024-03-03", amount: 7000, category: "Salary", type: "income" },
    { id: 8, date: "2024-03-08", amount: 2500, category: "Shopping", type: "expense" },
    { id: 9, date: "2024-03-15", amount: 1000, category: "Entertainment", type: "expense" },
    { id: 10, date: "2024-04-01", amount: 8000, category: "Salary", type: "income" }
  ]
);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <AppContext.Provider
      value={{ transactions, setTransactions, role, setRole, search, setSearch }}
    >
      {children}
    </AppContext.Provider>
  );
  };