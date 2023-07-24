import React, { useEffect, useState } from 'react';
import "../styles/payment.css";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderProduct } from '../Stores/placeOrderSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiPhonepe, SiPaytm, SiAmazonpay, SiGooglepay } from "react-icons/si";
import { SlCreditCard } from "react-icons/sl";
import { FaCcMastercard } from "react-icons/fa";
import { cardDetalsValidate } from '../utils/cardDetailsValidate';
import { localStorageSaver } from '../LocalStorage/localStorageSaver';
import { removeAll } from '../Stores/cartSlice';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state;
  const dispatchForClean = useDispatch();
  const [giftCard, setGiftCard] = useState(0);
  const cardInitialState = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  };

  const [cardDetail, setcardDetails] = useState(cardInitialState);

  const [addressDetails, setAddressDetails] = useState({
    name: '',
    address_Line: '',
    city: '',
    district: '',
    state: '',
    pincode: ''
  });

  const [updateAddress, setUpdateAddress] = useState({
    name: 'Parmanand Chared',
    address_Line: '91, Ward Number 10, Village-Borkhedi, Post- Devri',
    city: 'Pipliya Mandi',
    district: 'Mandsaur',
    state: 'MP',
    pincode: '458664'
  });
  const [cardErrorDetail, setcardErrorDetails] = useState(cardInitialState);

  const [radioAddress, setRadioAddress] = useState("");
  const productBucket = useSelector((state) => state.bucket);

  let sumTotal = 0;
  productBucket.map((prdct) => {
    sumTotal += prdct.price;
  })
  function placeOrderFunc(e) {
    e.preventDefault();
    if (radioAddress !== "") {
      setcardErrorDetails(cardInitialState);
      if (radioAddress === "card") {
        const cardsInfo = cardValidate();
        if (cardsInfo === null) {
          placeForOrder();
        } else {
          if (cardsInfo.cardNumber != "" || cardsInfo.expiryDate != "" || cardsInfo.cvv != "" || cardsInfo.cardholderName != "") {

            setcardErrorDetails({
              ...cardErrorDetail,
              cardNumber: cardsInfo.cardNumber,
              expiryDate: cardsInfo.expiryDate,
              cvv: cardsInfo.cvv,
              cardholderName: cardsInfo.cardholderName
            })

          }
        }
      } else if (radioAddress === "upi") {
        if (upiValidate()) {
          placeForOrder();
        } else {
          setcardErrorDetails({ ...cardErrorDetail, upiId: "Invalid UPI Id..." });
        }
      }
      function placeForOrder() {
        const LoadlocalStorage = JSON.parse(window.localStorage.getItem("amazonClone"));
        if (LoadlocalStorage != null) {
          if (LoadlocalStorage["signIn"] != null) {
            const localStorageUsers = JSON.parse(window.localStorage.getItem("amazonClone"))["signIn"];

            if (Object.keys(localStorageUsers).length > 0) {
              let newOrderData = {};
              const ordetData = {
                dateTime: getDateTime(),
                address: document.getElementById("addDiv").innerText
              }
              //  console.log(orderProduct(productBucket).payload);

              // for(let prd in Object.entries(orderProduct(productBucket).payload)){
              //   console.log(prd);
              //     newOrderData = {...prd, ...ordetData};
              //  //   newOrderData =  Object.assign(prd,ordetData);
              //   }
              localStorageSaver(orderProduct(productBucket), "orderBucketData");
              // localStorageSaver(newOrderData, "orderBucketData");
              toast.success('SuccessFull Order Place', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'toast-message-order-place'
              });
              dispatchForClean(removeAll(productBucket));

            } else {
              toasterLogin();
            }
          } else {
            toasterLogin();
          }
        } else {
          toasterLogin();
        }
      }

    } else {
      toast.error("Please Select Payment option", { position: toast.POSITION.TOP_CENTER });
    }
  }

  function toasterLogin() {
    toast.info("Please Login First", { position: toast.POSITION.TOP_CENTER });
    setTimeout(() => {
      navigate("/signIn", { state: { from: location } });
    }, 2000);
  }
  const changeAddress = (e) => {
    document.getElementsByClassName("addressForm")[0].style.display = "block";
  }
  const handleAddressInput = (e) => {
    e.preventDefault();
    setUpdateAddress(addressDetails);
    document.getElementsByClassName("addressForm")[0].style.display = "none";
  }
  function getDateTime() {
    let date = new Date()
    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();
    let time = date.toLocaleTimeString();
    return `${day}-${month}-${year} : ${time}`;
  }
  useEffect(() => {
    if (from) {
      setGiftCard(20);
    }
  }, [])

  const onRadioBtnChange = (e) => {
    document.getElementById("cardBoxDiv").style.display = "none";
    document.getElementById("upiBoxDiv").style.display = "none";
    if (e.target.value === "card") {
      setRadioAddress("card");
      document.getElementById("cardBoxDiv").style.display = "block";

    } else if (e.target.value === "upi") {
      setRadioAddress("upi");
      document.getElementById("upiBoxDiv").style.display = "block";
    }
  }
  function upiValidate() {
    let upiInputValue = document.getElementById("upiId").value;
    var upiPattern = /^[\w.-]+@[\w.-]+$/;
    let upiResult = upiPattern.test(upiInputValue);
    return upiResult;
  }

  function cardValidate() {
    return cardDetalsValidate(cardDetail);
  }

  return (
    <>
      <div className='headingBox'> Checkout ({productBucket.length} items) </div>
      <div id='payBox'>
        <form>
          <div className='addressBox'>
            <div className='boldDiv'>1. Shipping address</div>
            <div id='addDiv'><span>{updateAddress.name}</span> <br /> <span>{updateAddress.address_Line}</span> <br /> <span>{updateAddress.city}</span> <span>{updateAddress.district}</span> <span>{updateAddress.state}</span> <span>{updateAddress.pincode}</span></div>
            <div id='changeDiv' onClick={changeAddress}>change</div>
            <div className='addressForm'>
              <label>Name</label> <br />
              <input type="text" id="addressName" placeholder='Name' value={addressDetails.name} onChange={(e) => setAddressDetails({ ...addressDetails, name: e.target.value })} /> <br /><br />
              <label>Address Line</label> <br />
              <input type="text" id="address_line" placeholder='Address Line' value={addressDetails.address_Line} onChange={(e) => setAddressDetails({ ...addressDetails, address_Line: e.target.value })} /> <br /><br />
              <label>City</label> <br />
              <input type="text" id="city" placeholder='City' value={addressDetails.city} onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })} /> <br /><br />
              <label>District</label> <br />
              <input type="text" id="district" placeholder='District' value={addressDetails.district} onChange={(e) => setAddressDetails({ ...addressDetails, district: e.target.value })} /> <br /><br />
              <label>State</label> <br />
              <input type="text" id="state" placeholder='State' value={addressDetails.state} onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })} /> <br /><br />
              <label>Pincode</label> <br />
              <input type="number" id="pincode" placeholder='' value={addressDetails.pincode} onChange={(e) => setAddressDetails({ ...addressDetails, pincode: e.target.value })} /> <br /><br />
              <button onClick={handleAddressInput}>Save</button>
            </div>
          </div>
          <hr />
          <div className='paymentBox'> <span id="textPaymentHeading">2. Choose a payment method</span>
            <div className='payDiv'>
              <input type="radio" checked={radioAddress == "card"} value="card" onChange={onRadioBtnChange} /> <label> Credit or Debit Card Details  <SlCreditCard /> <FaCcMastercard /></label>
              <div id="cardBoxDiv">
                <label>Card Number</label> <br />
                <input type="number" id="cardNumber" placeholder='Card Number' value={cardDetail.cardNumber} onChange={(e) => setcardDetails({ ...cardDetail, cardNumber: e.target.value })} /> <br />
                <span>{cardErrorDetail.cardNumber}</span><br />
                <label>Expiry Date</label> <br />
                <input type="month" id='expiryDate' placeholder='YY/MM' value={cardDetail.expiryDate} onChange={(e) => setcardDetails({ ...cardDetail, expiryDate: e.target.value })} /> <br />
                <span>{cardErrorDetail.expiryDate}</span><br />
                <label>CVV</label> <br />
                <input type="number" id='cvv' value={cardDetail.cvv} onChange={(e) => setcardDetails({ ...cardDetail, cvv: e.target.value })} /> <br />
                <span>{cardErrorDetail.cvv}</span><br />
                <label>Cardholder's Name</label> <br />
                <input type="text" id='cardholderName' placeholder='Cardholders Name' value={cardDetail.cardholderName} onChange={(e) => setcardDetails({ ...cardDetail, cardholderName: e.target.value })} /> <br />
                <span>{cardErrorDetail.cardholderName}</span><br />
              </div>
            </div>
            <div className='payDiv'>
              <input type="radio" checked={radioAddress == "upi"} value="upi" onChange={onRadioBtnChange} />  <label>UPI Method <SiPhonepe /> <SiGooglepay /> <SiAmazonpay /> <SiPaytm /> </label>
              <div id="upiBoxDiv">
                <label>UPI Id</label> <br />
                <input type="text" id="upiId" placeholder='UPI Id' value={cardDetail.upiId} onChange={(e) => setcardDetails({ ...cardDetail, upiId: e.target.value })} /> <br />
                <span>{cardErrorDetail.upiId}</span>
              </div>
            </div>
          </div>
          <div>
            <button className='placeOrderBtn' onClick={(e) => placeOrderFunc(e)}>Place Your Order</button>

          </div>
        </form>
        <div id='orderSummary'>
          <span className='boldDiv'> Order Summary</span> <br /> <br />
          <div>Items ({productBucket.length}): <span className='orderLastTxt'>&#x20B9;{sumTotal}</span></div>
          <div >Gifting Charges: <span className='giftChargeTxt'>&#x20B9;{giftCard}</span></div>
          <div>Shipping & Handling: <span className='orderLastTxt'>&#x20B9;{40}</span></div>
          <div>Delivery Charges : <span className='orderLastTxt'>&#x20B9;{60}</span></div>
          <hr />
          <div>Payment Total: <span className='orderLastTxt'>&#x20B9;{sumTotal + giftCard + 100}</span></div>

        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Payment