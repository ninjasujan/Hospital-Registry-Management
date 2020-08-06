import React, { Component } from "react";

import Layout from "./container/Layout/Layout";
import Signup from "./container/Auth/Signup/Signup";
import Logout from "./container/Auth/Logout/Logout";
import Login from "./container/Auth/Login/Login";
import * as actions from "./store/action/auth";
import Patient from "./container/Patient/Patient";
import Prescription from "./container/Prescription/Prescription";
import {
  LoginRoute,
  AuthRoute,
  SignupRoute,
} from "./Route-Protected/LoginRoute";

import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
    this.props.checkSignup();
  }
  render() {
    return (
      <Layout isLoggedIn={this.props.isAuth}>
        <Switch>
          <SignupRoute
            path="/signup"
            exact
            isSignedUp={this.props.isSignedUp}
            component={Signup}
          />
          <LoginRoute
            path="/login"
            exact
            isAuth={this.props.isAuth}
            component={Login}
          />
          <AuthRoute
            path="/logout"
            exact
            isAuth={this.props.isAuth}
            component={Logout}
          />
          <Route path="/prescription" component={Prescription} />
          <Route path="/" component={Patient} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProsp = (state) => {
  return {
    isAuth: state.auth.token !== null,
    isSignedUp: state.auth.isSignedUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoLogin: () => dispatch(actions.autoLogin()),
    checkSignup: () => dispatch(actions.checkSignup()),
  };
};

export default connect(mapStateToProsp, mapDispatchToProps)(App);
