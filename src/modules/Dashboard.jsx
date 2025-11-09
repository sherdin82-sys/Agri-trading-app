import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Dashboard() {
  const { state } = useContext(AppContext);
  const totalSales = state.supplierTransactions.filter(tr => tr.transactionType === "Credit").reduce((sum, t) => sum + Number(t.amount), 0);
  const totalPurchase = state.supplierTransactions.filter(tr => tr.transactionType === "Debit").reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div>
      <h1>Agricultural Trading Dashboard</h1>
      <div>
        <h2>Analytics</h2>
        <div>Total Sales: {totalSales}</div>
        <div>Total Purchase: {totalPurchase}</div>
      </div>
      <div>
        <h2>Quick Actions</h2>
        <ul>
          <li><Link to="/vehicle-entries/new">Add Vehicle Entry</Link></li>
          <li><Link to="/suppliers/new">Add Supplier</Link></li>
          <li><Link to="/firms/new">Add Firm</Link></li>
          <li><Link to="/company-groups/new">Add Company Group</Link></li>
        </ul>
      </div>
      <div>
        <h2>Recent Transactions</h2>
        <ul>
          {state.supplierTransactions.slice(-5).reverse().map(tr => (
            <li key={tr.id}>
              {new Date(tr.datetime).toLocaleString()} - {tr.transactionType}: {tr.amount} ({state.suppliers.find(s => String(s.id) === String(tr.supplierId))?.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Dashboard;
