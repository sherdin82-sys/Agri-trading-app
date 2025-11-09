import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

function AddTransaction() {
  const history = useHistory();
  const { id } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const [transaction, setTransaction] = useState({
    supplierId: id,
    datetime: new Date(),
    paymentMode: "Cash",
    amount: 0,
    description: "",
    receiptUri: "",
    transactionType: "Credit",
  });

  const handleChange = e =>
    setTransaction({ ...transaction, [e.target.name]: e.target.value });

  const handleReceipt = e => {
    if (e.target.files[0]) {
      setTransaction({ ...transaction, receiptUri: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const supplier = state.suppliers.find(s => String(s.id) === String(id));
    let newBalance =
      transaction.transactionType === "Credit"
        ? supplier.currentBalance + parseFloat(transaction.amount)
        : supplier.currentBalance - parseFloat(transaction.amount);

    dispatch({
      type: "ADD_SUPPLIER_TRANSACTION",
      payload: { ...transaction, id: Date.now(), newBalance }
    });
    history.push(`/suppliers/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input type="datetime-local" name="datetime" onChange={handleChange} required />
      <select name="paymentMode" value={transaction.paymentMode} onChange={handleChange}>
        <option value="Cash">Cash</option>
        <option value="Online">Online</option>
      </select>
      <input name="amount" type="number" placeholder="Amount" value={transaction.amount} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={transaction.description} onChange={handleChange} />
      <input type="file" name="receipt" onChange={handleReceipt} />
      <select name="transactionType" value={transaction.transactionType} onChange={handleChange}>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
      <button type="submit">Save Transaction</button>
    </form>
  );
}
export default AddTransaction;
