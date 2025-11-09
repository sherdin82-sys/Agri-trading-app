import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AddFirm() {
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const [firm, setFirm] = useState({ companyGroupId: "", name: "", relationshipCode: "", contactPerson: "", contactNumber: "", address: "" });

  const handleChange = e => setFirm({ ...firm, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_FIRM", payload: { ...firm, id: Date.now() } });
    history.push("/firms");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Firm</h2>
      <select name="companyGroupId" value={firm.companyGroupId} onChange={handleChange} required>
        <option value="">Select Company Group</option>
        {state.companyGroups.map(cg => (
          <option value={cg.id} key={cg.id}>{cg.name}</option>
        ))}
      </select>
      <input name="name" placeholder="Firm Name" value={firm.name} onChange={handleChange} required />
      <input name="relationshipCode" placeholder="Relationship Code" value={firm.relationshipCode} onChange={handleChange} required />
      <input name="contactPerson" placeholder="Contact Person" value={firm.contactPerson} onChange={handleChange} required />
      <input name="contactNumber" placeholder="Contact Number" value={firm.contactNumber} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={firm.address} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}
export default AddFirm;
