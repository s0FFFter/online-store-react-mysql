import React, { useState } from "react";
import "./CartProduct.css";
import testImg from "../../../../images/testProduct.jpg";
import { Link } from "react-router-dom";
import * as server from "../../../../services/server.constants";

function CartProduct(props) {
  const minQuantity = 1,
    maxQuantity = 100;
  const product = props.product;
  const price = product.productPrice * product.quantity;
  const [totalPrice, setTotalPrice] = useState(price);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartIndex = cartProducts.findIndex(
    (p) => p.productId === product.productId
  );

  const checkQuantityPrice = (e) => {
    setNewQuantity(e.quantity);
    setTotalPrice(e.productPrice * e.quantity);
    props.checkPrice();
  };

  // todo move this fhunctions to services/cart.service.js
  const incrementQuantity = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    if (product.quantity < maxQuantity) {
      product.quantity++;
      cartProducts.splice(cartIndex, 1, product);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
    checkQuantityPrice(product);
  };
  const decrementQuantity = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    if (product.quantity >= minQuantity) {
      product.quantity--;
      if (product.quantity <= 0) {
        cartProducts.splice(cartIndex, 1);
        window.location.reload(false);
      } else {
        cartProducts.splice(cartIndex, 1, product);
      }
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
    checkQuantityPrice(product);
    if (cartProducts.length === 0) {
      localStorage.removeItem("cartProducts");
    }
  };
  const handleQuantityChange = (event) => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    product.quantity = event.target.value;
    if (product.quantity <= 0) {
      cartProducts.splice(cartIndex, 1);
      window.location.reload(false);
    } else {
      cartProducts.splice(cartIndex, 1, product);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    checkQuantityPrice(product);
    if (cartProducts.length === 0) {
      localStorage.removeItem("cartProducts");
    }
  };

  const onDelete = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    product.quantity = 0;
    cartProducts.splice(cartIndex, 1);
    window.location.reload(false);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    checkQuantityPrice(product);
    if (cartProducts.length === 0) {
      localStorage.removeItem("cartProducts");
    }
  };

  return (
    <div className="card-body">
      <div className="row">
        <div className="col-md">
          <Link to={`/products/${product.productId}`}>
            <img
              className="cartImg"
              src={
                product.productImage
                  ? `${server.API_URL}/${product.productImage}`
                  : testImg
              }
              //  src={testImg}
              alt="testImg"
            />
          </Link>
        </div>
        <div className="col-md">
          <Link
            to={`/products/${product.productId}`}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <h5>{product.productName}</h5>
          </Link>
          <p>
            {product.productDesc.length > 100
              ? product.productDesc.substring(0, 100) + " ..."
              : product.productDesc}
          </p>
        </div>
        <div className="col-md row align-items-center px-0 m-0">
          <div className="col-4">
            <div className="quantity ">
              <input
                onClick={incrementQuantity}
                type="button"
                value="+"
                className="countBtn"
              />
              <input
                type="number"
                min={minQuantity}
                max={maxQuantity}
                step="1"
                className="countItem text-right"
                value={newQuantity}
                onChange={handleQuantityChange}
              />
              <input
                onClick={decrementQuantity}
                type="button"
                value="-"
                className="countBtn"
              />
            </div>
          </div>
          <div className="col-5">
            <h6 className="my-0">x $ {product.productPrice}</h6>
          </div>
          <div className="col-3">
            <button onClick={onDelete} className="btn btn-outline-danger">
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
