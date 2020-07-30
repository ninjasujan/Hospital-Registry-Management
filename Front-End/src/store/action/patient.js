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
