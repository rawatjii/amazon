import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import './Today-Deals.css'
// import { useParams } from "react-router-dom";

const Today_Deals = (props)=>{
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('cat');
    const filteredproducts = [];
    // console.log('query',query);

    // const params = useParams()

    const [filterProducts, setFilteredProducts] = useState([])
    
    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    });

    useEffect(() => {
        allProducts.map((singleProduct => {
            if(singleProduct.category.replace(/\s/g, "").split(',')[0].replace('&','-') === query && singleProduct.price.discount > 0){
                filteredproducts.push(singleProduct)
            }
        }))
        
        setFilteredProducts(filteredproducts);
        console.log('filterProducts',filterProducts);
    }, [useEffect, allProducts])
    

    return(
        <>
            <Navbar />
            <div className="totalResult">
                <p className="">{filterProducts.length} results</p>
            </div>

            <div className="products_page">
                <div className="row">
                    <div className="col_3 left_col"></div>

                    <div className="col_9 right_col">
                        <div className="row">
                            {filterProducts.map((product, Index)=>{
                                return <div className="single_col" key={Index}>
                                    <div className="singleProduct">
                                        <div className="thumbnail">
                                            <img src={product.images.image1} alt="thumbnail" className="img-fluid" />
                                        </div>
                                        <div className="contents">
                                            <p className="name">{product.name}</p>
                                            <span className="tag">Deal of the Day</span>
                                            <p><sup>₹</sup> <span className="currentPrice">{product.price.originalPrice}</span></p>
                                        </div>
                                    </div>
                                </div>
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Today_Deals;