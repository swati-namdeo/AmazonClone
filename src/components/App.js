import React, { useState } from 'react'
import '../styles/App.css';
import Header from '../Header/Header';
import Footer from '../Header/Footer';
import Main from '../Body/Main';
import { RotatingLines } from 'react-loader-spinner';
const App = () => {
  const [loader,setLoader] = useState(true);
 setTimeout(()=>{
  setLoader(false);
 },1200)
  return (
    
    <>
    {(loader) ? 
      <div id='loaderDIv'> <RotatingLines
  strokeColor="black"
  strokeWidth="4"
  animationDuration="0.75"
  width="100"
  visible={true}
/>  </div>
:
    <Header />


    }
     
    </>
  )
}


export default App;
