import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    searchKeyword:'',
}; 

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchKeyword:(state, {payload})=>{
        state.searchKeyword = payload;
    }   
  },
});

export const {setSearchKeyword} = searchSlice.actions;

export default searchSlice.reducer;