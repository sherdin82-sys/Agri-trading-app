import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function FirmList() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h2>Firms</h2>
      <Link to="/firms/new">Add Firm</Link>
      <ul>
        {state.firms.map(firm => (
          <li key={firm.id}>
            <strong>{firm.name}</strong> (Group: {state.companyGroups.find(g => g.id === firm.companyGroupId)?.name})
            <div>Contact: {firm.contactPerson}, {firm.contactNumber}</div>
            <div>Address: {firm.address}</div>
            <div>Relationship Code: {firm.relationshipCode}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default FirmList;
