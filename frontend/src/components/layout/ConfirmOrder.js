import React from 'react'
import CheckOut from './CheckOut';
import { useSelector } from 'react-redux';
import MetaData from '../MetaData';
import "./ConfirmOrder.css";
import {useHistory, Link} from "react-router-dom"
import { Typography } from '@material-ui/core';


const ConfirmOrder = () => {

    const history = useHistory();
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const {user} = useSelector((state)=>state.user);
    console.log(shippingInfo)
 
    const subtotal = cartItems.reduce(
        (acc, item) =>(item.quantity == 500 ? acc + item.price : acc + 2 * item.price),
        0
      );    
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.05;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}`;
    
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        history.push("/process/payment");
      };
    
      return (
        <>
          <MetaData title="Confirm Order" />
          <CheckOut activeSteps={1} />
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNumber}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{address}</span>
                  </div>
                </div>
              </div>
              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div key={item.product}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>{" "}
                        <span>
                          {item.quantity}g  {item.quantity == 500 ? " ": 2} x ₹{item.price} ={" "}
                          <b>₹{item.quantity == 500 ? item.price : 2 * item.price}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div>
              <div className="orderSummary">
                <Typography>Order Summery</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{shippingCharges}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{tax}</span>
                  </div>
                </div>
    
                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{totalPrice}</span>
                </div>
    
                <button onClick={proceedToPayment}>Proceed To Payment</button>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default ConfirmOrder;