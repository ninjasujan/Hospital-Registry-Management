import React, { Component } from "react";
import classes from "./NewRegister.module.css";
import { nameValidate, contactValidate } from "../../../Utility/validator";
import Spinner from "../../../component/UI/Spinner/Spinner";
import * as actions from "../../../store/action/patient";
import { connect } from "react-redux";

class NewRegister extends Component {
  state = {
    patientData: {
      patientId: "",
      name: "",
      birthDate: "",
      contact: "",
      address: "",
      location: "",
    },
    isValidForm: false,
    inputError: "Please fill mandatory field to Register",
  };

  inputChangeHandler = (input, identifier) => {
    let value = input.target.value;
    if (identifier === "name" || identifier === "location") {
      let values = value
        .split(" ")
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1));
      value = values.join(" ");
    }
    const updatedFormData = { ...this.state.patientData };
    updatedFormData[identifier] = value;
    this.setState({ patientData: updatedFormData });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    let isValid = true;
    let msg;
    if (isValid && !nameValidate(this.state.patientData.patientId)) {
      isValid = false;
      msg = "Please add valid Patient ID";
    }
    if (isValid && !nameValidate(this.state.patientData.name)) {
      isValid = false;
      msg = "Please add valid Name";
    }
    if (isValid && !contactValidate(this.state.patientData.contact)) {
      isValid = false;
      msg = "Please add valid contact number";
    }
    if (isValid && !nameValidate(this.state.patientData.location)) {
      isValid = false;
      msg = "Please add a valid location";
    }
    if (isValid) {
      this.setState({ isValidForm: true, inputError: null });
      this.props.onPatientRegister(this.state.patientData, this.props.token);
    } else {
      this.setState({ isValidForm: false, inputError: msg });
    }
  };

  render() {
    let messageBoxClass = "alert lead text-center alert-danger".split(" ");
    let message = "Please add valid information.";
    if (this.props.isRegistered) {
      message = "Patient registration successfull.";
      messageBoxClass[3] = "alert-success";
    }
    if (this.props.error) {
      message = this.props.error;
      messageBoxClass[3] = "alert-danger";
    }
    if (!this.state.isValidForm) {
      message = this.state.inputError;
      messageBoxClass[3] = "alert-danger";
    }
    console.log("Class and message of Message Box", message, messageBoxClass);
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.NewRegister}>
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className={messageBoxClass.join(" ")}
              style={{ fontSize: "0.9em" }}
            >
              {message}
            </div>
          </div>
        </div>
        <form>
          <div className="text-center">
            <h2>New Patient Registration</h2>
          </div>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Patient ID."
              onChange={(event) => this.inputChangeHandler(event, "patientId")}
              value={this.state.patientData.patientId}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name."
              onChange={(event) => this.inputChangeHandler(event, "name")}
              value={this.state.patientData.name}
            />
          </div>
          <div className="form-group">
            <label>Choose Birth Date(Birth Date is optional)</label>
            <input
              type="date"
              className="form-control"
              onChange={(event) => this.inputChangeHandler(event, "birthDate")}
              value={this.state.patientData.birthDate}
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Contact Number"
              onChange={(event) => this.inputChangeHandler(event, "contact")}
              value={this.state.patientData.contact}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              onChange={(event) => this.inputChangeHandler(event, "location")}
              value={this.state.patientData.location}
            />
          </div>
          <div className="form-group">
            <label>Address (Address is optional)</label>
            <textarea
              className="form-control"
              onChange={(event) => this.inputChangeHandler(event, "address")}
            ></textarea>
          </div>
          <div className="form-group text-center">
            <button
              className="btn btn-primary px-5 py-2"
              onClick={this.onSubmitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.patient.loading,
    error: state.patient.error,
    isRegistered: state.patient.isDone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPatientRegister: (patientData, token) =>
      dispatch(actions.registerPatient(patientData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRegister);
