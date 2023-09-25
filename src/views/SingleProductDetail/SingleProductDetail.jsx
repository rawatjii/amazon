import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from '../../Containers/Footer/Footer'
// import { useParams } from "react-router-dom";

const SingleProductDetail = (props)=>{
    

    return(
        <>
            <Navbar />
            <div className="totalResult">
                <p className="">results</p>
            </div>

            <div className="top_content">
                <div className="row">
                    <div className="col-md-6 image_col">
                        
                    </div>

                    <div className="col-md-6 content_col">

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SingleProductDetail;