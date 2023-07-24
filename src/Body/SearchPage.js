import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add } from '../Stores/cartSlice';

function SearchPage({ProductList}) {

    const location = useLocation();
    const dispatch = useDispatch();
    const checkProductinBucket = useSelector((state) => state.bucket);
    const [productSearchList, setProductSearchList] = useState([]);
    let searchText = location.state;
    
    const filterData = ProductList.filter((data)=>{
        return data?.title.toLowerCase().includes(searchText.toLowerCase());
    })
    useEffect(()=>{
        setProductSearchList(filterData);
    },[])
   
    const handleAddToBucket = (products) => {
      let countForProduct = 0;
      checkProductinBucket.map((oldPrdcts) => {
        if (oldPrdcts.id === products.id) {
          countForProduct++;
        }
      })
      if (countForProduct === 0) {
        dispatch(add(products));
        toast.success('Added to Bucket Successfully', {
          position: toast.POSITION.TOP_CENTER,
          className: 'toast-message-add-bucket'
        });
      } else {
        alert("Already Have in Bucket "+products.id);
  
        let ProductId = products.id;
      //  console.log("countItmesOld" + ProductId);
    
  
      }
    }

  return (
    <div className='bodyGridSearch'>
        {
           productSearchList && productSearchList.map((prdcts, index) => {
                return <div className='productsData' key={index} > <Product products={prdcts} index={index} handleAddToBucket={handleAddToBucket} /> </div>
              })}
                <ToastContainer />
    </div>
  )
}

export default SearchPage