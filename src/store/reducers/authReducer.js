import * as actionTypes from '../actions/actionTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserLogin:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setLogin:(state)=>{
            state.UserLogin = true;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;