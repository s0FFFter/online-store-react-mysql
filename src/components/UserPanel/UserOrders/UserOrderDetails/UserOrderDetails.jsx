import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../../../services/user.service";

function UserOrderDetails(props) {
  const order = props.order;
  const id = order.orderId;
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderDetails = () => {
    userService.getOrderDetails(id).then((data) => {
      if (data) {
        setOrderDetails(data);
      }
    });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="row align-items-center py-3 border-bottom">
      <div className="col-6 col-lg-2 font-weight-bold">{order.orderNumber}</div>
      <div className="col-12 col-lg-5">{order.orderAddress}</div>
      <div className="col-6 col-lg-2 font-weight-bold">
        $ {order.orderAmount}
      </div>

      <div className="col-8 col-lg-2 my-1">
        <button
          className="btn btn-warning btn-block px-0"
          data-toggle="collapse"
          data-target={"#collapse" + id}
          aria-expanded="false"
          aria-controls={"collapse" + id}
        >
          Show details
        </button>
      </div>
      <div className="col-4 col-lg-1 my-1">
        <button className="btn btn-danger btn-block px-0" disabled>
          Delete
        </button>
      </div>
      <div className="col-12 collapse my-1 px-0" id={"collapse" + id}>
        <div className="row align-items-center mb-1">
          <div className="col-0 col-lg-1 text-right"></div>
          <div className="col-12 col-lg-7 text-center">
            <small>Product Name</small>
          </div>
          <div className="col-6 col-lg-2 text-right">
            <small>Product Price</small>
          </div>
          <div className="col-6 col-lg-2">
            <small>Quantity</small>
          </div>
        </div>
        {orderDetails.map((product, i) => {
          i++;
          return (
            <div className="row align-items-center my-1" key={i + "product"}>
              <div className="col-2 col-lg-1 text-right">{i}.</div>

              <div className="col-10 col-lg-7 text-primary">
                <Link to={`/product/${product.detailProductId}`}>
                  {product.detailName}
                </Link>
              </div>

              <div className="col-6 col-lg-2 text-right">
                $ {product.detailPrice}
              </div>
              <div className="col-6 col-lg-2">
                x {product.detailQuantity} pcs.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserOrderDetails;
