import axios from 'axios';
import React, { useEffect, useState } from 'react';
import store from "../../Store"
import CheckOut from './CheckOut';
import "./payment.css"
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";

function Payment() {

  const alert = useAlert();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const [orderAmount, setOrderAmount] = useState();
  const [orders, setOrders] = useState([]);
  
  const user = store.getState().user.user
  

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingInfo = JSON.parse(sessionStorage.getItem("shipingDetails"));


  const add = shippingInfo.address
  const city = shippingInfo.city
  const pincode = shippingInfo.pincode;
  const name = user.name;
  const email = user.email;
  const userId = user._id;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const address = add.concat(" ", city, " ", pincode);
  const orderAmount = Math.floor(orderInfo.totalPrice);

  function loadRazorpay() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert.error('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post('/create-order', {
          amount: orderAmount + '00',
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get('/get-razorpay-key');

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: user.name,
          description: orderAmount,
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post('/pay-order', {
              shippingInfo,
              orderItems: cartItems,
              itemsPrice: orderInfo.subtotal,
              taxPrice: orderInfo.tax,
              shippingPrice: orderInfo.shippingCharges,
              totalPrice: orderInfo.totalPrice,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },{
              headers: {
                "Content-Type": "application/json",
              },
            });
            alert.success(result.data.msg);
            history.push("/success");
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNumber,
          },
          notes: {
            address: orderInfo.address,
          },
          theme: {
            color: '#a82a37',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <>
    <CheckOut activeSteps={2} />
    <div className="final_order_pay_container">
      <hr />
              <button disabled={loading} onClick={loadRazorpay}>
          Pay Now
        </button>
        {loading && <div>Loading...</div>}
    </div>
    </>
  );
}

export default Payment;