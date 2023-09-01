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

    const [loading, setLoading] = useState(true)
    const [allProducts, setAllProducts] = useState([])
    
    const [cookies, setCookie] = useCookies(['relatedItemsCategory']);

    const dispatch = useDispatch();

    const fetchAllProducts = useSelector((state)=>{
        return state.products.allProducts;
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
            
            {fetchAllProducts.length > 0 ? (
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={15}
                    slidesPerView={5}
                    allowTouchMove={false}
                    loop={true}
                    navigation
                    scrollbar={{ draggable: false }}
                >
                {fetchAllProducts.map((item, index)=>{
                    const newCat = item.category.replace(/\s/g, "").split(',')[0].replace('&','-');
                    // console.log('newcategory',newCat);

                    return <SwiperSlide key={index}>
                        <div className="single_product">
                            <Link to={`/today-deals?cat=${newCat}`} onClick={()=>setRelatedCategory(item.category)}>
                                <div className="thumbnail">
                                    <Image src={item.images.image1} className="w-100" />
                                </div>
                                <div className="details">
                                    <p className="deals">
                                        <span className="deal">Up to {item.price.discount}% off</span>
                                        <span className="text">Deal of the Day</span>
                                    </p>
                                    <p className="name">{item.name}</p>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                })}
                
                </Swiper> 
            ) : <Loader/>}

        </div>
    )
}

export default TodayDeals;