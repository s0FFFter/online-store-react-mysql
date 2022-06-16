import React, { useState } from "react";
import { Link } from "react-router-dom";
import testImg from "../../../../images/testProduct.jpg";
import { productService } from "../../../../services/product.service";

import * as server from "../../../../services/server.constants";

function AdminProduct(props) {
  const p = props.product;
  const id = p.productId;

  const [editedProduct, setEditedProduct] = useState(p);
  const [editVisible, setEditVisible] = useState(false);

  const onEdit = () => {
    console.log(p.productId);
    setEditVisible(!editVisible);
  };
  const onDelete = () => {
    props.delete(p.productId);
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setEditedProduct({
      ...editedProduct,
      [key]: value,
    });
  };

  // edit product
  const handleSubmit = (event) => {
    event.preventDefault();
    productService.updateProduct(editedProduct, id).then((data) => {
      if (data && data.message) {
        console.log(data.message);
      }
      props.productsFetch();
    });
  };

  return (
    <div className="row align-items-center border-top py-1">
      <div className="col-4 col-lg-2">
        <Link to={`/product/${p.productId}`}>
          <img
            src={
              p.productImage ? `${server.API_URL}/${p.productImage}` : testImg
            }
            className="card-img-top"
            alt={p.productName}
          />
        </Link>
      </div>
      <div className="col-4 col-lg-1">
        <button onClick={onDelete} className="btn btn-danger btn-block px-0">
          Delete
        </button>
      </div>
      <div className="col-4 col-lg-1">
        <button
          onClick={onEdit}
          className="btn btn-warning btn-block px-0"
          data-toggle="collapse"
          data-target={"#collapse" + id}
          aria-expanded="false"
          aria-controls={"collapse" + id}
        >
          Edit
        </button>
      </div>
      <div className="col-12 col-lg-4">
        <h5>{p.productName}</h5>
      </div>
      <div className="col-6 col-lg-2">
        <p className="text-right">${p.productPrice}</p>
      </div>
      <div className="col-6 col-lg-2">
        <p className="text-right">x {p.productStock} pcs.</p>
      </div>

      <form
        className="col-12 mb-3 collapse"
        id={"collapse" + id}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            value={editedProduct.productName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            value={editedProduct.productPrice}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="productPrice"
            maxLength="12"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productStock">Stock</label>
          <input
            value={editedProduct.productStock}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="productStock"
            maxLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDesc">Description</label>
          <textarea
            value={editedProduct.productDesc}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productDesc"
            rows="4"
          />
        </div>

        <button className="btn btn-secondary pull-right">Submit changes</button>
      </form>
    </div>
  );
}

export default AdminProduct;
