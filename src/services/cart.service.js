import * as server from "./server.constants";
import authHeader from "./auth.service";
import { handleResponse } from "./reusable.functions";

const addProductToCart = (product) => {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  // check if product is already in cart
  const foundProduct = cartProducts.find(
    (p) => p.productId === product.productId
  );
  if (foundProduct) {
    // product already in cart, quantity + 1
    const index = cartProducts.indexOf(foundProduct);
    product.quantity = foundProduct.quantity + 1;
    cartProducts.splice(index, 1, product);
  } else {
    // no such product in cart, push to array and creat new cart in localStorage
    product.quantity = 1;
    cartProducts.push(product);
  }
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};

const createNewOrder = (orderData) => {
  const rawData = JSON.stringify(orderData);
  // create multi-row headers
  const multiHeader = new Headers(authHeader());
  multiHeader.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: rawData,
    headers: multiHeader,
  };
  return fetch(`${server.API_URL}/orders/create`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // remove old cart from local storage
      localStorage.removeItem("cartProducts");
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

export const cartService = {
  createNewOrder,
  addProductToCart,
};
