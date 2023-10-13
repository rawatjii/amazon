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
        },
        setLogout:(state)=>{
            state.UserLogin = false;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;