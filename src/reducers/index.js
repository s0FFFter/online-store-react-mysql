import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  userReducer,
});

export default rootReducer;
