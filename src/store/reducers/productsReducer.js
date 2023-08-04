import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [],
};

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        fetchAllProducts:(state, {payload})=>{
            state.allProducts = payload;
        }
    }
})

export const {fetchAllProducts} = productsSlice.actions;

export default productsSlice.reducer;