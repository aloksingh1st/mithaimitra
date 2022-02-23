import React from "react";
import CartProduct from "./CartProduct";
import "./cart.css";
import { useHistory } from "react-router-dom";
import MetaData from "../MetaData";

const Cart = () => {
  const history = useHistory();

  const myData = JSON.parse(localStorage.getItem("cartItems"));
  console.log(myData);

  var itemExist = false;

  if(myData != null){

    if (myData.length > 0) {
      itemExist = true;
    }
  }

  var totalPrice = 0;

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <>
    <MetaData title={"My Cart"} />
      {itemExist ? (
        myData.map((item) => (
          <>
            <span className="hidden">
              {
                (totalPrice =
                  item.quantity == 500
                    ? totalPrice + item.price
                    : totalPrice + 2 * item.price)
              }
            </span>

            <CartProduct
              image={item.image}
              name={item.name}
              price={item.quantity == 500 ? item.price : 2 * item.price}
              quantity={item.quantity}
              product={item.product}
              showButton="true_show"
            />
          </>
        ))
      ) : (
        <>
          <p className="no_product_para">No Products were Found in your cart</p>
          <button className="btn_order link_btn"
          onClick={()=>history.push("/products")}
          >Go Back to Products</button>
        </>
      )}
       {itemExist ? <>
        <section id="totalPrice">
              <h1>
                Gross Total
                <span>₹{totalPrice}</span>
              </h1>

              <button className="btn_order" onClick={checkoutHandler}>
                Order Now
              </button>
            </section>
            </> :
            null
       }
    </>
  );
};

export default Cart;
