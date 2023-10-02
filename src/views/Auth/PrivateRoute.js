import React, { useEffect } from 'react';
import {Route, useNavigate} from 'react-router-dom';
import Login from './SignIn/SignIn';

const PrivateRoute = ({children})=>{
    const navigate = useNavigate();
    const isAuthenticated = false;

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login');
        }
    }, [isAuthenticated])
    
    return children;
}

export default PrivateRoute;