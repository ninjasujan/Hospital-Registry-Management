import React, { Component } from "react";
import classes from "./DeletePatient.module.css";
import { nameValidate } from "../../../Utility/validator";
import { connect } from "react-redux";
import * as actions from "../../../store/action/patient";
import Spinner from "../../../component/UI/Spinner/Spinner";

class DeletePatient extends Component {
  state = {
    patientId: "",
    isValidForm: false,
    error: "",
  };

  inputChangeHandler = (event) => {
    this.setState({ patientId: event.target.value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    if (!nameValidate(this.state.patientId)) {
      this.setState({ isValidForm: false, error: "Invalid Patient ID" });
    } else {
      console.log("[Token]", this.props.token);
      this.setState({ isValidForm: true, error: null });
      this.props.onDeleteHandler(this.state.patientId, this.props.token);
    }
  };

  render() {
    let messageBoxClass = "alert lead text-center alert-danger".split(" ");
    let message = "Please add valid information.";
    if (this.props.isDone) {
      message = "Patient entry deleted.";
      messageBoxClass[3] = "alert-success";
    }
    if (this.props.error) {
      message = this.props.error;
      messageBoxClass[3] = "alert-danger";
    }
    if (this.state.error) {
      message = "Please add valid patient ID";
    }
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.DeletePatient}>
        <h2 className="display-5 text-center">Delete Patient Info</h2>
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
          <div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary px-5 py-2"
                onClick={this.onSubmitHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.patient.loading,
    isDone: state.patient.isDone,
    error: state.patient.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteHandler: (patientId, token) =>
      dispatch(actions.deletePatient(patientId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePatient);
