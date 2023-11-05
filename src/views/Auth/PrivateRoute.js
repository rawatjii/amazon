import React, { useEffect } from 'react';
import {Route, useNavigate} from 'react-router-dom';

import Login from './SignIn/SignIn';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children})=>{
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state)=>{
        return state.auths.UserStatus;
    });

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/signin');
        }
    }, [isAuthenticated])
    
    return children;
}

export default PrivateRoute;