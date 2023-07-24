import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import placeOrderReducer from "./placeOrderSlice";
const store = configureStore({
    reducer :{
        bucket : cartReducer,
        orderProduct : placeOrderReducer
    }
})

export default store;