import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartService } from "../../../services/cart.service";
import { userService } from "../../../services/user.service";
import { authActions, userActions } from "../../../actions";

function CartAddress(props) {
  const user = useSelector((state) => state.userReducer);
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const [userData, setUserData] = useState(user);

  const dispatch = useDispatch();

  // check token is valid and user is login
  const auth = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      userService.auth().then((data) => {
        if (!data) {
          dispatch(authActions.authFail(data.message));
          dispatch(userActions.getUserDataFail());
          console.log("authorized:", data);
          userService.logout();
        }
        if (data) {
          dispatch(authActions.authSuccess());
          console.log("authorized:", data);
          fetchUserData();
        }
      });
    } else {
      dispatch(authActions.authFail("No Token!"));
    }
  };

  const fetchUserData = () => {
    userService.getUserData().then(
      (data) => {
        if (data) {
          dispatch(userActions.getUserDataSuccess(data));
          setUserData(data);
        }
      },
      (error) => {
        dispatch(authActions.authFail(error));
        dispatch(userActions.getUserDataFail());
      }
    );
  };

  const createNewOrder = () => {
    const products = props.products; // array of products
    const numberDate = Math.round(Date.now() / 1000);
    const order = {
      orderNumber: numberDate,
      orderCustomerId: userData.customerId,
      orderAmount: props.totalPrice,
      orderAddress: userData.customerAddress,
    };
    const orderData = {
      order: order,
      products: products,
    };

    cartService.createNewOrder(orderData).then((data) => {
      if (data && data.message) {
        console.log(data.message);
      }
      window.location.reload(false);
    });
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  useEffect(() => {
    auth();
    // fetchUserData();
  }, []);
  return (
    <Fragment>
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5 className="mr-auto">Shipping Address</h5>
        </div>
        <div className="card-body row">
          <form className="col-md-6">
            <div className="form-group">
              <label htmlFor="customerName">Name:</label>
              <input
                value={userData.customerName}
                onChange={handleChange}
                type="text"
                className="form-control"
                name="customerName"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerLastname">Lastname:</label>
              <input
                value={userData.customerLastname}
                onChange={handleChange}
                type="text"
                className="form-control"
                name="customerLastname"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerAddress">Address:</label>
              <textarea
                value={userData.customerAddress}
                onChange={handleChange}
                type="text"
                className="form-control"
                name="customerAddress"
                rows="4"
                required
              />
            </div>
          </form>
          <div className="col-md-6 d-flex flex-column">
            <ul className="list-group">
              {props.products.map((p) => {
                return (
                  <li
                    key={p.productId}
                    className="list-group-item d-flex justify-content-between align-items-center py-1"
                  >
                    {p.productName.length > 14
                      ? p.productName.substring(0, 12) + " ..."
                      : p.productName}
                    <span className="badge badge-primary badge-pill">
                      {p.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            <fieldset className="form-group mt-4">
              <div className="row">
                <legend className="col-form-label col-6">
                  Shipping method:
                </legend>
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderShipping"
                      value="20"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      DHL - $0
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderShipping"
                      value="10"
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios1"
                    >
                      DPD - $0
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="card-footer">
          <h5 className="pull-right">
            <span className="text-muted">Total price: </span>${props.totalPrice}
          </h5>
        </div>
      </div>
      <div className="my-3 ml-auto d-flex flex-row">
        {props.products.length === 0 && (
          <Link
            to={`/home`}
            style={{ color: "#f75050", textDecoration: "none" }}
            className="form-text text-danger mx-2"
          >
            <small className="align-middle">Add product to Cart</small>
          </Link>
        )}
        {!loggedIn && (
          <Link
            to={`/user`}
            style={{ color: "#f75050", textDecoration: "none" }}
            className="form-text text-danger mx-2"
          >
            <small className="align-middle">Login to continue</small>
          </Link>
        )}

        <button
          onClick={createNewOrder}
          className="btn btn-success"
          disabled={!loggedIn || props.products.length === 0}
        >
          Finalize Order
        </button>
      </div>
    </Fragment>
  );
}

export default CartAddress;
