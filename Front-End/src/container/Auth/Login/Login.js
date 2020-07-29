import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/action/auth";
import { emailValidate } from "../../../Utility/validator";
import classes from "./Login.module.css";
import Spinner from "../../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../../HOC/Error/Error";
import axios from "../../../axios/axios";

class Login extends Component {
  state = {
    authData: {
      userName: "sujan@gmail.com",
      password: "1234567",
    },
    isValidForm: false,
    inputError: "Enter Login credentials",
  };

  inputChangeHandler = (input, identifier) => {
    const updatedFormData = this.state.authData;
    updatedFormData[identifier] = input.target.value;
    this.setState({ authData: updatedFormData });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("[OnSubmitHandler]");
    let isValid = true;
    let msg = null;
    if (isValid && !emailValidate(this.state.authData.userName)) {
      isValid = false;
      msg = "Please enter valid User Name";
    }
    if (isValid) {
      this.setState({ isValidForm: true, inputError: null });
      this.props.onSubmitHandler(this.state.authData);
    } else {
      this.setState({ isValidForm: false, inputError: msg });
    }
  };

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <form className={classes.Login}>
        <div className="text-center py-5">
          <h2 className="lead display-4">Login</h2>
          {!this.state.isValidForm || this.props.error ? (
            <div className="row py-3">
              <div className="col-md-6 offset-sm-3 text-left">
                <div
                  className="alert alert-danger lead text-center"
                  style={{ fontSize: "0.9em" }}
                >
                  {this.state.inputError
                    ? this.state.inputError
                    : this.props.error}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="email"
            className="form-control"
            placeholder="User Name."
            onChange={(event) => this.inputChangeHandler(event, "userName")}
            value={this.state.authData.userName}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Password."
            onChange={(event) => this.inputChangeHandler(event, "password")}
            value={this.state.authData.password}
          />
        </div>
        <div className="text-center">
          <input
            className="btn btn-lg btn-primary px-5"
            type="submit"
            value="Login"
            onClick={this.onSubmitHandler}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitHandler: (authData) => dispatch(actions.login(authData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Login, axios));
