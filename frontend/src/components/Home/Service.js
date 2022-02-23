import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getProduct} from "../../actions/productAction"
import Product from "../Home/Product"
import "./Service.css";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import { Typography } from '@material-ui/core';
import Loader from "../layout/Loader/Loader";




const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "cloth"
]



const Service = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 3000]);
  const [category, setCategory] = useState("");
  const {keyword} = useParams();

  const {products, loading, error,productsCount, resultPerPage} = useSelector((state) => state.products)

  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
  }

  const priceHandler = (e, nPrice) =>{
    setPrice(nPrice);
  }
  useEffect(()=>{
    dispatch(getProduct(keyword, currentPage, price, category))
  },[dispatch, keyword, currentPage, price, category]);


  return <>
  {loading?<Loader /> : <>

    <h1 className="productHeading">Products</h1>
    <div className="product">
    {products && products.map((product) => <Product product={product}/> )}
    
    </div>

    {/* <div className="filter_box">

      <Typography>Price</Typography>
      <Slider 
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={3000}
      />

      <Typography>Categories</Typography>
      <ul className="category_box">
        {categories.map((c)=>(
          <li 
          className="category_link"
          key={c}
          onclick={()=>{setCategory(c);
          
          console.log(c)}}
          >
            {c}
          </li>
        ))}
      </ul>
    </div> */}




    {resultPerPage < productsCount && <div className="pagination_box">

<Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount ={productsCount}
onChange={setCurrentPageNo}
nextPageText ="Next"
prevPageText = "Prev"
firstPageText = "First"
lastPageText = "Last"
itemClass = "page-item"
linkClass = "page-link"
activeClass = "pageItemActive"
activeLinkClass="pageLinkActive"
/>
</div>}
  </>}
  </>;
};

export default Service;
