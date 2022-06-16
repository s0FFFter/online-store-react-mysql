import React, { useState, useEffect } from "react";
import CartProduct from "./CartProduct/CartProduct";

function CartProductList(props) {
  const initialCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const [cartProducts, setCartProducts] = useState(initialCart);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkPrice = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    let price = 0;
    cartProducts.forEach((p) => {
      return (price = price + p.quantity * p.productPrice);
    });
    const newPrice = Math.round(price * 100) / 100;
    setTotalPrice(newPrice);
    props.setPrice(newPrice);
    props.refresh();
  };

  useEffect(() => {
    checkPrice();
  }, []);

  return (
    <div className="card">
      <div className="card-header bg-secondary text-white">
        <h5 className="mr-auto">Shopping Cart</h5>
      </div>
      {cartProducts.map((product, index) => (
        <CartProduct product={product} key={index} checkPrice={checkPrice} />
      ))}
      <div className="card-footer">
        <h5 className="pull-right">
          <span className="text-muted">Price: </span>${totalPrice}
        </h5>
      </div>
    </div>
  );
}

export default CartProductList;
