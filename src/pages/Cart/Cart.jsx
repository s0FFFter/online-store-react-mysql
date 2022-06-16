import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartProductList from "../../components/ShoppingCart/CartProductList/CartProductList";
import CartAddress from "../../components/ShoppingCart/CartAddress/CartAddress";

function Cart() {
  const [showShipping, setShowShipping] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartProducts = () => {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    setProducts(cartProducts);
  };
  const showAddress = () => {
    setShowShipping(!showShipping);
    fetchCartProducts();
  };
  const setPrice = (price) => {
    setTotalPrice(price);
  };
  useEffect(() => {
    fetchCartProducts();
  }, []);
  return (
    <div className="d-flex flex-column">
      <CartProductList setPrice={setPrice} refresh={fetchCartProducts} />
      <button onClick={showAddress} className="btn btn-info my-3 ml-auto">
        {/* {showShipping ? "Refresh" : "Shipping Methods"} */}
        Shipping Methods
      </button>
      <h5 style={{color: "red"}}>You dont have permission to POST, PUT, PATCH or DELETE. Only GET, sorry!</h5>
      {showShipping && (
        <CartAddress products={products} totalPrice={totalPrice} />
      )}
    </div>
  );
}

export default Cart;
