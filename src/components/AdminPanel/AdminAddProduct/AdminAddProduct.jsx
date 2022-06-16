import React, { useState } from "react";
import "./AdminAddProduct.css";
import { productService } from "../../../services/product.service";

function AdminAddProduct() {
  const initialnewProduct = {
    productName: "",
    productPrice: 0,
    productStock: 0,
    productImage: "",
    productDesc: "",
  };
  const initialImage = {
    file: "",
    imagePreviewUrl: "",
  };
  const [newProduct, setNewProduct] = useState(initialnewProduct);
  const [imagePreview, setImagePreview] = useState(initialImage);

  const resetForm = () => {
    setNewProduct(initialnewProduct);
    setImagePreview(initialImage);
  };

  const handleChange = (event) => {
    const key = event.target.name,
      value = event.target.value;
    setNewProduct({
      ...newProduct,
      [key]: value,
    });
  };

  // show uploading image
  const handleImageChange = (event) => {
    handleChange(event);
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onload = () => {
      setImagePreview({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    productService.createNewProduct(event.target).then((data) => {
      if (data && data.message) {
        console.log(data.message);
      }
      resetForm();
    });
  };

  return (
    <div className="container">
      <h2>Add new product:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Name</label>
          <input
            value={newProduct.productName}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            value={newProduct.productPrice}
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
            value={newProduct.productStock}
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
            value={newProduct.productDesc}
            onChange={handleChange}
            type="text"
            className="form-control"
            name="productDesc"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Image</label>
          <input
            value={newProduct.productImage}
            onChange={handleImageChange}
            type="file"
            className="form-control-file"
            name="productImage"
            accept="image/*"
            disabled
            // multiple
          />
        </div>
        <div className="form-group">
          {imagePreview.imagePreviewUrl ? (
            <img
              className="imgPreview"
              src={imagePreview.imagePreviewUrl}
              alt="imgPreview"
            />
          ) : (
            <div className="previewText">
              Please select an Image for Preview
            </div>
          )}
        </div>
        <button className="btn btn-secondary">Submit</button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
