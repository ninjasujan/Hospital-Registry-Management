import React, { Component } from "react";
import classes from "./Signup.module.css";
import * as actions from "../../../store/action/auth";
import { connect } from "react-redux";

import {
  nameValidate,
  emailValidate,
  passwordValidate,
  reTypeValidate,
} from "../../../Utility/validator";
import Spinner from "../../../component/UI/Spinner/Spinner";

class Signup extends Component {
  state = {
    authData: {
      name: "Sujan Poojary",
      userName: "sujan@gmail.com",
      password: "1234567",
      confirmPassword: "1234567",
      key: "",
    },
    isValidForm: false,
    inputError: "Please add all credentials",
  };

  inputChangeHandler = (input, identifier) => {
    const updatedAuthData = { ...this.state.authData };
    updatedAuthData[identifier] = input.target.value;
    this.setState({ authData: updatedAuthData });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    let isValid = true;
    let msg = null;
    if (isValid && !nameValidate(this.state.authData.name)) {
      isValid = false;
      msg = "Please add correct Name.";
    }
    if (isValid && !emailValidate(this.state.authData.userName)) {
      isValid = false;
      msg = "Please add correct User Name.";
    }
    if (isValid && !passwordValidate(this.state.authData.password)) {
      isValid = false;
      msg = "Password must be at least 7 char long.";
    }
    if (
      isValid &&
      !reTypeValidate(
        this.state.authData.password,
        this.state.authData.confirmPassword
      )
    ) {
      isValid = false;
      msg = "Please confirm your Password";
    }

    if (isValid) {
      this.setState((prevState) => {
        return {
          isValidForm: true,
          inputError: null,
        };
      });
      this.props.onSignupHandler(this.state.authData);
    } else {
      this.setState((prevState) => {
        return {
          isValidForm: false,
          inputError: msg,
        };
      });
    }
  };

  render() {
    const inputClasses = ["form-group"];
    inputClasses.push(classes["InputControl"]);
    return this.props.loading ? (
      <Spinner />
    ) : (
      <form className={classes.Signup}>
        <div className="text-center">
          <h2 className="display-5 py-3">Create Account</h2>
          {!this.state.isValidForm || this.props.error ? (
            <div className="row">
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
        <div className={inputClasses.join(" ")}>
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your name."
            onChange={(event) => this.inputChangeHandler(event, "name")}
            value={this.state.authData.name}
          />
        </div>
        <div className={inputClasses.join(" ")}>
          <label>User Name</label>
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            onChange={(event) => this.inputChangeHandler(event, "userName")}
            value={this.state.authData.userName}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className={inputClasses.join(" ")}>
          <label>Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Password."
            onChange={(event) => this.inputChangeHandler(event, "password")}
            value={this.state.authData.password}
          />
        </div>
        <div className={inputClasses.join(" ")}>
          <label>Confirm your password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Retype password"
            onChange={(event) =>
              this.inputChangeHandler(event, "confirmPassword")
            }
            value={this.state.authData.confirmPassword}
          />
        </div>
        <div className={inputClasses.join(" ")}>
          <label>Enter 'Secret' key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Secret key"
            onChange={(event) => this.inputChangeHandler(event, "key")}
            value={this.state.authData.key}
          />
        </div>
        <div className="text-center">
          <input
            className="btn btn-lg btn-primary px-5"
            type="submit"
            value="Sign-Up"
            onClick={this.onSubmitHandler}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupHandler: (authData) => dispatch(actions.signup(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
