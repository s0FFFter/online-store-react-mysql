import { ADD_PRODUCT_TO_CART } from "../actions/actionTypes";

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return state;
    default:
      return state;
  }
};

export default cartReducer;
