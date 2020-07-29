import * as actionTypes from "../action/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
  isSignedUp: false,
};

const signupStarts = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    isSignedUp: false,
  };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    isSignedUp: true,
  };
};

const signupFailed = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const loginStarts = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    token: null,
  };
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    token: action.token,
  };
};

const loginFaild = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const logoutStarted = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const logoutSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    token: null,
    error: null,
  };
};

const logoutFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
};

const checkSignupStarted = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const checkSignupSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    isSignedUp: true,
  };
};

const checkSignupFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    isSignedUp: false,
  };
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_STARTED:
      return signupStarts(state, action);

    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);

    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);

    case actionTypes.LOGIN_STARTED:
      return loginStarts(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_FAILED:
      return loginFaild(state, action);

    case actionTypes.LOGOUT_STARTED:
      return logoutStarted(state, action);

    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state, action);

    case actionTypes.LOGOUT_FAILED:
      return logoutFailed(state, action);

    case actionTypes.CHECK_SIGNUP_STARTED:
      return checkSignupStarted(state, action);

    case actionTypes.CHECK_SIGNUP_SUCCESS:
      return checkSignupSuccess(state, action);

    case actionTypes.CHECK_SIGNUP_FAILED:
      return checkSignupFailed(state, action);

    default:
      return state;
  }
};

export default authReducers;
