import React, { useEffect, useState } from "react";
import AdminProduct from "./AdminProduct/AdminProduct";
import { productService } from "../../../services/product.service";

// in case SQL DB server is down:
import { exampleProducts } from "../../../services/products.examples";

function AdminProducts() {
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

  const productDelete = (id) => {
    console.log(id);
    productService.deleteProduct(id).then((response) => {
      if (response && response.message) {
        console.log(response.message);
      }
      productsFetch();
    });
  };

  useEffect(() => {
    productsFetch();
  }, []);

  return (
    <div className="container px-0 mt-4">
      <div className="col">
        <h1>Products:</h1>
        {!dbStatus && (
          <small style={{ color: "red" }}>
            mySQL server is down/restarting. Products imported from .js
          </small>
        )}
      </div>
      {/* Products: */}
      <div className="d-flex flex-column">
        {/* Product: */}
        {products.map((product) => (
          <AdminProduct
            product={product}
            key={product.productId}
            delete={productDelete}
            productsFetch={productsFetch}
          />
        ))}
        {/* Product End */}
      </div>
    </div>
  );
}

export default AdminProducts;
