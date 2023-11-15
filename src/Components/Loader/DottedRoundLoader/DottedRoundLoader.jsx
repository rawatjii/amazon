import React from 'react';
import classes from './DottedRoundLoader.module.css';

const DottedRoundLoader = (props)=>{
    return(
        <div className={classes.loader}></div>
    )
}

export const DottedLoader_sm = ()=>{
    return(
        <div className={classes.loader_sm}></div>
    )
}

export default DottedRoundLoader;