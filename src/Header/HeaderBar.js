import React, { useEffect, useState } from 'react';
import amzLogo from '../images/amazon-logo.png';
import '../styles/header.css';
import { FaSearch } from 'react-icons/fa';
import { MdShoppingBasket } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function HeaderBar() {
const [searchInput, setSearchInput] = useState("");
const [ userName, setUserName] = useState("Guest");
const productNUmber = useSelector((state)=>state.bucket);
const searchNavigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if(e.target.value === ""){
      searchNavigate("/");
    }
  };
  
  function startFunc(){
    const LoadlocalStorage = JSON.parse(window.localStorage.getItem("amazonClone"));
    if(LoadlocalStorage != null){
       if(LoadlocalStorage["signIn"] != null){
         const localStorageUsers = JSON.parse(window.localStorage.getItem("amazonClone"))["signIn"];
         let currentUser = Object.values(localStorageUsers);
         let currentUserName = currentUser[0]["nameSignUp"];
          setUserName(currentUserName);
       }
     }
   }

  useEffect(()=>{    
     startFunc();
  })

  const searchInputFunc = (e)=>{
     if(searchInput === ""){
         searchNavigate("/");
     }else{
      searchNavigate("/search", { state: searchInput } );
     }
  }
  
  return (
    <>
    <nav className='navBar'>
     <Link id='firstLogo' to="/"> <img className='imageLogo' src={amzLogo} /> </Link>
     <div id='searchBox'> 
        <input type="text" value={searchInput} onChange={(e)=>handleChange(e)} className='searchBar'/>
        <button className='searchBtn' onClick={searchInputFunc}> <FaSearch /></button>
     </div>
     <Link to="/signIn" className='linkHead' id='userDivTxt'> <span className='helloTxt' id='userNameTxt'>Hello {userName}</span> Sign In</Link>
     <Link to="/order" className='linkHead'> <span className='helloTxt'>Returns</span> & Orders</Link>
     <Link to="/" className='linkHead'> <span className='helloTxt'>Your</span> Primes</Link>
     <Link to="/bucket" id='linkOrderIcon'> <MdShoppingBasket/> <span id='orderCount'>{productNUmber.length}</span></Link>
    </nav>
    </>
  )
}

export default HeaderBar