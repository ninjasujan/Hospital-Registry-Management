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
        localStorage.setItem("token", response.data.token);
      })
      .catch((err) => {
        console.log("[Login.js] Failed", err.response);
        dispatch(loginFailed(err.response.data.error));
      });
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(loginFailed());
    } else {
      dispatch(loginSuccess(token));
    }
  };
};

const logoutStarted = () => {
  return {
    type: actionTypes.LOGOUT_STARTED,
  };
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const logoutFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStarted());
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logoutFailed("Please login first"));
    } else {
      localStorage.removeItem("token");
      dispatch(logoutSuccess());
    }
  };
};

const checkSignupStarted = () => {
  return {
    type: actionTypes.CHECK_SIGNUP_STARTED,
  };
};

const checkSignupSuccess = () => {
  return {
    type: actionTypes.CHECK_SIGNUP_SUCCESS,
  };
};

const checkSignupFailed = () => {
  return {
    type: actionTypes.CHECK_SIGNUP_FAILED,
  };
};

export const checkSignup = () => {
  return (dispatch) => {
    dispatch(checkSignupStarted());
    axios
      .get("/auth/signup")
      .then((response) => {
        console.log("[Check Signup sucsess]", response);
        dispatch(checkSignupSuccess());
      })
      .catch((err) => {
        console.log("[Check signup failed]", err.response);
        dispatch(checkSignupFailed());
      });
  };
};
