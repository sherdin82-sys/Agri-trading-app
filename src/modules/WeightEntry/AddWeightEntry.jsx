import React, { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AddWeightEntry() {
  const history = useHistory();
  const { vehicleEntryId } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const entry = state.vehicleEntries.find(e => String(e.id) === String(vehicleEntryId));
  const [animals, setAnimals] = useState(
    entry
      ? Array.from({ length: entry.quantity }, (_, i) => ({
          tagNo: entry.startingTagNo + i,
          weight: "",
          isEmg: false,
          isHold: false,
        }))
      : []
  );

  const handleChange = (idx, field, value) => {
    setAnimals(list =>
      list.map((a, i) =>
        i === idx ? { ...a, [field]: field === "weight" ? Number(value) : value } : a
      )
    );
  };

  // Real-time calculations
  const totalWeight = animals.reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
  const avgWeight = animals.length ? totalWeight / animals.length : 0;
  const emgCount = animals.filter(a => a.isEmg).length;
  const holdCount = animals.filter(a => a.isHold).length;
  const emgWeight = animals.filter(a => a.isEmg).reduce((sum, a) => sum + (Number(a.weight) || 0), 0);
  const emgTags = animals.filter(a => a.isEmg).map(a => a.tagNo).join(', ');
  const holdTags = animals.filter(a => a.isHold).map(a => a.tagNo).join(', ');

  const handleSubmit = e => {
    e.preventDefault();
    animals.forEach(a =>
      dispatch({ type: "ADD_WEIGHT_ENTRY", payload: { ...a, vehicleEntryId: entry.id, id: Date.now() + a.tagNo } })
    );
    history.push(`/weight-entries/${vehicleEntryId}/report`);
  };

  if (!entry) return <div>Vehicle Entry not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Weight Entry</h2>
      <div>
        Total Weight: {totalWeight} | Average: {avgWeight.toFixed(2)}
        <br />
        EMG Count: {emgCount} | Weight: {emgWeight}
        <br />
        EMG Tags: {emgTags}
        <br />
        Hold Tags: {holdTags}
      </div>
      <table>
        <thead><tr>
          <th>Tag No</th><th>Weight</th><th>EMG</th><th>Hold</th>
        </tr></thead>
        <tbody>
          {animals.map((a, idx) => (
            <tr key={a.tagNo}>
              <td>{a.tagNo}</td>
              <td><input type="number" value={a.weight} min={0} onChange={e => handleChange(idx, "weight", e.target.value)} required /></td>
              <td><input type="checkbox" checked={a.isEmg} onChange={e => handleChange(idx, "isEmg", e.target.checked)} /></td>
              <td><input type="checkbox" checked={a.isHold} onChange={e => handleChange(idx, "isHold", e.target.checked)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Finalize Weights</button>
    </form>
  );
}
export default AddWeightEntry;
