import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import testImg from "../../images/testProduct.jpg";
import { cartService } from "../../services/cart.service";

import * as server from "../../services/server.constants";

// in case SQL DB server is down:
import { productService } from "../../services/product.service";

function ProductDetail() {
  const { id } = useParams();
  const initialProduct = {
    productName: "",
    productPrice: "",
    productStock: "",
    productImage: "",
    productDesc: "",
  };
  const [product, setProduct] = useState(initialProduct);
  const [dbStatus, setDbStatus] = useState(true);

  const productFetch = () => {
    productService.getProduct(id).then((data) => {
      if (data) {
        setProduct(data);
        setDbStatus(true);
      } else {
        setDbStatus(false);
      }
    });
  };

  const addToCart = () => {
    cartService.addProductToCart(product);
    console.log("Add to Cart: " + product.productName);
  };
  useEffect(() => {
    productFetch();
  }, []);
  return (
    <div className="row border rounded">
      <div className="col-md-5">
        <img
          src={
            product.productImage
              ? `${server.API_URL}/${product.productImage}`
              : testImg
          }
          // src={testImg}
          className="card-img-top"
          alt={product.productName}
        />
      </div>
      <aside className="col-md-7 d-flex flex-column p-3">
        <h3>{product.productName}</h3>
        <h4 className="text-info">$ {product.productPrice}</h4>
        <p className="text-muted">stock: {product.productStock}</p>
        <dl className="mt-1">
          <dt>Description:</dt>
          {!dbStatus && (
            <small style={{ color: "red" }}>
              mySQL server is down/restarting.
            </small>
          )}
          <dd>{product.productDesc}</dd>
        </dl>
        <button
          onClick={addToCart}
          className="mt-auto btn btn-warning font-weight-bold"
        >
          <i
            className="fa fa-shopping-cart px-3"
            aria-hidden="true"
            style={{ fontSize: "1.3rem" }}
          />
          ADD TO CART
        </button>
      </aside>
    </div>
  );
}

export default ProductDetail;
