import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setPage={setPage} />
      {page === "dashboard" ? <Dashboard /> : <Insights />}
    </div>
  );
}

export default App;