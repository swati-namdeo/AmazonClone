import React from 'react';
import {AiTwotoneHeart} from "react-icons/ai";
;
function Product(props) {
   // {console.log(props.products)}
    const arrHeart = [];
      for(let i=1; i<props.products.rating.rate; i++){
         arrHeart.push(<AiTwotoneHeart />);
      }
    
     
  return (
      <>
         <div>{props.products.title}</div>
         <div className='rateDiv'>&#x20B9;{props.products.price}</div>
          <div>{arrHeart.map((heart,index)=>{
             return <span className='heartColor' key={index}>{heart}</span>
           })}</div>
         <div className='productImage'><img className='imageProduct' src={props.products.image}/></div>
         <div className='btnAddCart'><button className='AddtoBucketBtn' onClick={()=> props.handleAddToBucket(props.products)}>Add to Basket</button></div>
  </>

  )
}

export default Product