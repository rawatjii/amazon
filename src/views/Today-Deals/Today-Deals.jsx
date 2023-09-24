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
        allProducts.map((singleProduct => {
            singleProduct.categories.map((singleCategory) => {
                const newSingleCategory = singleCategory.replace(/\s/g, "");
                productCategories.push(newSingleCategory);
            })
            const categoryText = productCategories.join('-')

            if(categoryText === query && singleProduct.price.offerPrice != singleProduct.price.originalPrice){
                filteredproducts.push(singleProduct)
            }

            // const prodCategory = singleProduct.category.split(',')[0]
            // if(!allproductsCategories.includes(prodCategory)){
            //     allproductsCategories.push(prodCategory)
            // }
        }))
        
        setFilteredProducts(filteredproducts);
        setAllCategories(allproductsCategories);
        // console.log('filterProducts',filterProducts);
    }, [allProducts])
    

    return(
        <>
            <Navbar />
            <div className="totalResult">
                <p className="">{filterProducts.length} results</p>
            </div>

            <div className="products_page">
                <div className="row">
                    <div className="col_3 left_col">
                        <h4 className="title">Category</h4>
                        <ul className="allCategoriesLists">
                            {allCategories.map((singleCategory, index) =>{
                                return <li key={index}>{singleCategory}</li>
                            })}
                        </ul>
                    </div>

                    <div className="col_9 right_col">
                        <h3 className="title">Results</h3>
                        <div className="row mx_-5">
                            {filterProducts.map((product, Index)=>{
                                return <div className="single_col" key={Index}>
                                    <div className="singleProduct">
                                        <div className="thumbnail">
                                            <img src={product.images[0].url} alt="thumbnail" className="img-fluid" />
                                        </div>
                                        <div className="contents">
                                            <p className="name">{product.product_title}</p>
                                            <span className="tag">Deal of the Day</span>
                                            <p className="price">
                                                <sup>₹</sup>
                                                <span className="currentPrice">{product.price.offerPrice.toLocaleString()}</span>

                                                <span className="old">M.R.P: <s>₹{product.price.originalPrice.toLocaleString()}</s></span>
                                                <span className="discount">({Math.round(((product.price.originalPrice - product.price.offerPrice) / product.price.originalPrice) * 100)}% off)</span>
                                            </p>
                                            <p className="deliveryStatus">{product.price.offerPrice >= 499 ? "FREE Delivery by Amazon" : "FREE Delivery over ₹499. Fulfilled by Amazon" }</p>
                                        </div>
                                    </div>
                                </div>
                            })}
                            
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Today_Deals;