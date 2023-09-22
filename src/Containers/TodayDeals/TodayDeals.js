import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "../../Components/Image/Image";
import axios from '../../axios'
import Loader from "../../Components/UI/Loader/Loader";
import './TodayDeals.css'
import { useDispatch, useSelector } from "react-redux";
import { addRelatedItemCategory } from "../../store/reducers/productsReducer";
import { useCookies } from 'react-cookie';

const TodayDeals = () => {
    const [allProducts, setAllProducts] = useState([])
    // const [productCategories, setProductCategories] = useState([]);
    const [cookies, setCookie] = useCookies(['relatedItemsCategory']);
    const dispatch = useDispatch();
    var productCategories = []

    const fetchAllProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    const loading = useSelector((state)=>{
        return state.products.loading;
    })

    const setRelatedCategory = (data)=>{
        // dispatch(addRelatedItemCategory(data))
        setCookie('relatedItemsCategory', data, {path: '/', maxAge: 3600})
    }

    return(
        <div className="card today_deals">
            <div className="heading_row">
                <h3 className="title">Today's Deals</h3>
                <a href="#" className="">See all deals</a>
            </div>

            {loading === true ? (
                <Loader />
            ) : null}
            
            {loading === false ? (
                fetchAllProducts.length > 0 ? (
                    <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={15}
                    slidesPerView={5}
                    allowTouchMove={false}
                    loop={true}
                    navigation
                    scrollbar={{ draggable: false }}
                    style={{width:'100%'}}
                >
                {fetchAllProducts.map((item, index)=>{
                    // const newCat = item.categories.replace(/\s/g, "").split(',')[0].replace('&','-');
                    productCategories = [];
                    item.categories.map((singleCategory)=>{
                        productCategories.push(singleCategory);
                        // setProductCategories([...productCategories, singleCategory])
                    });

                    const categoryText = productCategories.join('-')
                    const thumbnail = item.images[0].url;
                    // console.log('newcategory',newCat);

                    return <SwiperSlide key={item.id}>
                        <div className="single_product">
                        {/* onClick={()=>setRelatedCategory(item.category)} */}
                            <Link to={`/today-deals?cat=${categoryText}`} >
                                <div className="thumbnail">
                                    <Image src={thumbnail} className="w-100" />
                                </div>
                                <div className="details">
                                    <p className="deals">
                                        <span className="deal">Up to {item.price.discount}% off</span>
                                        <span className="text">Deal of the Day</span>
                                    </p>
                                    <p className="name">{item.product_title}</p>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                })}
                
                    </Swiper> 
                ) : <h6 className="text-center">No Today's Deals Found</h6>
            ) : null}

        </div>
    )
}

export default TodayDeals;