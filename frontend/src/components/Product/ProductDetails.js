
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { FaShoppingCart } from "react-icons/all";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader"
import {getProductDetails, newReview} from "../../actions/productAction";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import ReviewCard from "./ReviewCard";


import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [d, setD] = useState(null);
  const [value, setValue] = useState(500);
  
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {loading, products} = useSelector((state) => state.productDetails)
 

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const handleChange = (e) => {
   setValue(e.target.value)
  };


  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, value));
    alert.success("Item has been added to cart");
  };


  
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
    console.log(open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useLayoutEffect(() => {
    dispatch(getProductDetails(id));
    async function getData() {
      const response = await fetch(`/api/v1/products/${id}`);
      let actualData = await response.json();
      setD(actualData);
      // console.log(actualData);
    }
    getData();
  }, [id]);
  
  // loading = false;
  const ratingValue = d?.product?.ratings;
  console.log(ratingValue)
  
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "brown",
    size: window.innerWidth < 600 ? 20 : 25,
    value: ratingValue,
    isHalf: true,
  };
  
  return (
    <>
    {d == null ? <Loader/> : 
      <div className="card-wrapper">
      <div className="card">
        {/* card left */}
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={d?.product?.images[0]?.url} alt="product image" />
              <img src={d?.product?.images[0]?.url} alt="product image" />
              <img src={d?.product?.images[0]?.url} alt="product image" />
              <img src={d?.product?.images[0]?.url} alt="product image" />
            </div>
          </div>
          <div className="img-select">
            <div className="img-item">
              <a href="#" data-id={1}>
                <img src={d?.product?.images[0]?.url} alt="product image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id={2}>
                <img src={d?.product?.images[0]?.url} alt="product image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id={3}>
                <img src={d?.product?.images[0]?.url} alt="product image" />
              </a>
            </div>
            <div className="img-item">
              <a href="#" data-id={4}>
                <img src={d?.product?.images[0]?.url} alt="product image" />
              </a>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="product-content">
          <h2 className="product-title">{d?.product?.name}</h2>
          <a href="/products" className="product-link">
            visit product store
          </a>
          <div class="product-rating">
            <ReactStars {...options} />
            <span>
              {d?.product?.ratings}({d?.product?.review})
            </span>
          </div>

          <div className="product-price">
            <p className="new-price">
              Price: <span>₹{d?.product.price}</span>/500g
            </p>
          </div>
          <div className="product-detail">
            <h2>about this item: </h2>
            <p>{d?.product?.description}</p>
            <ul>
              <li>
                Available:{" "}
                <span
                  className={d?.product?.stock < 1 ? "red_color" : "In_stock"}
                  >
                  {d?.product?.stock < 1 ? "Out Of Stock" : "in stock"}
                </span>
              </li>
              <li>
                Category: <span>{d?.product?.category}</span>
              </li>
              <li>
                Shipping Area: <span>Kanpur</span>
              </li>
              <li>
                Shipping Fee: <span>Free</span>
              </li>
            </ul>
          </div>
          <div className="purchase-info">
            <input type="radio" name="amount" id="500g" value={500} onChange={handleChange} defaultChecked />
            <label htmlFor="amount">500g</label>
            <input type="radio" name="amount" id="1000g" value={1000} onChange={handleChange}/>
            <label htmlFor="amount">1000g</label>
            <button type="button" className="btn" onClick={addToCartHandler}>
              Add to Cart <FaShoppingCart />
            </button>

            <button onClick={submitReviewToggle} className="btn">
                Submit Review
              </button>
          </div>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

<Dialog
  aria-labelledby="simple-dialog-title"
  open={open}
  onClose={submitReviewToggle}
>
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <Rating
      onChange={(e) => setRating(e.target.value)}
      value={rating}
      size="large"
    />

    <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  </DialogContent>
  <DialogActions>
    <Button onClick={submitReviewToggle} color="secondary">
      Cancel
    </Button>
    <Button onClick={reviewSubmitHandler} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>


              </div>}
{d?.product?.reviews && d?.product?.reviews[0] ? (
            <div className="reviews">
              {d?.product?.reviews &&
                d?.product?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

                  </>
  );
};

export default ProductDetails;













