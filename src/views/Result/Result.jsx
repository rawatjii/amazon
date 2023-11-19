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
    
    const searchKeyword = useSelector((state)=>{
        return state.search.searchKeyword;
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const searchInput = searchParams.get('product');
        allProducts.filter((singleProd)=>{
            return singleProd.product_title.toLowerCase().includes(searchInput.toLowerCase())
        })
        .map((filteredProduct)=>{
            // setFilteredProducts([filteredProduct])
            FilteredProductsAll.push(filteredProduct)
        })
        setFilteredProducts(FilteredProductsAll)

        // if(resultProducts.length === 0){
        //     const searchParams = new URLSearchParams(window.location.search);
        //     const searchCategory = searchParams.get('product');

        //     allProducts.filter((singleProd)=>{
        //         return singleProd.name.toLowerCase().includes(searchCategory.toLowerCase())
        //     })
        //     .map((filteredProduct)=>{
        //         FilteredProductsAll.push(filteredProduct)
        //     })
        //     setFilteredProducts(FilteredProductsAll)
        // }else{
        //     setFilteredProducts(resultProducts);
        // }
        // setAllCategories(allproductsCategories)
    }, [allProducts, searchKeyword]);

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

                        <div className="filter_widget">
                            <h4 className="title">Brands</h4>
                            <ul>
                                <li>
                                    <label htmlFor="brand1">   
                                        <input type="checkbox" name='brands' id='brand1' />
                                        Brand1
                                    </label>
                                </li>
                                <li>
                                    <label htmlFor="brand2">   
                                        <input type="checkbox" name='brands' id='brand2' />
                                        Brand2
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div className="filter_widget">
                            <h4 className="title">Price</h4>
                            <form action="">
                                <input type="text" placeholder='₹ Min' />
                                <input type="text" placeholder='₹ Max' />
                                <button type='submit'>Go</button>
                            </form>
                        </div>

                        <div className="filter_widget">
                            <h4 className="title">Deals & Discounts</h4>
                            <ul>
                                <li>
                                    <a href="">All Discounts</a>
                                </li>
                                <li>
                                    <a href="">Today's Deals</a>
                                </li>
                            </ul>
                        </div>

                        <div className="filter_widget">
                            <h4 className="title">Availability</h4>
                            <ul>
                                <li>
                                    <label htmlFor="availability">   
                                        <input type="checkbox" name='brands' id='availability' />
                                        Include Out of Stock
                                    </label>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className="col_9 right_col">
                        <h3 className="title">Results</h3>
                        <div className={classes.search_lists}>
                            {filterProducts.length > 0 ?
                                filterProducts.map((product, Index)=>{
                                    return <div className={classes.singleProduct} key={Index}>
                                            <div className={classes.thumbnail}>
                                                <img src={product.images ? product.images.image1 : process.env.REACT_APP_NO_PRODUCT_IMAGE_URL} alt="thumbnail" className="img-fluid" />
                                            </div>
                                            <div className={classes.contents}>
                                                <p className={classes.name}>{product.product_title}</p>
                                                <span className="today_deal">Deal of the Day</span>
                                                <p className={classes.price}>
                                                    <sup>₹</sup>
                                                    <span className={classes.currentPrice}>{product.price.offerPrice.toLocaleString()}</span>
    
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