import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function WeightEntryReport() {
  const { vehicleEntryId } = useParams();
  const { state } = useContext(AppContext);
  const entry = state.vehicleEntries.find(e => String(e.id) === String(vehicleEntryId));
  const animals = state.weightEntries.filter(we => String(we.vehicleEntryId) === String(vehicleEntryId));
  const totalWeight = animals.reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
  const avgWeight = animals.length ? totalWeight / animals.length : 0;
  const emgCount = animals.filter(a => a.isEmg).length;
  const holdCount = animals.filter(a => a.isHold).length;
  const emgWeight = animals.filter(a => a.isEmg).reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
  const emgTags = animals.filter(a => a.isEmg).map(a => a.tagNo).join(', ');
  const holdTags = animals.filter(a => a.isHold).map(a => a.tagNo).join(', ');

  return entry ? (
    <div>
      <h2>Weight Entry Report: Lot {entry.lotNumber}</h2>
      <div>Firm: {state.firms.find(f => f.id === entry.firmId)?.name}, Customer: {entry.customer}</div>
      <div>Date/Time: {new Date(entry.datetime).toLocaleString()}</div>
      <div>Quantity: {entry.quantity}, Tags: {entry.startingTagNo} to {entry.endingTagNo}</div>
      <div>
        <b>Summary</b><br/>
        Total Weight: {totalWeight}<br/>
        Average Weight: {avgWeight.toFixed(2)}<br/>
        EMG Count: {emgCount}, Hold Count: {holdCount}<br/>
        EMG Weight: {emgWeight}<br/>
        EMG Tags: {emgTags}<br/>
        Hold Tags: {holdTags}
      </div>
      <table>
        <thead>
          <tr><th>Tag No</th><th>Weight</th><th>EMG</th><th>Hold</th></tr>
        </thead>
        <tbody>
          {animals.map(a => (
            <tr key={a.tagNo}>
              <td>{a.tagNo}</td>
              <td>{a.weight}</td>
              <td>{a.isEmg?'Yes':'No'}</td>
              <td>{a.isHold?'Yes':'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <div>Vehicle Entry not found.</div>;
}
export default WeightEntryReport;
