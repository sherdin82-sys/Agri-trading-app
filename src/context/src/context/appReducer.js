function appReducer(state, action) {
  switch (action.type) {
    case "ADD_COMPANY_GROUP":
      return { ...state, companyGroups: [...state.companyGroups, action.payload] };
    case "ADD_FIRM":
      return { ...state, firms: [...state.firms, action.payload] };
    case "ADD_SUPPLIER":
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case "ADD_SUPPLIER_TRANSACTION":
      // Insert transaction and update supplier balance (atomic)
      const transactions = [...state.supplierTransactions, action.payload];
      const suppliers = state.suppliers.map(s =>
        String(s.id) === String(action.payload.supplierId)
          ? { ...s, currentBalance: action.payload.newBalance, lastUpdated: new Date() }
          : s
      );
      return { ...state, supplierTransactions: transactions, suppliers };
    case "ADD_VEHICLE_ENTRY":
      return { ...state, vehicleEntries: [...state.vehicleEntries, action.payload] };
    case "ADD_WEIGHT_ENTRY":
      return { ...state, weightEntries: [...state.weightEntries, action.payload] };
    default:
      return state;
  }
}
export default appReducer;
