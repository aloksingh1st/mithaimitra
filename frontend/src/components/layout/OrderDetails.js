import React, {useEffect,useState} from 'react'
import "./OrderDetail.css"
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import Loader from './Loader/Loader'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import CartProduct from './CartProduct'



const OrderDetails = () => {

  const alert = useAlert();
  const {id} = useParams();
  
  const [orderState, setOrderState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState(null);

  const {user} = useSelector((state)=>state.user);


  useEffect(() => {
    async function fetchOrders() {
      const resp = await fetch(`/order/${id}`);
      let actData = await resp.json();
      setOrderState(actData.order.orderItems);
    }
    fetchOrders();
    setLoading(false)
  }, [id]);
  


  return (
  
    <>

    {orderState && orderState.map((order)=>(
        <CartProduct
        image={order.image}
        name={order.name}
        price={order.quantity == 500 ? order.price : 2 * order.price}
        quantity={order.quantity}
        product={order.product}
        showButton="no_show"
      />
    ))}
      {/* {loading ? (
        <Loader />
      ) : (
        <>

        <div className="heading_container">
          <h2>
            {user.name}'s Orders
          </h2>
        </div>

        {orderState.map((items)=>
        <div>hee</div>
        )};

           */}
    {/* <section className="cart_container" >
      <figure>
          <img src={orderState[0].image} alt="" />
      </figure>

      <div className="cart_details_container">
          <div className="text_container">

          <h1>{orderState[0].name}</h1>
          <h2>₹{orderState[0].quantity == 500 ? orderState[0].price : orderState[0].price*2}</h2>
          <h2>Amount :- {orderState[0].quantity}g</h2>
          </div>

          <div className="button_contaner">
          </div>
      </div>
  </section> */}
          {/* ))} */}
        {/* </>
      )} */}
    </>
    );
  };
export default OrderDetails