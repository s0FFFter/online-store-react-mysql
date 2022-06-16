import React from "react";
import "./Product.css";
import testImg from "./testProduct.jpg";
import { Link } from "react-router-dom";

import * as server from "../../../services/server.constants";

function Product(props) {
  const p = props.product;
  
  // const onDelete = () => {
  //   props.delete(p.productId);
  // };

  const addToCart = () => {
    props.toCart(p);
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 product">
        <Link to={`/product/${p.productId}`}>
          <img
            src={
              p.productImage ? `${server.API_URL}/${p.productImage}` : testImg
            }
            // src={testImg}
            className="card-img-top"
            alt={p.productName}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <Link
            to={`/product/${p.productId}`}
            style={{ color: "#000", textDecoration: "none" }}
          >
            <h5 className="card-title">{p.productName}</h5>
          </Link>
          <p className="card-text">${p.productPrice}</p>
          <p className="card-text">
            <small className="text-muted">
              {p.productDesc.length > 100
                ? p.productDesc.substring(0, 100) + " ..."
                : p.productDesc}
            </small>
          </p>

          <button
            onClick={addToCart}
            className="mt-auto btn btn-warning btn-block"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
