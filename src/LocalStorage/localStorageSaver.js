 let allData={};
 let objSignUpUsers={};
 let objLoginUsers={};
 let objForOrders={};

  let idxForSignUp =0;
  let idxForLogin =0;
  let idxForOrder =0;

const localStorageSaver = (formData, storageName) => {
 
    if(storageName==="signUp"){
    objSignUpUsers["user"+(idxForSignUp++)]= formData;
    allData["signUp"]=objSignUpUsers;
    window.localStorage.setItem("amazonClone", JSON.stringify(allData))
    }
    if(storageName==="userLogin"){
      
      objLoginUsers["Users"+(idxForLogin++)]= formData;
    allData["signIn"]=objLoginUsers;
     window.localStorage.setItem("amazonClone", JSON.stringify({...JSON.parse(window.localStorage.getItem("amazonClone")), ...allData}));
    }

    if(storageName === "orderBucketData"){
    if(JSON.parse(window.localStorage.getItem("amazonClone"))["orders"]){
     // console.log(typeof JSON.parse(window.localStorage.getItem("amazonClone"))["orders"]);
      idxForOrder = Object.keys(JSON.parse(window.localStorage.getItem("amazonClone"))["orders"]).length;
    }
     console.log(idxForOrder);
      let objctForEveryOrder = {};
      formData.payload.map((prducts)=>{
        objctForEveryOrder["product"+(idxForOrder++)] = prducts;
      })
      // for(let prducts in formData){
      //   objctForEveryOrder["product"+(idxForOrder++)] = prducts;
      // }
      objForOrders = {...JSON.parse(window.localStorage.getItem("amazonClone"))["orders"], ...objctForEveryOrder };
     // console.log(objForOrders)
      allData["orders"]=objForOrders;
     window.localStorage.setItem("amazonClone", JSON.stringify({...JSON.parse(window.localStorage.getItem("amazonClone")), ...allData}));
    }
}

export { localStorageSaver }