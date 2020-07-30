import React, { Component } from "react";
import classes from "./UpdatePatient.module.css";

class UpdatePatient extends Component {
  render() {
    return (
      <div className={classes.UpdatePatient}>
        <h2 className="display-5 text-center">Update Patient Info</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name."
              // onChange={(event) => this.inputChangeHandler(event, "name")}
              // value={this.state.patientData.name}
            />
          </div>
          <div className="form-group text-center">
            <button
              className="btn btn-primary px-5 py-2"
              // onClick={this.onSubmitHandler}
            >
              Submit
            </button>
          </div>
        </form>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name."
              // onChange={(event) => this.inputChangeHandler(event, "name")}
              // value={this.state.patientData.name}
            />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your name."
              // onChange={(event) => this.inputChangeHandler(event, "name")}
              // value={this.state.patientData.name}
            />
          </div>
          <div className="form-group">
            <label>Birth Date(optional)</label>
            <input
              type="date"
              className="form-control"
              placeholder="Your name."
              // onChange={(event) => this.inputChangeHandler(event, "name")}
              // value={this.state.patientData.name}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              // onChange={(event) => this.inputChangeHandler(event, "name")}
              // value={this.state.patientData.name}
            />
          </div>

          <div className="form-group">
            <label>Address (Address is optional)</label>
            <textarea className="form-control" />
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePatient;
