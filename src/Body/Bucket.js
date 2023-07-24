import React, { useEffect, useState } from 'react';
import "../styles/Bucket.css";
import advertize from '../images/advet.png';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../Stores/cartSlice';
import { AiTwotoneHeart } from "react-icons/ai";

import { Link } from 'react-router-dom';

function Bucket() {
  const dispatch = useDispatch();
  const productBucket = useSelector((state) => state.bucket);

  const [eachItmes, setEachItems] = useState(1);
  let sumTotal = 0;
  productBucket.map((prdct) => {
    sumTotal += prdct.price;
  })
  const [gift, setGift] = useState(false);
  let giftData = false;

  function handleCheckBox(e) {
    setGift(e.target.checked);
  }

  function getProceed() {
    return (
      <>
        Subtotal ( {productBucket.length}items) &#x20B9;{sumTotal} <br />
        <span> <input id='giftCheckBox' type="checkbox" value={gift} onChange={(e) => handleCheckBox(e)} /> This Item contains a gift </span> <br />
        <Link to="/payment" state={{ from: gift }}> <button className='proceedtoCheckBtn' >Proceed to Checkout</button> </Link>
      </>)
  }

  let arrHeart = [];
  function createHeartBucket(rate) {
    arrHeart = [];
    for (let i = 1; i < rate; i++) {
      arrHeart.push(<AiTwotoneHeart />);
    }
    return (arrHeart.map((heart, index) => {
      return <span className='heartColor' key={index}>{heart}</span>
    }))
  }


  const handleDeletefromBucket = (id) => {
    dispatch(remove(id));
  }

  const deleteFromBucket = (e) => {
    let ProductId = e.target.id.slice(14);
    let ItemsOld = document.getElementById("countItmesOld" + ProductId).innerText;

    console.log(ProductId);
    if (ItemsOld == 1) {
      handleDeletefromBucket(ProductId);
    } else if (ItemsOld > 1) {
      ItemsOld--;
      document.getElementById("countItmesOld" + ProductId).innerText = ItemsOld;
    }
  }

  function AddFromBucket(productForAdd) {
    console.log(productForAdd);
    let ProductId = productForAdd.id;
    // let ProductId = e.target.id.slice(11);
    let ItemsOld = document.getElementById("countItmesOld" + ProductId).innerText;

    ItemsOld++;
    document.getElementById("countItmesOld" + ProductId).innerText = ItemsOld;
  }

  return (
    <div className='bucketDiv'>
      <div id='advCheckoutBox'>
        <div id='ImgDivAdvertizement'> <img src={advertize} /> </div>
        <div id="checkOutDiv"> {getProceed()} </div>
      </div>
      <div>Hello, <br /><br /><span id="txtYourShopping">Your Shopping Basket</span> <hr /></div>
      <div className='productShows'>
        {productBucket.map((product) => {
          return (
            <div className='bucketList' key={product.id}>
              <div><img className='imageBucketList' src={product.image} /></div>
              <div className='divBucketList'>
                <div className='productTitle'>{product.title}</div>
                <div className='rateDiv'>&#x20B9;{product.price}</div>
                <div>{createHeartBucket(product.rating.rate)}</div>
                <div id={'countItmes' + product.id} className='countProduct'> <button id={"deleteOnBucket" + product.id} onClick={deleteFromBucket}> - </button> <span id={'countItmesOld' + product.id}> {eachItmes} </span> <button id={"addOnBucket" + product.id} onClick={() => AddFromBucket(product)}> + </button></div>
                <div><button className='deleteFromBucketBtn' onClick={() => handleDeletefromBucket(product.id)}>Remove from Basket</button></div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Bucket