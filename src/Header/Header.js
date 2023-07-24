import React,{useState, useEffect} from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Routes } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import Main from '../Body/Main';
import Bucket from '../Body/Bucket';
import { Provider} from "react-redux";
import store from '../Stores/store';
import Payment from '../Body/Payment';
import SignIn from '../Body/SignIn';
import SignUp from '../Body/SignUp';
import Order from '../Body/Order';
import Footer from './Footer';
import SearchPage from '../Body/SearchPage';


function Header() {
   const [ProductList, setProductList] = useState([]);
   const [loaderBlock, setLoaderBlock] = useState(false);

   const fetchProducts = () => {
      return fetch("https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products").then((res) => res.json())
        .then((response) => {
          //  console.log(response);
          setProductList(response);
          setLoaderBlock(false);
          //document.getElementById("root").style.filter="none";
        })
    }

    useEffect(() => {
      fetchProducts();
    }, [])

  return (
  <>
  <Provider store={store}>
   <HashRouter>
      <Routes>
           <Route path='/' element={
            <>
            <HeaderBar />
            <Main fetchProducts = {fetchProducts} ProductList={ProductList} loaderBlock={loaderBlock}/>
            <Footer />
            </>
           }/> 
        <Route path='/bucket' element={
              <>              
            <HeaderBar />
            <Bucket />
            <Footer />
            </>
           }/> 
        <Route path='/payment' element={
              <>              
            <HeaderBar />
            <Payment />
            <Footer />
            </>
           }/> 
        <Route path='/signIn' element={
              <>              
            <HeaderBar />
            <SignIn />
            <Footer />
            </>
           }/> 
        <Route path='/search' element={
            <>
            <HeaderBar />
            <SearchPage ProductList={ProductList} />
            <Footer />
            </>
           }/> 
        <Route path='/signUp' element={
              <>              
            <HeaderBar />
            <SignUp />
            <Footer />
            </>
           }/> 
        <Route path='/order' element={
              <>              
            <HeaderBar />
            <Order />
            <Footer />
            </>
           }/> 
      </Routes>
   </HashRouter>
   </Provider>
  </>
  )
}

export default Header