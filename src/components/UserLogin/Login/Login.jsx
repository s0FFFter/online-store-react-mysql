import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../actions";
import { userService } from "../../../services/user.service";

function Login() {
  const initialUser = {
    login: "test",
    password: "test",
  };
  const [user, setUser] = useState(initialUser);
  const [fail, setFail] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setUser({
      ...user,
      [key]: value,
    });
  };

  const login = () => {
    userService.login(user.login, user.password).then(
      (data) => {
        if (data) {
          setFail(false);
          dispatch(authActions.authSuccess(data));
        } else {
          setFail(true);
        }
      },
      (error) => {
        dispatch(authActions.authFail(error));
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
    // window.location.reload(false);
  };
  return (
    <div className="col-md-6 my-2">
      <h3 className="text-secondary">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            value={user.login}
            onChange={handleChange}
            type="text"
            name="login"
            className={"form-control" + (!user.login ? " is-invalid" : "")}
            required
          />
          <small className="form-text text-muted">login: test</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={handleChange}
            type="password"
            name="password"
            className={"form-control" + (!user.password ? " is-invalid" : "")}
            required
          />
          <small className="form-text text-muted">password: test</small>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {fail && (
          <small className="form-text text-danger">
            Wrong login or password.
          </small>
        )}
      </form>
    </div>
  );
}

export default Login;
