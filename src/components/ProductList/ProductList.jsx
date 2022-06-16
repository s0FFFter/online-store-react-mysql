import React, { useState, useEffect } from "react";
import "./ProductList.css";
import Product from "./Product/Product";

import { cartService } from "../../services/cart.service";
import { productService } from "../../services/product.service";

// in case SQL DB server is down:
import { exampleProducts } from "../../services/products.examples";

function ProductList() {
  const [products, setProducts] = useState(exampleProducts);
  const [dbStatus, setDbStatus] = useState(true);

  const productsFetch = () => {
    productService.getAllProducts().then((data) => {
      if (data) {
        setProducts(data);
        setDbStatus(true);
      } else {
        setDbStatus(false);
      }
    });
  };

  // const productDelete = (id) => {
  //   console.log(id);
  //   productService.deleteProduct(id).then((data) => {
  //     console.log(data.message);
  //     productsFetch();
  //   });
  // };

  const addProductToCart = (product) => {
    cartService.addProductToCart(product);
    console.log("Add to Cart: " + product.productName);
  };

  useEffect(() => {
    productsFetch();
  }, []);

  return (
    <div className="container-xl">
      <div className="col">
        <h1>Products:</h1>
        {!dbStatus && (
          <small style={{ color: "red" }}>
            mySQL server is down/restarting. Products imported from .js
          </small>
        )}
      </div>
      {/* Products: */}
      <div className="row">
        {/* Product: */}
        {products.map((product) => (
          <Product
            product={product}
            key={product.productId}
            // delete={productDelete}
            toCart={addProductToCart}
          />
        ))}
        {/* Product End */}
      </div>
    </div>
  );
}

export default ProductList;
