import * as actionTypes from "./actionTypes";

export const getUserDataSuccess = (userData) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    userData: userData,
  };
};

export const getUserDataFail = () => {
  return {
    type: actionTypes.GET_USER_DATA_FAIL,
  };
};

export const userActions = {
  getUserDataSuccess,
  getUserDataFail,
};
