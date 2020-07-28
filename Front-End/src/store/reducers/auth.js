import * as actionTypes from "../action/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const signupStarts = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
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

    default:
      return state;
  }
};

export default authReducers;
