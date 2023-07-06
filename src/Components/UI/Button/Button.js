import React from 'react';
import Button from '@mui/material/Button';

const button = (props)=>{
    return(
        <Button variant={props.variant} color={props.color} className={props.className}>{props.children}</Button>
    )
}

export default button;