import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_START,
  LOGOUT,
} from "../actions/actionTypes";

// let user = JSON.parse(localStorage.getItem("user"));
// const initialState = user ? { loggedIn: true, user } : {};
const initialState = { loggedIn: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case AUTH_FAIL:
      return {
        loggedIn: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
