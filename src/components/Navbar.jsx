import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = ({ setPage }) => {
  const { role, setRole } = useContext(AppContext);

  return (
    <div className="flex justify-between p-4 bg-white shadow">
      <div className="space-x-4">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("insights")}>Insights</button>
      </div>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default Navbar;

