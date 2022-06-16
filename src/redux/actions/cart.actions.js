import * as actionTypes from "./actionTypes";

export const addProductToCart = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    newProduct: product,
  };
};

export const cartActions = {
  addProductToCart,
};
