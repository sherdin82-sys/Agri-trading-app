import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AddSupplier() {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const [profilePicUri, setProfilePicUri] = useState("");
  const [supplier, setSupplier] = useState({
    name: "",
    contactNumber: "",
    address: "",
    openingBalance: 0,
    balanceType: "Credit",
    currentBalance: 0,
    lastUpdated: new Date()
  });

  const handleChange = e =>
    setSupplier({ ...supplier, [e.target.name]: e.target.value });

  const handlePicChange = e => {
    if (e.target.files[0]) {
      setProfilePicUri(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_SUPPLIER", payload: { ...supplier, profilePicUri, id: Date.now(), currentBalance: supplier.openingBalance } });
    history.push("/suppliers");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Supplier</h2>
      <input type="file" onChange={handlePicChange} />
      <input name="name" placeholder="Supplier Name" value={supplier.name} onChange={handleChange} required />
      <input name="contactNumber" placeholder="Contact Number" value={supplier.contactNumber} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={supplier.address} onChange={handleChange} required />
      <input name="openingBalance" type="number" placeholder="Opening Balance" value={supplier.openingBalance} onChange={handleChange} required />
      <select name="balanceType" value={supplier.balanceType} onChange={handleChange}>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
}
export default AddSupplier;
