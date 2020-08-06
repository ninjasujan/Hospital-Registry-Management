import React, { Component } from "react";
import classes from "./DeletePrescription.module.css";

class DeletePrescription extends Component {
  render() {
    return (
      <div className={classes.DeletePrescription}>
        <h2 className="text-center display-6">Delete Prescription</h2>
      </div>
    );
  }
}

export default DeletePrescription;
