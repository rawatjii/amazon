import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from '../../Containers/Footer/Footer'
import './Today-Deals.css'
// import { useParams } from "react-router-dom";

const Today_Deals = (props)=>{
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('cat');
    const filteredproducts = [];
    const allproductsCategories = [];
    var productCategories = []
    // console.log('query',query);

    // const params = useParams()

    const [filterProducts, setFilteredProducts] = useState([])
    const [allCategories, setAllCategories] = useState([])
    
    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    });

    useEffect(() => {
        
    }, [allProducts])
    

    return(
        <>
            <Navbar />
            <div className="totalResult">
                <p className="">results</p>
            </div>


            <Footer />
        </>
    )
}

export default Today_Deals;