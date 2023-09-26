import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation, useParams} from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import axios from "../../axios";
import { useSelector } from "react-redux";
import Footer from '../../Containers/Footer/Footer'

const SingleProductDetail = (props)=>{
    
    const {productId} = useParams()
    const [first, setfirst] = useState([])
    // console.log('productId',productId);

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    useEffect(() => {
        const filteredData = allProducts.filter(data=>{
            if(data.id === productId){
                return data;
            }
        })
        console.log('filteredData',filteredData);
    }, [])
    

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