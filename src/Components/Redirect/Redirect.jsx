import React, { useEffect } from 'react';
import {Route, useNavigate} from 'react-router-dom';
import Home from '../../views/Home';

const Redirect = (props)=>{
    const navigate = useNavigate();

    useEffect(()=>{
        switch(props.el){
            case props.el:
                return navigate(props.el);

            default:
                return null;
        }           
    }, [])

    // switch(props.el){
    //     case '/':
    //         navigate('/register');

    //     default:
    //         return null;
    // }
}

export default Redirect;