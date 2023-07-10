import React from 'react';
import './Image.css'

const Image = (props)=>{
    return(
        <img src={props.src} className={props.className} style={{maxWidth:props.maxWidth + 'px', objectFit:props.objectFit}} />
    )
}

export default Image;