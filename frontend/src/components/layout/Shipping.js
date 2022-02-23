import { useState } from "react";
import React from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { HiHome, FaCity,BiPin , BiPhoneCall} from "react-icons/all";
import CheckOut from "./CheckOut.js"
import {useHistory} from "react-router-dom"

const Shipping = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Kanpur");
  const [state, setState] = useState("Uttar Pradesh");
  const [pincode, setPinCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const shippingSubmit = (e) =>{
    e.preventDefault();

    if(phoneNumber.length < 10 || phoneNumber.length > 10){
      alert.error("Phone Number must be 10 digits");
    }
    else{

      const options = {address, city, state, pincode, phoneNumber }

      dispatch(
        saveShippingInfo(options)
        );

        sessionStorage.setItem('shipingDetails', JSON.stringify(options));
        
        history.push("/order/confirm");
        
      } 
  }

  return (
    <>
    <CheckOut activeSteps={0}/>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            onSubmit={shippingSubmit}
            className="shippingForm"
            encType="mutipart/form-data"
          >
            <div>
              <HiHome />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />
            </div>

            <div>
              <FaCity />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e)=>setCity(e.target.value)}
              />
            </div>

            <div>
              <BiPin />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pincode}
                onChange={(e)=>setPinCode(e.target.value)}
              />
            </div>

            <div>
              <BiPhoneCall />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
              />
            </div>

            <input type="submit" value="Proceed" />

          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
