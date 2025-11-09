import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function SupplierDashboard() {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const supplier = state.suppliers.find(s => String(s.id) === String(id));
  const transactions = state.supplierTransactions.filter(t => String(t.supplierId) === String(id));

  return supplier ? (
    <div>
      <h2>Supplier Dashboard: {supplier.name}</h2>
      <div>Balance: <b>{supplier.currentBalance}</b></div>
      <div>Contact: {supplier.contactNumber}</div>
      <div>Address: {supplier.address}</div>
      <div>Last Updated: {supplier.lastUpdated && new Date(supplier.lastUpdated).toLocaleString()}</div>
      <Link to={`/suppliers/${id}/transactions/new`}>Add Transaction</Link>
      <h3>Transactions</h3>
      {transactions.length === 0 ? <div>No transactions.</div> :
        <ul>
          {transactions.map(tr => (
            <li key={tr.id}>
              <div>{new Date(tr.datetime).toLocaleString()} - {tr.transactionType}: {tr.amount} ({tr.paymentMode})</div>
              {tr.receiptUri && <img src={tr.receiptUri} alt="Receipt" width="48" />}
              <div>{tr.description}</div>
            </li>
          ))}
        </ul>
      }
    </div>
  ) : <div>Supplier not found</div>;
}
export default SupplierDashboard;
