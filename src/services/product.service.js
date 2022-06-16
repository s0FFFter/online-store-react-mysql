import * as server from "./server.constants";
import { handleResponse } from "./reusable.functions";

const createNewProduct = (product) => {
  const formData = new FormData(product);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  return fetch(`${server.API_URL}/products`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

const getAllProducts = () => {
  return fetch(`${server.API_URL}/products`)
    .then(handleResponse)
    .then((products) => {
      return products;
    })
    .catch((error) => console.log("frontend error", error));
};

const getProduct = (productId) => {
  return fetch(`${server.API_URL}/products/${productId}`)
    .then(handleResponse)
    .then((product) => {
      return product;
    })
    .catch((error) => console.log("frontend error", error));
};

const updateProduct = (editedProduct, productId) => {
  const rawData = JSON.stringify(editedProduct);
  const requestOptions = {
    method: "PATCH",
    body: rawData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${server.API_URL}/products/${productId}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

const deleteProduct = (productId) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${server.API_URL}/products/${productId}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

export const productService = {
  createNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
