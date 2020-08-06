import React, { Component } from "react";
import classes from "./AddPrescription.module.css";
import {
  nameValidate,
  timingsValidation,
  rangeValidate,
} from "../../../Utility/validator";

class AddPrescription extends Component {
  state = {
    patientId: "",
    medicineList: [],
    inputError: null,
    medicineInfo: {
      name: "",
      days: 0,
      timing: [0, 0, 0],
    },
  };

  inputChangeHandler = (event, name) => {
    if (name === "id") this.setState({ patientId: event.target.value });
    if (name === "name") {
      const updatedMedicineInfo = { ...this.state.medicineInfo };
      updatedMedicineInfo[name] = event.target.value;
      this.setState({ medicineInfo: updatedMedicineInfo });
    }
    if (name === "days") {
      const updatedMedicineInfo = { ...this.state.medicineInfo };
      updatedMedicineInfo[name] = parseInt(event.target.value);
      this.setState({ medicineInfo: updatedMedicineInfo });
    }
    if (event.target.type === "checkbox") {
      const updatedMedicineInfo = { ...this.state.medicineInfo };
      updatedMedicineInfo.timing[name] = event.target.checked ? 1 : 0;
      this.setState({ medicineInfo: updatedMedicineInfo });
    }
    console.log("[Medicine Info]", this.state.medicineInfo);
  };

  addToListHandler = (event) => {
    console.log(event);
    const medicineInfo = this.state.medicineInfo;
    event.preventDefault();
    let isValid = true;
    if (isValid && !nameValidate(this.state.patientId)) {
      isValid = false;
      this.setState({ inputError: "Add a valid Patient ID" });
    }
    if (isValid && !nameValidate(medicineInfo.name)) {
      isValid = false;
      this.setState({ inputError: "Enter a valid medicine name." });
    }
    if (isValid && !rangeValidate(medicineInfo.days)) {
      isValid = false;
      this.setState({ inputError: "Suggest Number of Days to take medicine" });
    }
    if (isValid && !timingsValidation(medicineInfo.timing)) {
      isValid = false;
      this.setState({
        inputError: "Please enter valid timings to take medicine.",
      });
    }
    if (isValid) {
      this.setState((prevState) => {
        return {
          medicineList: prevState.medicineList.concat(medicineInfo),
          inputError: null,
        };
      });
      console.log("[After Adding]", this.state.medicineList);
    }
  };

  render() {
    console.log("List of medicines", this.state.medicineList);
    let messageBoxClass = "alert lead text-center alert-danger".split(" ");
    messageBoxClass.push("alert-danger");
    let disabledClass = "btn btn-primary form-control".split(" ");
    return (
      <div className={classes.AddPrescription}>
        <h2 className="text-center display-6">Add Prescription</h2>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className={messageBoxClass.join(" ")}
              style={{ fontSize: "0.9em" }}
            >
              {this.state.inputError
                ? this.state.inputError
                : "Fill all fields."}
            </div>
          </div>
        </div>
        <form className={classes.Form}>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient ID."
              onChange={(event) => this.inputChangeHandler(event, "id")}
              value={this.state.patientId}
            />
          </div>
          <div className="form-group">
            <label>Medicine Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Medicine Name"
              onChange={(event) => this.inputChangeHandler(event, "name")}
              value={this.state.medicineInfo.name}
            />
          </div>
          <div className="form-group">
            <label>
              <strong>Number of days: {this.state.medicineInfo.days}</strong>
            </label>
            <input
              className="form-control"
              type="range"
              id="vol"
              name="vol"
              min="0"
              max="90"
              onChange={(event) => this.inputChangeHandler(event, "days")}
              value={this.state.medicineInfo.days}
            />
          </div>
          <label>Timings of the medicine</label>
          <div className={classes.CheckList}>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="monrning"
                onChange={(event) => this.inputChangeHandler(event, 0)}
              />
              <label htmlFor="monrning" className={classes.Label}>
                Morning
              </label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className=""
                id="afternoon"
                onChange={(event) => this.inputChangeHandler(event, 1)}
              />
              <label htmlFor="afternoon" className={classes.Label}>
                Afternoon
              </label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="night"
                onChange={(event) => this.inputChangeHandler(event, 2)}
              />
              <label htmlFor="night" className={classes.Label}>
                Night
              </label>
            </div>
          </div>
          <div className="form-goup text-center">
            <input
              type="submit"
              className="btn btn-primary"
              value="ADD-LIST"
              onClick={this.addToListHandler}
            />
          </div>
          <p className="lead text-center py-3">Medicine list looks empty.</p>
          <div className="form-goup py-2">
            <input
              type="submit"
              className={disabledClass.join(" ")}
              value="SAVE"
              disabled={this.state.medicineList.length > 0 ? false : true}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddPrescription;
