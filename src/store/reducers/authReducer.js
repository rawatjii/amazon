import * as actionTypes from '../actions/actionTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserStatus:false,
    UserData:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setLogin:(state, action)=>{
            state.UserStatus = true;
            state.UserData = null
        },
        setLogout:(state)=>{
            state.UserStatus = false;
            state.UserData = null;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;