import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";

const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_STARTED,
  };
};

const signupSuccess = () => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
};

const signupFailed = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    error: error,
  };
};

const loginStarted = () => {
  return {
    type: actionTypes.LOGIN_STARTED,
  };
};

const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
  };
};

const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error: error,
  };
};

export const signup = (authData) => {
  return (dispatch) => {
    dispatch(signupStart());
    axios
      .post("auth/signup", authData)
      .then((response) => {
        // console.log("[Sign-Up response]", response);
        dispatch(signupSuccess());
      })
      .catch((err) => {
        dispatch(signupFailed(err.response.data.error));
      });
  };
};

export const login = (authData) => {
  return (dispatch) => {
    dispatch(loginStarted());
    axios
      .post("/auth/login", authData)
      .then((response) => {
        console.log("[Login response]", response);
        dispatch(loginSuccess(response.data.token));
      })
      .catch((err) => {
        dispatch(loginFailed(err.response.data.error));
      });
  };
};
