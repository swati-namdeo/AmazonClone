
const cardDetalsValidate = (formData) => {
    const error = {}
    const fields = ['cardNumber','expiryDate','cvv', 'cardholderName']
    fields.forEach(field=>{
        if(!formData[`${field}`]){
            if(field==='cardNumber'){
                error[[field]] = `Card Number not present`
            }else if(field==='expiryDate'){
                error[[field]] = `Expiry Date not present`
            }else if(field==='cvv'){
                error[[field]] = `CVV not present`
            }else{
                error[[field]] = `Card Holder Name not present`
            }
        }
    })
     if(formData.cardNumber && (formData.cardNumber.length < 16 || formData.cardNumber.length > 16)){
         error['cardNumber'] = 'Card Number should be 16 Digits'
     }

     if(formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 3)){
        error['cvv'] = 'CVV should be less then or more then 3'
    }
     
    if(Object.keys(error).length === 0) return null
    return error
}

export { cardDetalsValidate }