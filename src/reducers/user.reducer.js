import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
} from "../actions/actionTypes";

const initialState = {
  customerId: "",
  customerName: "",
  customerLastname: "",
  customerAddress: "",
  login: "",
  password: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return action.userData;
    case GET_USER_DATA_FAIL:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
