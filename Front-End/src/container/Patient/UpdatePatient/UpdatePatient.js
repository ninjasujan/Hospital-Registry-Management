import React, { Component } from "react";
import classes from "./UpdatePatient.module.css";
import * as actions from "../../../store/action/patient";
import { connect } from "react-redux";
import { nameValidate, contactValidate } from "../../../Utility/validator";
import Spinner from "../../../component/UI/Spinner/Spinner";

class UpdatePatient extends Component {
  state = {
    updatePatientInfo: null,
    patientId: "",
    isValidForm: false,
    inputError: "Please add valid Information",
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (!this.props.loaded) {
      if (!nameValidate(this.state.patientId)) {
        this.setState({ inputError: "Invalid Patient ID", isValidForm: false });
      } else {
        this.setState({ isValidForm: true });
        this.props.onGetPatientInfo(this.state.patientId, this.props.token);
      }
    } else {
      let isValid = true;
      let msg = "";
      if (isValid && !nameValidate(this.props.patientData.name)) {
        isValid = false;
        msg = "Please add valid Name";
      }
      if (isValid && !contactValidate(this.props.patientData.contact)) {
        msg = "Please add valid contact number";
        isValid = false;
      }
      if (isValid && !nameValidate(this.props.patientData.location)) {
        isValid = false;
        msg = "Please add valid location";
      }
      if (isValid) {
        this.setState({ isValidForm: true, inputError: null });
        this.props.onPatientUpdate(this.props.patientData, this.props.token);
      } else {
        this.setState({ isValidForm: false, inputError: msg });
      }
    }
  };

  inputChangeHandler = (input, id) => {
    if (!this.props.loaded) this.setState({ patientId: input.target.value });
    else {
      this.props.onChangePatientData(input, id);
    }
  };

  render() {
    let formControls = (
      <div>
        <div className="form-group text-center">
          <button
            className="btn btn-primary px-5 py-2"
            onClick={this.onSubmitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    );
    if (this.props.loaded) {
      formControls = (
        <div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name."
              onChange={(event) => this.inputChangeHandler(event, "name")}
              value={this.props.patientData.name}
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              className="form-control"
              placeholder="Contact number."
              onChange={(event) => this.inputChangeHandler(event, "contact")}
              value={this.props.patientData.contact}
            />
          </div>
          <div className="form-group">
            <label>Birth Date(optional)</label>
            <input
              type="date"
              className="form-control"
              onChange={(event) => this.inputChangeHandler(event, "birthDate")}
              value={
                this.props.birthDate
                  ? this.props.patientData.birthDate.slice(0, 10)
                  : ""
              }
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              onChange={(event) => this.inputChangeHandler(event, "location")}
              value={this.props.patientData.location}
            />
          </div>
          <div className="form-group">
            <label>Address (Address is optional)</label>
            <textarea
              className="form-control"
              onChange={(event) => this.inputChangeHandler(event, "address")}
              value={this.props.patientData.address}
            ></textarea>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary px-3 py-2"
              onClick={this.onSubmitHandler}
            />
          </div>
        </div>
      );
    }

    let messageBoxClass = "alert lead text-center alert-danger".split(" ");
    let message = "Please add valid information.";
    if (this.props.isDone) {
      message = "Patient data updated.";
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
    console.log("[Update Register]", this.state.patientInfo);
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.UpdatePatient}>
        <h2 className="display-5 text-center">Update Patient Info</h2>
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
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <label>Patient ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Patient ID."
              onChange={(event) => this.inputChangeHandler(event, "name")}
              value={this.state.patientId}
              disabled={this.props.loaded}
            />
          </div>
          {formControls}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.patient.loading,
    loaded: state.patient.loaded,
    error: state.patient.error,
    token: state.auth.token,
    patientData: state.patient.patientData,
    isDone: state.patient.isDone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPatientInfo: (patientId, token) =>
      dispatch(actions.getPatientInfo(patientId, token)),
    onChangePatientData: (event, identifier) =>
      dispatch(actions.updatePatientData(event, identifier)),
    onPatientUpdate: (data, token) =>
      dispatch(actions.updatePatient(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePatient);
