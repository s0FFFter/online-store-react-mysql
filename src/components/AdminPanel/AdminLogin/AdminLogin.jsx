// to do in the future
// to do in the future
// to do in the future

import React, { useState } from "react";

function AdminLogin(props) {
  const initialAdmin = {
    login: "admin",
    password: "admin",
  };

  const [admin, setAdmin] = useState(initialAdmin);
  const [fail, setFail] = useState(false);
  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setAdmin({
      ...admin,
      [key]: value,
    });
  };
  const adminLogin = () => {
    // const rawData = JSON.stringify(admin);
    // const requestOptions = {
    //   method: "POST",
    //   body: rawData,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch("http://localhost:4000/admin/login", requestOptions)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === "Success Login") {
    //       setFail(false);
    //       props.logIn(true);
    //     } else if (response.status === "Wrong login or password") {
    //       setFail(true);
    //     }
    //   })
    //   .catch((error) => console.log("frontend error", error));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    adminLogin();
  };
  return (
    <div className="col-md-6 my-2">
      <h3 className="text-secondary">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            value={admin.login}
            onChange={handleChange}
            type="text"
            name="login"
            className="form-control"
            required
          />
          <small className="form-text text-muted">login: admin</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={admin.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            required
          />
          <small className="form-text text-muted">password: admin</small>
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

export default AdminLogin;
