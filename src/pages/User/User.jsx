import React, { useState, Fragment, useEffect } from "react";
import Login from "../../components/UserLogin/Login/Login";
import Register from "../../components/UserLogin/Register/Register";
import UserPanel from "../../components/UserPanel/UserPanel";
import { useDispatch, useSelector } from "react-redux";

import { userActions, authActions } from "../../actions";
import { userService } from "../../services/user.service";

function User() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const dispatch = useDispatch();

  // check token is valid and user is login
  const auth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      userService.auth().then((data) => {
        if (!data) {
          dispatch(authActions.authFail(data));
          dispatch(userActions.getUserDataFail());
          console.log("authorized:", data);
          userService.logout();
        }
        if (data) {
          dispatch(authActions.authSuccess());
          console.log("authorized:", data);
        }
      });
    } else {
      dispatch(authActions.authFail("No Token!"));
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <Fragment>
      {!loading && (
        <div className="container-xl">
          <h1>Hello {user.customerName ? user.customerName : "User"}!</h1>
          <div className="row">
            {loggedIn ? (
              <UserPanel logIn={loggedIn} />
            ) : (
              <Fragment>
                <Login />
                <Register />
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default User;
