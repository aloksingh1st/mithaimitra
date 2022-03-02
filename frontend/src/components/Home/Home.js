import React, { useEffect } from 'react';
import Product from './Product';
import "./Home.css"
import MetaData from '../MetaData';
import {getProduct} from "../../actions/productAction"
import {useSelector, useDispatch} from "react-redux"
import { useAlert } from 'react-alert';
import Loader from "../layout/Loader/Loader"



const product ={
  name:"biscuit",
  images:[{url:"https://upload.wikimedia.org/wikipedia/commons/8/88/Rich_tea.jpg"}],
  price:"3000",
  _id:"alok"
}

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, error, products, productsCount} = useSelector(
    (state) => state.products
  )

  useEffect(()=>{
    if(error){
      return alert.error(error)
    }
    dispatch(getProduct());
  },[dispatch, error, alert]);

  return<>
  {loading?<Loader />: <> 

<MetaData title="MithaiMitra"/>

<section className="hero-section">
<section className="left-side">
  <h1>MithaiMitra</h1>
  <p>Eat something which makes your life sweeter. We MithaiMitra brings you the healthiest sweet in the market.</p>
 <a href="/#container" className='explore-button'>Explore</a>

</section>
<section className="right-side">
  <figure>
    <img src="./images/landing_illustration.svg" alt=""/>
  </figure>

</section>
</section>
<h2 className="homeHeading">Featured Products</h2>
<section className="product_container" id='container'>
{products && products.map((product) => <Product product={product}/> )}
</section>



</>}
  </>
};

export default Home;
