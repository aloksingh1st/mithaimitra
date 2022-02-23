import React from 'react';
import "./CartProduct.css"
import { useHistory, useParams } from 'react-router-dom';
import { removeItemsFromCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';

const CartProduct = (props) => {
    
    const history = useHistory();
    const dispatch = useDispatch()

    
    
    const goToProduct = ()=>{
        history.push(`/product/${props.product}`);
    }
    const id = props.product
    
    const removeProduct= () =>{
       dispatch(removeItemsFromCart(id));
       window.location.reload();
    }
  return <>
  <section className="cart_container" >
      <figure>
          <img src={props.image} alt="" />
      </figure>

      <div className="cart_details_container">
          <div className="text_container">

          <h1>{props.name}</h1>
          <h2>₹{props.price}</h2>
          <h2>Amount :- {props.quantity}g</h2>
          </div>

          <div className="button_contaner">
              <button className={`remover ${props.showButton}`} onClick={removeProduct}>Remove Item</button>
              <button className="remover" onClick={goToProduct}>Details</button>
          </div>
      </div>
  </section>
  </>;
};

export default CartProduct;
