import * as actionTypes from "../action/actionTypes";

const initialState = {
  loading: false,
  error: null,
  isRegistered: false,
};

const registerStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    isRegistered: false,
  };
};

const registerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    isRegistered: true,
  };
};

const registerFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    isRegistered: false,
  };
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_REGISTER_STARTED:
      return registerStarted(state, action);

    case actionTypes.PATIENT_REGISTER_SUCCESS:
      return registerSuccess(state, action);

    case actionTypes.PATIENT_REGISTER_FAILED:
      return registerFailed(state, action);

    default:
      return state;
  }
};

export default patientReducer;
