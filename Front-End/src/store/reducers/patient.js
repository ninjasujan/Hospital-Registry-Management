import * as actionTypes from "../action/actionTypes";

const initialState = {
  loading: false,
  error: null,
  isDone: false,
  loaded: false,
  patientData: null,
};

const registerStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    isDone: false,
  };
};

const registerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    isDone: true,
  };
};

const registerFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    isDone: false,
  };
};

const getPatientInfoStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    loaded: false,
    isDone: false,
    patientData: null,
  };
};

const getPatientInfoSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    loaded: true,
    patientData: { ...action.patientData },
  };
};

const getPatientInfoFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    loaded: false,
    patientData: null,
  };
};

const updatePatientStarted = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null,
    isDone: false,
  };
};

const updatePatientSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    isDone: true,
    loaded: false,
  };
};

const updatePatientFailed = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
    isDone: false,
  };
};

const updatePatientData = (state, action) => {
  return {
    ...state,
    patientData: {
      ...state.patientData,
      [action.identifier]: action.event.target.value,
    },
  };
};

const deltePatientStart = (state, action) => {
  return {
    ...state,
    isDone: false,
    loading: true,
    error: null,
  };
};

const deltePatientSuccess = (state, action) => {
  return {
    ...state,
    isDone: true,
    loading: false,
    error: null,
  };
};

const deletePatientFailed = (state, action) => {
  return {
    ...state,
    isDone: false,
    loading: false,
    error: action.error,
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

    case actionTypes.GET_PATIENT_INFO_STARTED:
      return getPatientInfoStarted(state, action);

    case actionTypes.GET_PATIENT_INFO_SUCCESS:
      return getPatientInfoSuccess(state, action);

    case actionTypes.GET_PATIENT_INFO_FAILED:
      return getPatientInfoFailed(state, action);

    case actionTypes.UPDATE_PATIENT_STARTED:
      return updatePatientStarted(state, action);

    case actionTypes.UPDATE_PATIENT_SUCCESS:
      return updatePatientSuccess(state, action);

    case actionTypes.UPDATE_PATIENT_FAILED:
      return updatePatientFailed(state, action);

    case actionTypes.ON_CHANGE_UPDATE:
      return updatePatientData(state, action);

    case actionTypes.DELETE_PATIENT_STARTED:
      return deltePatientStart(state, action);

    case actionTypes.DELTE_PATIENT_SUCCESS:
      return deltePatientSuccess(state, action);

    case actionTypes.DELTE_PATIENT_FAILED:
      return deletePatientFailed(state, action);

    default:
      return state;
  }
};

export default patientReducer;
