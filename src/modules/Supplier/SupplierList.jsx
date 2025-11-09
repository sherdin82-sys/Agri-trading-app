import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import profilePlaceholder from "../../assets/profile_placeholder.png";

function SupplierList() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h2>Suppliers</h2>
      <Link to="/suppliers/new">Add Supplier</Link>
      <ul>
        {state.suppliers.map(supp => (
          <li key={supp.id}>
            <img src={supp.profilePicUri || profilePlaceholder} alt="Profile" width="32" height="32" style={{borderRadius: "50%"}} />
            <strong>{supp.name}</strong>
            <div>Balance: {supp.currentBalance} ({supp.balanceType})</div>
            <div>Contact: {supp.contactNumber}</div>
            <div>Address: {supp.address}</div>
            <div>Last Updated: {supp.lastUpdated && new Date(supp.lastUpdated).toLocaleString()}</div>
            <Link to={`/suppliers/${supp.id}`}>Dashboard</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SupplierList;
