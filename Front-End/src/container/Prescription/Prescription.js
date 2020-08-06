import React, { Component } from "react";
import classes from "./Prescription.module.css";
import { NavLink, Route, Switch } from "react-router-dom";
import AddPrescription from "./AddPrescription/AddPrescription";
import DeletePrescription from "./DeletePrescription/DeletePrescription";

class Prescription extends Component {
  render() {
    const tabClasss = "nav nav-pills flex-column flex-sm-row px-3".split(" ");
    tabClasss.push(classes["TabLink"]);
    return (
      <div>
        <nav className={tabClasss.join(" ")}>
          <NavLink
            className="flex-sm-fill text-sm-center nav-link text-center"
            exact
            to="/prescription"
          >
            New Entry
          </NavLink>
          <NavLink
            className="flex-sm-fill text-sm-center nav-link text-center"
            to={this.props.match.url + "/delete"}
          >
            Delete Entry
          </NavLink>
        </nav>
        <Switch>
          <Route path="/prescription" exact component={AddPrescription} />
          <Route
            path="/prescription/delete"
            exact
            component={DeletePrescription}
          />
        </Switch>
      </div>
    );
  }
}

export default Prescription;
