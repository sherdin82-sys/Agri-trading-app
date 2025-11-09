import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AddCompanyGroup() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [group, setGroup] = useState({ name: "", contactPerson: "", contactNumber: "", address: "" });

  const handleChange = e => setGroup({ ...group, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_COMPANY_GROUP", payload: { ...group, id: Date.now() } });
    history.push("/company-groups");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Company Group</h2>
      <input name="name" placeholder="Group Name" value={group.name} onChange={handleChange} required />
      <input name="contactPerson" placeholder="Contact Person" value={group.contactPerson} onChange={handleChange} required />
      <input name="contactNumber" placeholder="Contact Number" value={group.contactNumber} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={group.address} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}
export default AddCompanyGroup;
