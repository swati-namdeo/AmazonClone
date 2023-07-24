import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : 'bucket',
    initialState : [],
    reducers : {
        add(state, action){
        
            //return [...state, action.payload]
            state.push(action.payload);
        },
        remove(state, action){
            return state.filter((product)=>{return product.id !== action.payload})
        },
        removeAll(state, action){
            return state=[];
        }

    }
})

export const {add, remove, removeAll} = cartSlice.actions;
export default cartSlice.reducer;