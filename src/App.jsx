import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import CompanyGroupList from "./modules/CompanyGroup/CompanyGroupList";
import AddCompanyGroup from "./modules/CompanyGroup/AddCompanyGroup";
import FirmList from "./modules/Firm/FirmList";
import AddFirm from "./modules/Firm/AddFirm";
import SupplierList from "./modules/Supplier/SupplierList";
import AddSupplier from "./modules/Supplier/AddSupplier";
import SupplierDashboard from "./modules/Supplier/SupplierDashboard";
import AddTransaction from "./modules/Supplier/AddTransaction";
import VehicleEntryList from "./modules/VehicleEntry/VehicleEntryList";
import AddVehicleEntry from "./modules/VehicleEntry/AddVehicleEntry";
import AddWeightEntry from "./modules/WeightEntry/AddWeightEntry";
import WeightEntryReport from "./modules/WeightEntry/WeightEntryReport";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/company-groups" exact component={CompanyGroupList} />
        <Route path="/company-groups/new" component={AddCompanyGroup} />
        <Route path="/firms" exact component={FirmList} />
        <Route path="/firms/new" component={AddFirm} />
        <Route path="/suppliers" exact component={SupplierList} />
        <Route path="/suppliers/new" component={AddSupplier} />
        <Route path="/suppliers/:id" exact component={SupplierDashboard} />
        <Route path="/suppliers/:id/transactions/new" component={AddTransaction} />
        <Route path="/vehicle-entries" exact component={VehicleEntryList} />
        <Route path="/vehicle-entries/new" component={AddVehicleEntry} />
        <Route path="/weight-entries/:vehicleEntryId/new" component={AddWeightEntry} />
        <Route path="/weight-entries/:vehicleEntryId/report" component={WeightEntryReport} />
      </Switch>
    </Router>
  );
}

export default App;
