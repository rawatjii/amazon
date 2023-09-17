import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Containers/Footer/Footer';
import classes from './Result.module.css';

const Result = ()=>{
    
    const FilteredProductsAll = [];
    // const allproductsCategories = [];

    // const params = useParams()

    const [filterProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })
    
    const resultProducts = useSelector((state)=>{
        return state.products.searchedProducts;
    });

    useEffect(() => {
        if(resultProducts.length === 0){
            const searchParams = new URLSearchParams(window.location.search);
            const searchCategory = searchParams.get('product');

            allProducts.filter((singleProd)=>{
                return singleProd.name.toLowerCase().includes(searchCategory.toLowerCase())
            })
            .map((filteredProduct)=>{
                FilteredProductsAll.push(filteredProduct)
            })
            setFilteredProducts(FilteredProductsAll)
        }else{
            setFilteredProducts(resultProducts);
        }
        // setAllCategories(allproductsCategories)
    }, [resultProducts, allProducts]);

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
                        <div className={classes.search_lists}>
                            {filterProducts.length > 0 ?
                                filterProducts.map((product, Index)=>{
                                    return <div className={classes.singleProduct} key={Index}>
                                            <div className={classes.thumbnail}>
                                                <img src={product.images.image1} alt="thumbnail" className="img-fluid" />
                                            </div>
                                            <div className={classes.contents}>
                                                <p className={classes.name}>{product.name}</p>
                                                <span className="today_deal">Deal of the Day</span>
                                                <p className={classes.price}>
                                                    <sup>₹</sup>
                                                    <span className={classes.currentPrice}>{product.price.discountPrice.toLocaleString()}</span>
    
                                                    <span className="old">M.R.P: <s>₹{product.price.originalPrice.toLocaleString()}</s></span>
                                                    <span className={classes.discount}>({Math.round(((product.price.originalPrice - product.price.discountPrice) / product.price.originalPrice) * 100)}% off)</span>
                                                </p>
                                                {/* <p className="deliveryStatus">{product.price.discountPrice >= 499 ? "FREE Delivery by Amazon" : "FREE Delivery over ₹499. Fulfilled by Amazon" }</p> */}
                                            </div>
                                        </div>
                                })
                            : <h1>No Products Found</h1>}
                            
                            
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Result;