import React from 'react';
import { useState } from 'react';
import amzLogo from '../images/amazon-logo.png';
import "../styles/signIn.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate , useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localStorageSaver } from '../LocalStorage/localStorageSaver';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
let from = location.state?.from?.pathname;

    const [errorMsg, setErrorMsg] = useState("");
    const [userSignIn, setUseSignIn] = useState({
        emailIdSignIn: '',
        passowrdSignIn: ''
   });
 
   function validateEmail(email) { 
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) { 
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; 
    return phoneRegex.test(phone);
}

function doValidate(inputValue) {
   if (!validateEmail(inputValue) && !validatePhone(inputValue) ){
    setErrorMsg("Invalid Email");
    return false;
}
}
   const handleSignInBtn = (e)=>{
    setErrorMsg("");
         let emailIdorMobile = document.getElementById("signInEmail").value;
         let PasswordSignIn = document.getElementById("signInPassword").value;
      
         if(!doValidate(emailIdorMobile)){
            let checkForUsr =0;
          
            const LoadlocalStorage = JSON.parse(window.localStorage.getItem("amazonClone"));
            
           if(LoadlocalStorage != null){
            if(LoadlocalStorage["signUp"] != null){
              for (const users in LoadlocalStorage["signUp"]) {
                  let userObj = LoadlocalStorage["signUp"][users];
                 if(userObj.emailormobileSignUp===emailIdorMobile && userObj.passwordSignUp===PasswordSignIn){
                   localStorageSaver(userObj,"userLogin");
                    checkForUsr++;
                   toast.success("Login Success..."+userObj.nameSignUp, {
                   position: toast.POSITION.BOTTOM_RIGHT,
                   className: 'toast-message-sign-up'
            });
            setUseSignIn({emailIdSignIn: '', passowrdSignIn: '' })
                setTimeout(()=>{
                   navigate("/");
                },1000);
            }
              }
              
            }
           }
          if(checkForUsr===0){
            setErrorMsg("Invalid Email Id or Password...");
          }
        }
   } 

  return (
    <>
    <div className='signInContainer'>
        <img src={amzLogo} /> 
      <div className='signInBox'>
       <p id='txtSign'>Sign In</p>
       <label>Email or Mobile Number</label> <br />
       <input type="email" id="signInEmail" placeholder='Email Id' value={userSignIn.emailIdSignIn}  onChange={(e)=>setUseSignIn({...userSignIn, emailIdSignIn: e.target.value})}/> <br /><br />
       <label>Password</label> <br />
       <input type="password" id='signInPassword'  value={userSignIn.passowrdSignIn}   onChange={(e)=>setUseSignIn({...userSignIn, passowrdSignIn: e.target.value})}/> <br /><br />
        <button onClick={handleSignInBtn}>Continue</button> <br />
        <span>{errorMsg}</span>
        </div>
        <div className='signUpBtn'>
          <p>New to Amazon</p>
          <Link to="/signUp"> <button>Create your Amazon Account</button> </Link>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default SignIn