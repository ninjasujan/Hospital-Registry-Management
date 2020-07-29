import React, { Component } from "react";
import Tabs from "../../component/Tabs/Tablink";
import NewRegister from "./NewRegister/NewRegister";
import UpdatePatient from "./UpdatePatient/UpdatePatient";
import DeletePatient from "./DeletePatient/DeletePatient";
import { Route } from "react-router-dom";

class Patient extends Component {
  render() {
    return (
      <div>
        <Tabs />
        <Route path="/update-patient" exact component={UpdatePatient} />
        <Route path="/delete-patient" exact component={DeletePatient} />
        <Route path="/" exact component={NewRegister} />
      </div>
    );
  }
}

export default Patient;
