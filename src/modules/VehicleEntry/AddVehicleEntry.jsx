import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function VehicleEntryList() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <h2>Vehicle Entries</h2>
      <Link to="/vehicle-entries/new">Add Vehicle Entry</Link>
      <ul>
        {state.vehicleEntries.map(ve => (
          <li key={ve.id}>
            <div>Vehicle#: {ve.vehicleNumber}, Firm: {state.firms.find(f => f.id === ve.firmId)?.name}, Customer: {ve.customer}</div>
            <div>Date: {new Date(ve.datetime).toLocaleString()}</div>
            <div>Lot#: {ve.lotNumber}, Qty:{ve.quantity}</div>
            <div>Tags: Start {ve.startingTagNo} - End {ve.endingTagNo}</div>
            <Link to={`/weight-entries/${ve.id}/new`}>Weight Entries</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default VehicleEntryList;
