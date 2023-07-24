const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 

// function isEmailAddress(str) {

//     return str.match(pattern);    

// }
function validateEmail(email) { //Validates the email address
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) { //Validates the phone number
    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
    return phoneRegex.test(phone);
}

// function doValidate(inputValue) {
//    if (!validateEmail(inputValue) && !validatePhone(inputValue) ){
//     setErrorMsg("Invalid Email");
//     return false;
// }
// }

const signUpFormValidation = (formData) => {

    const error = {}
    const fields = ['nameSignUp','emailormobileSignUp','passwordSignUp']
    fields.forEach(field=>{
        if(!formData[`${field}`]){
            if(field==='nameSignUp'){
                error[[field]] = `Name not present`
            }else if(field==='emailormobileSignUp'){
                error[[field]] = `Email Id or mobile number not present`
            }else if(field==='passwordSignUp'){
                error[[field]] = `Password not present`
            }
        }
    })
    if(formData.nameSignUp && (formData.nameSignUp.length < 3 || formData.nameSignUp.length > 20)){
        error['nameSignUp'] = 'Name should be atleast 4 chars and less than 20 chars'
    }
    if(formData.passwordSignUp === formData.conformPasswordSignUp){
    if(formData.password && (formData.password.length < 6  || formData.password.length > 30)){
        error['passwordSignUp'] = 'Password should be atleast 6 chars and less than 30 chars'
    }
     }else{
        error['passwordSignUp'] = 'Password and Conform Password not same'
     }
    if(formData.emailormobileSignUp && (!validateEmail(formData.emailormobileSignUp) && !validatePhone(formData.emailormobileSignUp) )){
        error['emailormobileSignUp'] = 'Not a valid email or mobile number'
    }
    if(Object.keys(error).length === 0) return null
    return error
}

export { signUpFormValidation }