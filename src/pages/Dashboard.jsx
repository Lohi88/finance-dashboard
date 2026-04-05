import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import TransactionTable from "../components/TransactionTable";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <SummaryCards />
      <Charts />
      <TransactionTable />
    </div>
  );
};

export default Dashboard;
