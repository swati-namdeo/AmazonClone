import { createSlice } from "@reduxjs/toolkit";

const placeOrderSlice = createSlice({
    name : 'orderProduct',
    initialState : [],
    reducers : {
        orderProduct(state, action){
            state.push(action.payload);
        }
    }
})

export const {orderProduct} = placeOrderSlice.actions;
export default placeOrderSlice.reducer;