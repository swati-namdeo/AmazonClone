import React from 'react';
import { useState } from 'react';
import amzLogo from '../images/amazon-logo.png';
import "../styles/signUp.css";
import { Link, useNavigate } from 'react-router-dom';
import { signUpFormValidation } from '../utils/signupformvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localStorageSaver } from '../LocalStorage/localStorageSaver';

function SignUp() {
  const initialUserDtails = {
    nameSignUp: '',
    emailormobileSignUp: '',
    passwordSignUp: '',
    conformPasswordSignUp: ''
};
const initialErrors = {
  nameSignUp: '',
  emailormobileSignUp: '',
  passwordSignUp: ''
};
     const navigatePage = useNavigate();
    const [userSignUp, setUseSignUp] = useState(initialUserDtails);
    const [userErrorsignup, setUseErrorsignup] = useState(initialErrors);
    function handleSaveData(e){
    const result = signUpFormValidation(userSignUp);

    if(result===null){
      setUseErrorsignup(initialErrors);
          localStorageSaver(userSignUp,"signUp");
      setUseSignUp(initialUserDtails);
     toast.success("Successfull Sign Up "+userSignUp.nameSignUp, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'toast-message-sign-up'
  });
     setTimeout(()=>{
      navigatePage("/signIn");
     },2000);
    }else{
      if(result.nameSignUp != "" || result.emailormobileSignUp != "" || result.passwordSignUp !=""){
        
          setUseErrorsignup({
            ...userErrorsignup,
          nameSignUp: result.nameSignUp,
          emailormobileSignUp: result.emailormobileSignUp,
          passwordSignUp: result.passwordSignUp})

    }
    
    }
  };

  return (
    <>
     <div className='signUpContainer'>
        <img src={amzLogo} /> 
        <div className='signUpBox'>
       <p id='txtSign'>Sign Up</p>
       <label>Your Name</label> <br />
       <input type="text" id="signUpName" placeholder='First and Last Name' value={userSignUp.nameSignUp}  onChange={(e)=>setUseSignUp({...userSignUp, nameSignUp: e.target.value})}/> <br /> 
       <span>{userErrorsignup.nameSignUp}</span> <br />
       <label>Email or Mobile Number</label> <br />
       <input type="email" id="signInEmail" placeholder='Email Id or Mobile Number' value={userSignUp.emailormobileSignUp}  onChange={(e)=>setUseSignUp({...userSignUp, emailormobileSignUp: e.target.value})}/> <br />
       <span>{userErrorsignup.emailormobileSignUp}</span> <br />
       <label>Password</label> <br />
       <input type="password" id='signInPassword'  value={userSignUp.passwordSignUp}   onChange={(e)=>setUseSignUp({...userSignUp, passwordSignUp: e.target.value})}/> <br />
       <span>{userErrorsignup.passwordSignUp}</span> <br />
       <label>Conform Password</label> <br />
       <input type="password" id='signInConformPassword'  value={userSignUp.conformPasswordSignUp}   onChange={(e)=>setUseSignUp({...userSignUp, conformPasswordSignUp: e.target.value})}/> <br /><br />
      
        <button onClick={(e)=>handleSaveData(e)}>Continue</button>
        <Link to="/signIn"> <p>Sign In</p> </Link>
      </div>
      
      </div>
      <ToastContainer />

    </>
  )
}

export default SignUp