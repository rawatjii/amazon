import * as actionTypes from '../actions/actionTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    UserStatus:false,
    UserEmail:null,
    UserData:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setLogin:(state, action)=>{
            state.UserStatus = true;
            state.UserEmail = action.payload.email;
            state.UserData = action.payload.userData
        },
        setLogout:(state)=>{
            state.UserStatus = false;
            state.UserEmail = null;
            state.UserData = null;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;