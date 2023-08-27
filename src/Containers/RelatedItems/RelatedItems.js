import { Component, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "../../Components/Image/Image";
import Loader from "../../Components/UI/Loader/Loader";
import { instanceOf } from 'prop-types';
import { useCookies, withCookies, Cookies } from 'react-cookie';
import { useSelector } from "react-redux";

const RelatedItems = ()=>{

    const [cookies, setCookie] = useCookies(['relatedItemsCategory']);

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    
    return(
        <div className="card today_deals">
            <div className="heading_row">
                <h3 className="title">Related to items you've viewed</h3>
                <a href="#" className="">See more</a>
            </div>

            {allProducts.length >= 0 ? (
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={15}
                    slidesPerView={5}
                    allowTouchMove={false}
                    loop={true}
                    navigation
                    scrollbar={{ draggable: false }}
                >
                {allProducts.map((item, index)=>{
                    if(item.category === cookies.relatedItemsCategory){
                    return <SwiperSlide key={index}>
                        <div className="single_product">
                            <a href="javascript:void(0)">
                                <div className="thumbnail">
                                    <Image src={item.images.image1} className="w-100" />
                                </div>
                            </a>
                        </div>
                    </SwiperSlide>
                    }
                })}
                
                </Swiper> 
            ) : <Loader/>}

        </div>
    )
}

export default RelatedItems;