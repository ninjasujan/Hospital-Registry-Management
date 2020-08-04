import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";

const registrationStarted = () => {
  return {
    type: actionTypes.PATIENT_REGISTER_STARTED,
  };
};

const registrationSuccess = () => {
  return {
    type: actionTypes.PATIENT_REGISTER_SUCCESS,
  };
};

const registrationFailed = (error) => {
  return {
    type: actionTypes.PATIENT_REGISTER_FAILED,
    error: error,
  };
};

export const registerPatient = (data, token) => {
  console.log("[NewRegister.js] Initiated.");
  return (dispatch) => {
    dispatch(registrationStarted());
    axios
      .post("/patient/register", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("[NewRegister.js] response", response);
        dispatch(registrationSuccess());
      })
      .catch((err) => {
        dispatch(registrationFailed(err.response.data.error));
      });
  };
};

const getPatientInfoStart = () => {
  return {
    type: actionTypes.GET_PATIENT_INFO_STARTED,
  };
};

const getPatientInfoSuccess = (patientData) => {
  return {
    type: actionTypes.GET_PATIENT_INFO_SUCCESS,
    patientData: patientData,
  };
};

const getPatientInfoFailed = (error) => {
  return {
    type: actionTypes.GET_PATIENT_INFO_FAILED,
    error: error,
  };
};

export const getPatientInfo = (patientId, token) => {
  console.log("[Patient ID, token]", patientId, token);
  return (dispatch) => {
    dispatch(getPatientInfoStart());
    console.log("Next");
    axios
      .get("/patient/update/" + patientId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("[Patient Data]", response);
        dispatch(getPatientInfoSuccess(response.data.patientData));
      })
      .catch((err) => {
        dispatch(getPatientInfoFailed(err.response.data.error));
        console.log("[Patient Fetch Fail]", err);
      });
  };
};

const updatePatientStart = () => {
  return {
    type: actionTypes.UPDATE_PATIENT_STARTED,
  };
};

const updatePatientSuccess = () => {
  return {
    type: actionTypes.UPDATE_PATIENT_SUCCESS,
  };
};

const updatePatientFailed = (error) => {
  return {
    type: actionTypes.UPDATE_PATIENT_FAILED,
    error: error,
  };
};

export const updatePatient = (updatedData, token) => {
  return (dispatch) => {
    dispatch(updatePatientStart());
    axios
      .post("/patient/update", updatedData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("[Update Patient Response]", response);
        dispatch(updatePatientSuccess());
      })
      .catch((err) => {
        dispatch(updatePatientFailed(err.response.data.error));
      });
  };
};

export const updatePatientData = (value, identifier) => {
  return {
    type: actionTypes.ON_CHANGE_UPDATE,
    value: value,
    identifier: identifier,
  };
};

const deletePatientStarts = () => {
  return {
    type: actionTypes.DELETE_PATIENT_STARTED,
  };
};

const deletePatientSuccess = (error) => {
  return {
    type: actionTypes.DELTE_PATIENT_SUCCESS,
    error: error,
  };
};

const deletePatientFailed = (error) => {
  return {
    type: actionTypes.DELTE_PATIENT_FAILED,
    error: error,
  };
};

export const deletePatient = (id, token) => {
  console.log("[delete token]", token, id);
  return (dispatch) => {
    dispatch(deletePatientStarts());
    axios
      .delete("/patient/delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // console.log("[Patient Deleted]", response.data.message);
        dispatch(deletePatientSuccess());
      })
      .catch((err) => {
        dispatch(deletePatientFailed(err.response.data.error));
      });
  };
};
