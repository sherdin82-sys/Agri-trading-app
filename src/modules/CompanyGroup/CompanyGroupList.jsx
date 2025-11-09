import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function CompanyGroupList() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h2>Company Groups</h2>
      <Link to="/company-groups/new">Add Company Group</Link>
      <ul>
        {state.companyGroups.map(cg => (
          <li key={cg.id}>
            <strong>{cg.name}</strong>
            <div>Contact: {cg.contactPerson}, {cg.contactNumber}</div>
            <div>Address: {cg.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CompanyGroupList;
